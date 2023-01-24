import {faker} from '@faker-js/faker';
import camelCase from 'camelcase';
import {program, type Command} from 'commander';

export class BooleanFlag<Required extends boolean = false> {
	readonly flag: string;
	readonly required: boolean;
	readonly description: string | undefined;

	constructor(options: {
		flag: `--${string}`;
		required?: Required;
		description?: string;
	}) {
		this.flag = options.flag;
		this.required = options.required ?? false;
		this.description = options.description;
	}

	get(
		program: Command,
	): Required extends false ? boolean | undefined : boolean {
		const key = camelcaseKey(this.flag);
		const value = program.getOptionValue(key) as unknown;

		if (value === undefined) {
			if (this.required) {
				throw new Error(`${this.flag} is required`);
			}

			// @ts-expect-error this.required is already checked
			return undefined;
		}

		if (typeof value !== 'boolean') {
			throw new TypeError(
				`Unexpected non-boolean (${typeof value}) for boolean flag ${
					this.flag
				}`,
			);
		}

		return value;
	}
}

export class Flag<Type, Required extends boolean = false> {
	readonly flag: string;
	readonly required: boolean;
	readonly transform: (s: string) => Type;
	readonly description: string | undefined;

	constructor(options: {
		flag: `--${string} <${string}>`;
		transform: (s: string) => Type;
		description?: string;
		required?: Required;
	}) {
		this.flag = options.flag;
		this.transform = options.transform;
		this.description = options.description;
		this.required = options.required ?? false;
	}

	get(program: Command): Required extends false ? Type | undefined : Type {
		const key = camelcaseKey(this.flag);
		const value = program.getOptionValue(key) as string | undefined;
		if (value === undefined) {
			if (this.required) {
				throw new Error(`${this.flag} is required`);
			}

			// @ts-expect-error this.required is already checked
			return undefined;
		}

		if (typeof value !== 'string') {
			throw new TypeError(
				`Unexpected non-string (${typeof value}) from raw input for ${
					this.flag
				}`,
			);
		}

		return this.transform(value);
	}
}

type ExtractKeys<T> = T extends Flag<infer T>
	? Flag<T>
	: T extends BooleanFlag
	? BooleanFlag
	: T extends Record<string, infer R>
	? ExtractKeys<R>
	: T extends ReadonlyArray<infer R>
	? ExtractKeys<R>
	: never;

type SimpleTemplate =
	| BooleanFlag
	| BooleanFlag<true>
	| Flag<unknown>
	| Flag<unknown, true>;
// Disallow arbitrarily deeply nested objects or arrays
type TemplateLevel1 =
	| SimpleTemplate
	| Readonly<Record<string, SimpleTemplate>>
	| readonly SimpleTemplate[];
type Template =
	| SimpleTemplate
	| Readonly<Record<string, TemplateLevel1>>
	| readonly TemplateLevel1[];

type IsArrayOrRecord<T> = T extends Record<string, any>
	? true
	: T extends any[]
	? true
	: false;
type ToArgRecursive<T> = T extends Flag<infer T>
	? T
	: T extends BooleanFlag
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
	callback: (...args: ToArguments<TemplateActual>) => Return,
	transform?: {
		pre?: (
			...args: ToArguments<TemplateActual>
		) => ToArguments<TemplateActual> | undefined;
		post?: (value: Return) => unknown;
	},
) => void;

function isSingleTemplate(item: any): item is Flag<any> | BooleanFlag {
	if (item instanceof Flag || item instanceof BooleanFlag) {
		return true;
	}

	return false;
}

function * extractKeys<TemplateActual extends readonly Template[]>(
	template: TemplateActual,
): Iterable<BooleanFlag | Flag<unknown>> {
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
		yield * extractAny(item);
	}
}

const cliKeyRegex = /^--(?<key>[a-z-]+)(?:\s<[\w\s]+>)?$/;
function validateKey(item: Flag<any> | BooleanFlag) {
	if (item instanceof Flag) {
		if (!/^--[a-z-]+\s<[\w\s]+>$/.test(item.flag)) {
			throw new Error(`Flag "${item.flag}" did not match the required format.`);
		}
	} else if (!/^--[a-z-]+$/.test(item.flag)) {
		throw new Error(
			`boolean flag "${item.flag}" did not match the required format.`,
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
			return item.get(program) as ToArgRecursive<R>;
		}

		if (Array.isArray(item)) {
			return item.map(item => recursiveFill(item)) as ToArgRecursive<R>;
		}

		const result: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(item)) {
			if (value === undefined) {
				continue;
			}

			result[key] = recursiveFill(value);
		}

		return result as ToArgRecursive<R>;
	}

	return template.map(item =>
		recursiveFill(item),
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
		for (const {required, flag, description} of keys) {
			if (required) {
				subSubProgram.requiredOption(flag, description);
			} else {
				subSubProgram.option(flag, description);
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
