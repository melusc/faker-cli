import {faker} from '@faker-js/faker';
import camelCase from 'camelcase';
import {program, type Command} from 'commander';
import type {UnionToIntersection} from 'type-fest';

type BaseTemplate = {
	required?: boolean | undefined;
	description?: string | undefined;
};
type BooleanTemplate = {
	key: string;
} & BaseTemplate;
type OtherTemplate<T> = {
	transform: (s: string | undefined) => T | undefined;
	key: string;
} & BaseTemplate;
type SingleTemplate<T> = IsBoolean<T> extends true
	? BooleanTemplate
	: OtherTemplate<T>;

type ExtractKeys<T> = T extends TemplateFromArgs<infer R>
	? ExtractKeys<R>
	: T extends SingleTemplate<infer T>
	? SingleTemplate<T>
	: T extends Record<string, infer R>
	? ExtractKeys<R>
	: T extends Array<infer R>
	? ExtractKeys<R>
	: never;

type ExtractKeysArgs<Args extends any[]> = ExtractKeys<TemplateFromArgs<Args>>;

type IsBoolean<T> = T extends boolean ? true : false;
type FilterUndefined<T> = T extends undefined ? never : T;
type IsUnion<T> = [T] extends [UnionToIntersection<T>]
	? false
	: [T] extends [boolean]
	? false
	: true;
type RecursiveTemplate<T> = IsUnion<T> extends true
	? SingleTemplate<T>
	: T extends Record<string, any>
	? {
			[K in keyof T]?: RecursiveTemplate<FilterUndefined<T[K]>>;
	  }
	: T extends any[]
	? {
			[K in keyof T]: RecursiveTemplate<FilterUndefined<T[K]>>;
	  }
	: SingleTemplate<T>;

type TemplateFromArgs<Args extends any[]> = {
	[key in keyof Args]: RecursiveTemplate<FilterUndefined<Args[key]>>;
};

type Template = <Args extends any[], Return>(
	name: string | string[],
	template: TemplateFromArgs<Args>,
	callback: (...args: Args) => Return,
	transform?: {
		pre?: (...args: Args) => Args | undefined;
		post?: (value: Return) => unknown;
	},
) => void;

function isSingleTemplate(
	item: any,
): item is SingleTemplate<any> | BooleanTemplate {
	if ('transform' in item && typeof item.transform === 'function') {
		return true;
	}

	if (Object.keys(item).length === 1) {
		return 'key' in item;
	}

	if (Object.keys(item).length === 2) {
		return 'key' in item && 'required' in item;
	}

	return false;
}

function * extractKeys<Args extends any[]>(
	template: TemplateFromArgs<Args>,
): Iterable<ExtractKeysArgs<Args>> {
	function * extractAny(
		item: RecursiveTemplate<any>,
	): Iterable<ExtractKeysArgs<Args>> {
		if (isSingleTemplate(item)) {
			validateKey(item);
			yield item as ExtractKeysArgs<Args>;
		} else {
			for (const value of Object.values(item)) {
				if (value !== undefined) {
					yield * extractAny(value);
				}
			}
		}
	}

	for (const item of template) {
		yield * extractAny(item);
	}
}

const cliKeyRegex = /^--(?<key>[a-z-]+)(?:\s<[\w\s]+>)?$/;
function validateKey(item: SingleTemplate<any> | BooleanTemplate) {
	if ('transform' in item) {
		if (!/^--[a-z-]+\s<[\w\s]+>$/.test(item.key)) {
			throw new Error(`Flag "${item.key}" did not match the required format.`);
		}
	} else if (!/^--[a-z-]+$/.test(item.key)) {
		throw new Error(
			`boolean flag "${item.key}" did not match the required format.`,
		);
	}
}

function camelcaseKey(key: string) {
	const match = cliKeyRegex.exec(key);
	return camelCase(match!.groups!['key']!);
}

function fill<Args extends any[]>(
	template: TemplateFromArgs<Args>,
	program: Command,
): Args {
	function recursiveFill<R>(item: RecursiveTemplate<R>): Args[number] {
		if (isSingleTemplate(item)) {
			const value = program.getOptionValue(camelcaseKey(item.key)) as
				| string
				| undefined;
			if (value === undefined && item.required) {
				throw new Error(`${item.key} was required.`);
			}

			if ('transform' in item) {
				return item.transform(value) as unknown;
			}

			return value;
		}

		if (Array.isArray(item)) {
			return item.map(item => recursiveFill(item) as unknown);
		}

		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries<
			RecursiveTemplate<any> | undefined
		>(item as any)) {
			if (value === undefined) {
				continue;
			}

			result[key] = recursiveFill(value);
		}

		return result;
	}

	return template.map(item => recursiveFill(item) as unknown) as Args;
}

function commandFromName(
	program: Command,
	name: string | string[],
	usedNames: Set<string>,
): Command {
	function throwIfDuplicate(name: string) {
		if (usedNames.has(name)) {
			throw new Error(`Duplicate command "${name}".`);
		}

		usedNames.add(name);
	}

	if (Array.isArray(name)) {
		const first = name.shift();
		if (first === undefined) {
			throw new Error('name should be a string or a non-empty array');
		}

		throwIfDuplicate(first);
		const subProgram = program.command(first);
		for (const name_ of name) {
			throwIfDuplicate(name_);
			subProgram.alias(name_);
		}

		return subProgram;
	}

	throwIfDuplicate(name);
	return program.command(name);
}

const rootCommands = new Set<string>();
export function createTemplate(name: string | string[]): Template {
	const subProgram = commandFromName(program, name, rootCommands);

	const scopeCommands = new Set<string>();

	return ((name, template, callback, transform) => {
		const subSubProgram = commandFromName(subProgram, name, scopeCommands);
		const keys = [...extractKeys(template)];
		for (const {required, key, description} of keys) {
			if (required) {
				subSubProgram.requiredOption(key, description);
			} else {
				subSubProgram.option(key, description);
			}
		}

		subSubProgram.action(() => {
			faker.setLocale(program.getOptionValue('locale'));

			let args = fill(template, subSubProgram);

			args = transform?.pre?.(...args) ?? args;

			const result = callback(...args);
			const final = transform?.post?.(result) ?? result;
			console.log(final);
		});
	}) satisfies Template;
}
