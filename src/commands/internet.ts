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

template('avatar', [] as const, module.avatar);

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
	] as const,
	module.color,
);

template(['domainName', 'domain'], [] as const, module.domainName);

template(['domainSuffix', 'suffix'], [] as const, module.domainSuffix);

template('domainWord', [] as const, module.domainWord);

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
	] as const,
	module.email,
);

template('emoji', [] as const, module.emoji);

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
	] as const,
	module.exampleEmail,
);

template('httpMethod', [] as const, module.httpMethod);

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
			types: {
				key: '--types <types>',
				transform(s: string | undefined) {
					if (s === undefined) {
						return undefined;
					}

					const split = s
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

					return types;
				},
				description: 'Can be one of ' + [...validHttpStatusCodes].join(', '),
			},
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
			key: '--sep <sep>',
			transform: stringOf(new Set(['', ':', '-'] as const)),
		},
	] as const,
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
	] as const,
	module.password,
);

template('port', [] as const, module.port);

template('protocol', [] as const, module.protocol);

template('url', [] as const, module.url);

template('userAgent', [] as const, module.userAgent);

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
	] as const,
	module.userName,
);
