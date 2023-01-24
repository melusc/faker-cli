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
				transform(s: string | undefined) {
					if (s === undefined) {
						return s;
					}

					return [...s];
				},
				description: 'Not comma seperated',
			},
		},
	] as const,
	module.alpha,
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
				transform(s: string | undefined) {
					if (s === undefined) {
						return s;
					}

					return [...s];
				},
				description: 'Not comma seperated',
			},
		},
	] as const,
	module.alphaNumeric,
);

template('locale', [] as const, module.locale);

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
			},
		},
	] as const,
	module.numeric,
);

template('word', [] as const, module.word);

template(
	'words',
	[
		{
			key: '--count <count>',
			transform: transformInteger,
		},
	] as const,
	module.words,
);
