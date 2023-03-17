import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger} from '../util.ts';

const module = faker.random;
const template = createTemplate('random');

type Casing = 'upper' | 'lower' | 'mixed';

template(
	'alpha',
	[
		{
			count: new Flag({
				flag: '--count <count>',
				transform: transformInteger,
			}),
			casing: new Flag({
				flag: '--casing <case>',
				transform: stringOf(
					new Set<Casing>(['upper', 'mixed', 'lower'] as const),
				),
			}),
			bannedChars: new Flag({
				flag: '--banned-chars <chars>',
				transform(s: string | undefined) {
					if (s === undefined) {
						return s;
					}

					return [...s];
				},
				description: 'Not comma seperated',
			}),
		},
	] as const,
	module.alpha,
);

template(
	'alphaNumeric',
	[
		new Flag({
			flag: '--count <count>',
			transform: transformInteger,
		}),
		{
			casing: new Flag({
				flag: '--casing <case>',
				transform: stringOf(
					new Set<Casing>(['upper', 'mixed', 'lower'] as const),
				),
			}),
			bannedChars: new Flag({
				flag: '--banned-chars <chars>',
				transform(s: string | undefined) {
					if (s === undefined) {
						return s;
					}

					return [...s];
				},
				description: 'Not comma seperated',
			}),
		},
	] as const,
	module.alphaNumeric,
);

template('locale', [] as const, module.locale);

template(
	'numeric',
	[
		new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
		{
			allowLeadingZeros: new BooleanFlag({
				flag: '--allow-leading-zeros',
			}),
			bannedDigits: new Flag({
				flag: '--banned-digits <digits>',
				transform(s: string | undefined) {
					if (s === undefined) {
						return s;
					}

					const nonDigit = /\D/.exec(s);

					if (nonDigit) {
						throw new Error(`Non-digit in banned digits "${nonDigit[0]}"`);
					}

					return [...s];
				},
				description: 'Not comma seperated',
			}),
		},
	] as const,
	module.numeric,
);

template('word', [] as const, module.word);

template(
	'words',
	[
		new Flag({
			flag: '--count <count>',
			transform: transformInteger,
		}),
	] as const,
	module.words,
);
