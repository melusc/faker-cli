import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {
	arrayOf,
	identity,
	matchRegex,
	stringOf,
	transformInteger,
} from '../util.ts';

const module = faker.string;
const template = createTemplate('string');

const casingFlag = new Flag({
	flag: '--casing <casing>',
	transform: stringOf(['upper', 'lower', 'mixed'] as const),
});

const lengthFlag = new Flag({
	flag: '--length <length>',
	transform: transformInteger,
});

const prefixFlag = new Flag({
	flag: '--prefix <prefix>',
	transform: identity,
});

template(
	'alpha',
	[
		{
			casing: casingFlag,
			exclude: new Flag({
				flag: '--exclude <exclude>',
				transform: arrayOf(matchRegex(/^[a-z]$/i), ''),
				description: 'Alphabetical characters to exclude, no separator',
			}),
			length: lengthFlag,
		},
	],
	module.alpha,
);

template(
	'alphanumeric',
	[
		{
			casing: casingFlag,
			exclude: new Flag({
				flag: '--exclude <exclude>',
				transform: arrayOf(matchRegex(/^[a-z\d]$/i), ''),
				description: 'Alphanumerical characters to exclude, no separator',
			}),
			length: lengthFlag,
		},
	],
	module.alphanumeric,
);

template(
	'binary',
	[
		{
			length: lengthFlag,
			prefix: prefixFlag,
		},
	] as const,
	module.binary,
);

template(
	'fromCharacters',
	[
		new Flag({
			flag: '--characters <characters>',
			transform: identity,
			description: 'Characters to chose from, no separator',
			required: true,
		}),
		lengthFlag,
	] as const,
	module.fromCharacters,
);

template(
	'hexadecimal',
	[
		{
			casing: casingFlag,
			length: lengthFlag,
			prefix: prefixFlag,
		},
	],
	module.hexadecimal,
);

template('nanoid', [lengthFlag], module.nanoid);

template(
	'numeric',
	[
		{
			allowLeadingZeros: new BooleanFlag({
				flag: '--allow-leading-zeros',
			}),
			exclude: new Flag({
				flag: '--exclude <exclude>',
				transform: arrayOf(matchRegex(/^\d$/), ''),
				description: 'Numbers to exclude, no separator',
			}),
		},
	],
	module.numeric,
);

template(
	'octal',
	[
		{
			length: lengthFlag,
			prefix: prefixFlag,
		},
	],
	module.octal,
);

template('sample', [lengthFlag], module.sample);

template('symbol', [lengthFlag], module.symbol);

template('uuid', [] as const, module.uuid);
