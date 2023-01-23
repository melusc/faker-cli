import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {
	integerBetween,
	stringOf,
	transformInteger,
	transformString,
} from '../util.js';

const module = faker.internet;
const template = createTemplate('internet');

template('avatar', [], module.avatar);

template(
	'color',
	[
		{
			key: '--red <int>',
			transform: integerBetween(0, 255),
		},
		{
			key: '--green <int>',
			transform: integerBetween(0, 255),
		},
		{
			key: '--blue <int>',
			transform: integerBetween(0, 255),
		},
	],
	module.color,
);

template(['domainName', 'domain'], [], module.domainName);

template(['domainSuffix', 'suffix'], [], module.domainSuffix);

template('domainWord', [], module.domainWord);

template(
	'email',
	[
		{
			key: '--first-name <name>',
			transform: transformString,
		},
		{
			key: '--last-name <name>',
			transform: transformString,
		},
		{
			key: '--provider <provider>',
			transform: transformString,
		},
		{
			allowSpecialCharacters: {
				key: '--allow-special-characters',
			},
		},
	],
	module.email,
);

template('emoji', [], module.emoji);

template(
	'exampleEmail',
	[
		{
			key: '--first-name <name>',
			transform: transformString,
		},
		{
			key: '--last-name <name>',
			transform: transformString,
		},
		{
			allowSpecialCharacters: {
				key: '--allow-special-characters',
			},
		},
	],
	module.exampleEmail,
);

template('httpMethod', [], module.httpMethod);

type HttpStatusCodeType =
	| 'informational'
	| 'success'
	| 'clientError'
	| 'serverError'
	| 'redirection';

const validHttpStatusCodes: ReadonlySet<HttpStatusCodeType>
	= new Set<HttpStatusCodeType>([
		'informational',
		'success',
		'clientError',
		'serverError',
		'redirection',
	]);

template(
	'httpStatusCode',
	[
		{
			key: '--types <types>',
			transform: transformString,
			description: 'Can be one of ' + [...validHttpStatusCodes].join(', '),
		},
	],
	(sTypes: string) => {
		const split = sTypes
			.split(',')
			.map(s => s.trim())
			.filter(Boolean);

		const types: HttpStatusCodeType[] = [];

		for (const item of split) {
			if (validHttpStatusCodes.has(item as HttpStatusCodeType)) {
				types.push(item as HttpStatusCodeType);
			} else {
				throw new Error(`Unknown type "${item}"`);
			}
		}

		return module.httpStatusCode({
			types,
		});
	},
);

template('ip', [], module.ip);

template('ipv4', [], module.ipv4);

template('ipv6', [], module.ipv6);

template(
	'mac',
	[
		{
			key: '--sep <sep>',
			transform: stringOf(new Set(['', ':', '-'] as const)),
		},
	],
	module.mac,
);

template(
	'password',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
		{
			key: '--memorable',
		},
		{
			key: '--pattern <pattern>',
			transform(s: string | undefined) {
				if (s === undefined) {
					return s;
				}

				try {
					return new RegExp(s);
				} catch {
					throw new Error(`Invalid regex "${s}"`);
				}
			},
		},
		{
			key: '--prefix <prefix>',
			transform: transformString,
		},
	],
	module.password,
);

template('port', [], module.port);

template('protocol', [], module.protocol);

template('url', [], module.url);

template('userAgent', [], module.userAgent);

template(
	'userName',
	[
		{
			key: '--first-name <name>',
			transform: transformString,
		},
		{
			key: '--last-name <name>',
			transform: transformString,
		},
	],
	module.userName,
);
