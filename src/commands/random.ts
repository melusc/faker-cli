import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf, transformInteger} from '../util.js';

const module = faker.random;
const template = createTemplate('random');

type Casing = 'upper' | 'lower' | 'mixed';

template(
	'alpha',
	[
		{
			count: {
				key: '--count <count>',
				transform: transformInteger,
			},
			casing: {
				key: '--casing <case>',
				transform: stringOf(
					new Set<Casing>(['upper', 'mixed', 'lower'] as const),
				),
			},
			bannedChars: {
				key: '--banned-chars <chars>',
				transform(s) {
					if (s === undefined) {
						return s;
					}

					return [...s];
				},
				description: 'Not comma seperated',
			},
		},
	],
	(options?: {
		count?: number;
		casing?: Casing;
		bannedChars?: readonly string[] | string;
	}) => module.alpha(options),
);

template(
	'alphaNumeric',
	[
		{
			key: '--count <count>',
			transform: transformInteger,
		},
		{
			casing: {
				key: '--casing <case>',
				transform: stringOf(
					new Set<Casing>(['upper', 'mixed', 'lower'] as const),
				),
			},
			bannedChars: {
				key: '--banned-chars <chars>',
				transform(s) {
					if (s === undefined) {
						return s;
					}

					return [...s];
				},
				description: 'Not comma seperated',
			},
		},
	],
	(
		count?: number,
		options?: {
			casing?: Casing;
			bannedChars?: readonly string[] | string;
		},
	) => module.alphaNumeric(count, options),
);

template('locale', [], module.locale);

template(
	'numeric',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
		{
			allowLeadingZeros: {
				key: '--allow-leading-zeros',
			},
			bannedDigits: {
				key: '--banned-digits <digits>',
				transform(s) {
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
			},
		},
	],
	(
		length?: number,
		options?: {
			allowLeadingZeros?: boolean;
			bannedDigits?: readonly string[] | string;
		},
	) => module.numeric(length, options),
);

template('word', [], module.word);

template(
	'words',
	[
		{
			key: '--count <count>',
			transform: transformInteger,
		},
	],
	module.words,
);
