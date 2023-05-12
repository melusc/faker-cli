import {allFakers, type Faker} from '@faker-js/faker';
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

type GenericFunction = (...args: unknown[]) => unknown;
type FilterFunctions<T> = {
	[K in keyof T]: T[K] extends GenericFunction ? T[K] : never;
};

type TemplateFunction<Module extends keyof Faker> = <
	// Combining the two to make TemplateActual typed seems a bit difficult
	// I cannot get it to work
	TemplateActual extends readonly Template[],
	Fn extends keyof FilterFunctions<Faker[Module]> & string,
	Return,
>(
	name: Fn,
	template: TemplateActual,
	options?: {
		pre?: (
			...args: ToArguments<TemplateActual>
		) => ToArguments<TemplateActual> | undefined;
		post?: (value: Return) => unknown;
		alias?: readonly string[];
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
	name: string,
	usedNames: Set<string>,
	alias: readonly string[] | undefined,
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

	validateName(name);
	const subProgram = program.command(name).allowExcessArguments(false);

	if (isReadonlyArray(alias)) {
		for (const name_ of alias) {
			validateName(name_);
			subProgram.alias(name_);
		}

		return subProgram;
	}

	return subProgram;
}

const rootCommands = new Set<string>();
export function createTemplate<Module extends keyof Faker>(
	moduleName: Module,
): TemplateFunction<Module> {
	const subProgram = commandFromName(
		program,
		moduleName,
		rootCommands,
		undefined,
	);

	const scopeCommands = new Set<string>();

	return ((name, template, options) => {
		const subSubProgram = commandFromName(
			subProgram,
			name,
			scopeCommands,
			options?.alias,
		);
		const keys = [...extractKeys(template)];
		for (const {required, flag, description} of keys) {
			if (required) {
				subSubProgram.requiredOption(flag, description);
			} else {
				subSubProgram.option(flag, description);
			}
		}

		subSubProgram.action(() => {
			const locale = program.getOptionValue('locale') as keyof typeof allFakers;
			if (!(locale in allFakers)) {
				throw new Error(`${locale} not found in locales`);
			}

			const faker = allFakers[locale];
			const module = faker[moduleName];
			const fn = module[name];

			let args = fill(template, subSubProgram);

			args = options?.pre?.(...args) ?? args;

			// @ts-expect-error It is not a function for some reason
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const result = fn(...args);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
			const final = options?.post?.(result) ?? result;
			console.log(final);
		});
	}) satisfies TemplateFunction<Module>;
}
