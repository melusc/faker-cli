import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {
	arrayOf,
	identity,
	matchRegex,
	stringOf,
	transformInteger,
} from '../util.ts';

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

template('alpha', [
	{
		casing: casingFlag,
		exclude: new Flag({
			flag: '--exclude <exclude>',
			transform: arrayOf(matchRegex(/^[a-z]$/i), ''),
			description: 'Alphabetical characters to exclude, no separator',
		}),
		length: lengthFlag,
	},
]);

template('alphanumeric', [
	{
		casing: casingFlag,
		exclude: new Flag({
			flag: '--exclude <exclude>',
			transform: arrayOf(matchRegex(/^[a-z\d]$/i), ''),
			description: 'Alphanumerical characters to exclude, no separator',
		}),
		length: lengthFlag,
	},
]);

template('binary', [
	{
		length: lengthFlag,
		prefix: prefixFlag,
	},
] as const);

template('fromCharacters', [
	new Flag({
		flag: '--characters <characters>',
		transform: identity,
		description: 'Characters to chose from, no separator',
		required: true,
	}),
	lengthFlag,
] as const);

template('hexadecimal', [
	{
		casing: casingFlag,
		length: lengthFlag,
		prefix: prefixFlag,
	},
]);

template('nanoid', [lengthFlag]);

template('numeric', [
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
]);

template('octal', [
	{
		length: lengthFlag,
		prefix: prefixFlag,
	},
]);

template('sample', [lengthFlag]);

template('symbol', [lengthFlag]);

template('uuid', [] as const);
