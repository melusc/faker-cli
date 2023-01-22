import {type SexType} from '@faker-js/faker';

export function transformSexType(s: string | undefined): SexType | undefined {
	if (s === undefined) {
		return undefined;
	}

	if (/^m(?:ale)?$/.test(s)) {
		return 'male';
	}

	if (/^f(?:emale)?$/.test(s)) {
		return 'female';
	}

	throw new Error(`Unexpected sex type "${s}".`);
}

export function transformBoolean(s: string | undefined): boolean | undefined {
	if (s === undefined) {
		return undefined;
	}

	if (/^(t|true|y|yes)$/i.test(s)) {
		return true;
	}

	if (/^(f|false|no?)$/i.test(s)) {
		return false;
	}

	throw new Error(`Unexpected boolean "${s}".`);
}

export function transformNumber(s: string | undefined): number | undefined {
	if (s === undefined) {
		return undefined;
	}

	const parsed = Number(s);

	if (Number.isFinite(parsed)) {
		return parsed;
	}

	throw new Error(`Could not parse "${s}" to a finite number.`);
}

export function transformString(s: string | undefined): string | undefined {
	return s;
}

export function stringOf<T extends string>(
	set: Set<T>,
): (s: string | undefined) => T | undefined {
	return (s: string | undefined) => {
		if (s === undefined) {
			return undefined;
		}

		if (set.has(s as T)) {
			return s as T;
		}

		throw new Error(`Expected "${s}" to be one of ${JSON.stringify([...set])}`);
	};
}
