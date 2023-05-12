import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {
	integerBetween,
	stringOf,
	transformInteger,
	identity,
	arrayOf,
	transformRegex,
} from '../util.ts';

const template = createTemplate('internet');

template('avatar', [] as const);

template('color', [
	{
		blueBase: new Flag({
			flag: '--blue-base <int>',
			transform: integerBetween(0, 255),
		}),
		greenBase: new Flag({
			flag: '--green-base <int>',
			transform: integerBetween(0, 255),
		}),
		redBase: new Flag({
			flag: '--red-base <int>',
			transform: integerBetween(0, 255),
		}),
	},
] as const);

template('displayName', [
	{
		firstName: new Flag({
			flag: '--first-name <name>',
			transform: identity,
		}),
		lastName: new Flag({
			flag: '--last-name <name>',
			transform: identity,
		}),
	},
]);

template('domainName', [] as const, {
	alias: ['doman'],
});

template('domainSuffix', [] as const);

template('domainWord', [] as const);

template('email', [
	{
		allowSpecialCharacters: new BooleanFlag({
			flag: '--allow-special-characters',
		}),
		firstName: new Flag({
			flag: '--first-name <name>',
			transform: identity,
		}),
		lastName: new Flag({
			flag: '--last-name <name>',
			transform: identity,
		}),
		provider: new Flag({
			flag: '--provider <provider>',
			transform: identity,
		}),
	},
] as const);

const emojiType = [
	'smiley',
	'body',
	'person',
	'nature',
	'food',
	'travel',
	'activity',
	'object',
	'symbol',
	'flag',
] as const;

template('emoji', [
	{
		types: new Flag({
			flag: '--type <emoji type>',
			transform: arrayOf(stringOf(emojiType)),
			description: `Seperated by comma, can be ${[...emojiType].join(', ')}`,
		}),
	},
]);

template('exampleEmail', [
	{
		allowSpecialCharacters: new BooleanFlag({
			flag: '--allow-special-characters',
		}),
		firstName: new Flag({
			flag: '--first-name <name>',
			transform: identity,
		}),
		lastName: new Flag({
			flag: '--last-name <name>',
			transform: identity,
		}),
	},
] as const);

template('httpMethod', [] as const);

const validHttpStatusCodes = [
	'informational',
	'success',
	'clientError',
	'serverError',
	'redirection',
] as const;

template('httpStatusCode', [
	{
		types: new Flag({
			flag: '--types <types>',
			transform: arrayOf(stringOf(validHttpStatusCodes)),
			description: `Seperated by a comma, can be ${[
				...validHttpStatusCodes,
			].join(', ')}`,
		}),
	},
] as const);

template('ip', [] as const);

template('ipv4', [] as const);

template('ipv6', [] as const);

template('mac', [
	{
		separator: new Flag({
			flag: '--separator <separator>',
			transform: stringOf(['', ':', '-'] as const),
		}),
	},
] as const);

template('password', [
	{
		length: new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
		memorable: new BooleanFlag({
			flag: '--memorable',
		}),
		pattern: new Flag({
			flag: '--pattern <pattern>',
			transform: transformRegex,
		}),
		prefix: new Flag({
			flag: '--prefix <prefix>',
			transform: identity,
		}),
	},
] as const);

template('port', [] as const);

template('protocol', [] as const);

template('url', [
	{
		appendSlash: new BooleanFlag({
			flag: '--apend-slash',
		}),
		protocol: new Flag({
			flag: '--protocol <protocol>',
			transform: stringOf(['http', 'https'] as const),
		}),
	},
] as const);

template('userAgent', [] as const);

template('userName', [
	{
		firstName: new Flag({
			flag: '--first-name <name>',
			transform: identity,
		}),
		lastName: new Flag({
			flag: '--last-name <name>',
			transform: identity,
		}),
	},
] as const);
