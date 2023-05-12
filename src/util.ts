import {type SexType} from '@faker-js/faker';

export function transformSexType(s: string): SexType {
	if (/^m(?:ale)?$/.test(s)) {
		return 'male';
	}

	if (/^f(?:emale)?$/.test(s)) {
		return 'female';
	}

	throw new Error(`Unexpected sex type "${s}".`);
}

export function transformBoolean(s: string): boolean {
	if (/^(t|true|y|yes)$/i.test(s)) {
		return true;
	}

	if (/^(f|false|no?)$/i.test(s)) {
		return false;
	}

	throw new Error(`Unexpected boolean "${s}".`);
}

export function transformNumber(s: string): number {
	const parsed = Number(s);

	if (Number.isFinite(parsed)) {
		return parsed;
	}

	throw new Error(`Could not parse "${s}" to a finite number.`);
}

export function transformInteger(s: string): number {
	const parsed = Number(s);

	if (Number.isInteger(parsed)) {
		return parsed;
	}

	if (Number.isFinite(parsed)) {
		throw new TypeError(`"${s}" is not an integer.`);
	}

	throw new Error(`Could not parse "${s}" to a finite number.`);
}

/**
 * @param low inclusive
 * @param high inclusive
 */
export function integerBetween(low: number, high: number) {
	return (s: string): number => {
		const parsed = transformInteger(s);

		if (low <= parsed && parsed <= high) {
			return parsed;
		}

		throw new Error(`${parsed} was not between ${low} and ${high}`);
	};
}

export function identity<T>(s: T): T {
	return s;
}

export function stringOf<T extends string>(
	set: readonly T[] | ReadonlySet<T>,
): (s: string) => T {
	const asSet = new Set(set);

	return (s: string) => {
		if (asSet.has(s as T)) {
			return s as T;
		}

		throw new Error(
			`Expected "${s}" to be one of ${JSON.stringify([...asSet])}`,
		);
	};
}

export function matchRegex(regex: RegExp): (s: string) => string {
	return s => {
		if (!regex.test(s)) {
			throw new Error(`Expected "${s}" to match ${String(regex)}`);
		}

		return s;
	};
}

export function arrayOf<T>(
	transform: (s: string) => T,
): (s: string) => readonly T[] {
	return (s: string): readonly T[] => {
		const split = s
			.split(',')
			.map(s => s.trim())
			.filter(Boolean);

		const result: T[] = [];

		for (const item of split) {
			result.push(transform(item));
		}

		return result;
	};
}

export function transformRegex(s: string) {
	try {
		return new RegExp(s);
	} catch {
		throw new Error(`Invalid regex "${s}"`);
	}
}

export function transformDate(s: string): string | number {
	if (/^-?\d+$/.test(s)) {
		return Number(s);
	}

	return s;
}
