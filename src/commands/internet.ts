import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {
	integerBetween,
	stringOf,
	transformInteger,
	identity,
	arrayOf,
	transformRegex,
} from '../util.ts';

const module = faker.internet;
const template = createTemplate('internet');

template('avatar', [] as const, module.avatar);

template(
	'color',
	[
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
	] as const,
	module.color,
);

template(
	'displayName',
	[
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
	],
	module.displayName,
);

template(['domainName', 'domain'], [] as const, module.domainName);

template('domainSuffix', [] as const, module.domainSuffix);

template('domainWord', [] as const, module.domainWord);

template(
	'email',
	[
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
	] as const,
	module.email,
);

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

template(
	'emoji',
	[
		{
			types: new Flag({
				flag: '--type <emoji-type>',
				transform: arrayOf(stringOf(emojiType)),
				description: `Seperated by comma, can be ${[...emojiType].join(', ')}`,
			}),
		},
	],
	module.emoji,
);

template(
	'exampleEmail',
	[
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
	] as const,
	module.exampleEmail,
);

template('httpMethod', [] as const, module.httpMethod);

const validHttpStatusCodes = [
	'informational',
	'success',
	'clientError',
	'serverError',
	'redirection',
] as const;

template(
	'httpStatusCode',
	[
		{
			types: new Flag({
				flag: '--types <types>',
				transform: arrayOf(stringOf(validHttpStatusCodes)),
				description: `Seperated by a comma, can be ${[
					...validHttpStatusCodes,
				].join(', ')}`,
			}),
		},
	] as const,
	module.httpStatusCode,
);

template('ip', [] as const, module.ip);

template('ipv4', [] as const, module.ipv4);

template('ipv6', [] as const, module.ipv6);

template(
	'mac',
	[
		{
			separator: new Flag({
				flag: '--separator <separator>',
				transform: stringOf(['', ':', '-'] as const),
			}),
		},
	] as const,
	module.mac,
);

template(
	'password',
	[
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
	] as const,
	module.password,
);

template('port', [] as const, module.port);

template('protocol', [] as const, module.protocol);

template(
	'url',
	[
		{
			appendSlash: new BooleanFlag({
				flag: '--apend-slash',
			}),
			protocol: new Flag({
				flag: '--protocol <protocol>',
				transform: stringOf(['http', 'https'] as const),
			}),
		},
	] as const,
	module.url,
);

template('userAgent', [] as const, module.userAgent);

template(
	'userName',
	[
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
	] as const,
	module.userName,
);
