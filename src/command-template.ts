import {faker} from '@faker-js/faker';
import camelCase from 'camelcase';
import {program, type Command} from 'commander';

type BaseTemplate = {
	readonly required?: boolean | undefined;
	readonly description?: string | undefined;
};
type BooleanTemplate = {
	readonly key: string;
} & BaseTemplate;
type OtherTemplate<T> = {
	readonly transform: (s: string | undefined) => T | undefined;
	readonly key: string;
} & BaseTemplate;
type SingleTemplate<T> = IsBoolean<T> extends true
	? BooleanTemplate
	: OtherTemplate<T>;

type ExtractKeys<T> = T extends SingleTemplate<infer T>
	? SingleTemplate<T>
	: T extends Record<string, infer R>
	? ExtractKeys<R>
	: T extends ReadonlyArray<infer R>
	? ExtractKeys<R>
	: never;

type IsBoolean<T> = T extends boolean ? true : false;

type Template =
	| BooleanTemplate
	| SingleTemplate<any>
	| {
			readonly [key: string]: Template;
	  }
	| readonly Template[];

type IsArrayOrRecord<T> = T extends Record<string, any>
	? true
	: T extends any[]
	? true
	: false;
type ToArgRecursive<T> = T extends OtherTemplate<infer T>
	? T
	: T extends BooleanTemplate
	? boolean
	: IsArrayOrRecord<T> extends true
	? {
			[K in keyof T]: ToArgRecursive<T[K]>;
	  }
	: never;

type ToArguments<T extends readonly Template[]> = {
	[key in keyof T]: ToArgRecursive<T[key]>;
};

type TemplateFunction = <TemplateActual extends readonly Template[], Return>(
	name: string | readonly string[],
	template: TemplateActual,
	// @ts-expect-error In reality it is not infinitely deep
	callback: (...args: ToArguments<TemplateActual>) => Return,
	transform?: {
		pre?: (
			...args: ToArguments<TemplateActual>
		) => ToArguments<TemplateActual> | undefined;
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

function * extractKeys<TemplateActual extends readonly Template[]>(
	template: TemplateActual,
): Iterable<ExtractKeys<TemplateActual>> {
	function * extractAny<T extends Template>(item: T): Iterable<ExtractKeys<T>> {
		if (isSingleTemplate(item)) {
			validateKey(item);
			yield item as any;
		} else {
			for (const value of Object.values(item)) {
				if (value !== undefined) {
					// @ts-expect-error It is not infinite
					yield * extractAny(value);
				}
			}
		}
	}

	for (const item of template) {
		// @ts-expect-error In reality it is not infinitely deep
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

function fill<TemplateActual extends readonly Template[]>(
	template: TemplateActual,
	program: Command,
): ToArguments<TemplateActual> {
	function recursiveFill<R extends Template>(item: R): ToArgRecursive<R> {
		if (isSingleTemplate(item)) {
			const value = program.getOptionValue(camelcaseKey(item.key)) as
				| string
				| undefined
				| boolean;
			if (value === undefined && item.required) {
				throw new Error(`${item.key} was required.`);
			}

			if (typeof value === 'boolean') {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return value as ToArgRecursive<R>;
			}

			if ('transform' in item) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return item.transform(value) as ToArgRecursive<R>;
			}

			throw new Error(
				`Value was not boolean (${typeof value}) and got no transform function.`,
			);
		}

		if (Array.isArray(item)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return item.map(item => recursiveFill(item)) as ToArgRecursive<R>;
		}

		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(item)) {
			if (value === undefined) {
				continue;
			}

			result[key] = recursiveFill(value);
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return result as ToArgRecursive<R>;
	}

	return template.map(
		item => recursiveFill(item) as unknown,
	) as ToArguments<TemplateActual>;
}

const isReadonlyArray: (arg0: any) => arg0 is readonly any[] = Array.isArray;
function commandFromName(
	program: Command,
	name: string | readonly string[],
	usedNames: Set<string>,
): Command {
	function validateName(name: string) {
		if (name === '') {
			throw new Error('Unexpected empty name');
		}

		if (!/^[a-z\d]+$/i.test(name)) {
			throw new Error(`"${name}" should only contain characters a-z and 0-9.`);
		}

		if (usedNames.has(name)) {
			throw new Error(`Duplicate command "${name}".`);
		}

		usedNames.add(name);
	}

	if (isReadonlyArray(name)) {
		const first = name[0];
		if (first === undefined) {
			throw new Error('name should be a string or a non-empty array');
		}

		validateName(first);
		const subProgram = program.command(first);
		for (const name_ of name.slice(1)) {
			validateName(name_);
			subProgram.alias(name_);
		}

		subProgram.allowExcessArguments(false);
		return subProgram;
	}

	validateName(name);
	return program.command(name).allowExcessArguments(false);
}

const rootCommands = new Set<string>();
export function createTemplate(name: string | string[]): TemplateFunction {
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
	}) satisfies TemplateFunction;
}
