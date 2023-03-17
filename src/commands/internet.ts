import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {integerBetween, stringOf, transformInteger, identity} from '../util.ts';

const module = faker.internet;
const template = createTemplate('internet');

template('avatar', [] as const, module.avatar);

template(
	'color',
	[
		new Flag({
			flag: '--red <int>',
			transform: integerBetween(0, 255),
		}),
		new Flag({
			flag: '--green <int>',
			transform: integerBetween(0, 255),
		}),
		new Flag({
			flag: '--blue <int>',
			transform: integerBetween(0, 255),
		}),
	] as const,
	module.color,
);

template(['domainName', 'domain'], [] as const, module.domainName);

template(['domainSuffix', 'suffix'], [] as const, module.domainSuffix);

template('domainWord', [] as const, module.domainWord);

template(
	'email',
	[
		new Flag({
			flag: '--first-name <name>',
			transform: identity,
		}),
		new Flag({
			flag: '--last-name <name>',
			transform: identity,
		}),
		new Flag({
			flag: '--provider <provider>',
			transform: identity,
		}),
		{
			allowSpecialCharacters: new BooleanFlag({
				flag: '--allow-special-characters',
			}),
		},
	] as const,
	module.email,
);

template('emoji', [] as const, module.emoji);

template(
	'exampleEmail',
	[
		new Flag({
			flag: '--first-name <name>',
			transform: identity,
		}),
		new Flag({
			flag: '--last-name <name>',
			transform: identity,
		}),
		{
			allowSpecialCharacters: new BooleanFlag({
				flag: '--allow-special-characters',
			}),
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
			types: new Flag({
				flag: '--types <types>',
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
		new Flag({
			flag: '--sep <sep>',
			transform: stringOf(new Set(['', ':', '-'] as const)),
		}),
	] as const,
	module.mac,
);

template(
	'password',
	[
		new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
		new BooleanFlag({
			flag: '--memorable',
		}),
		new Flag({
			flag: '--pattern <pattern>',
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
		}),
		new Flag({
			flag: '--prefix <prefix>',
			transform: identity,
		}),
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
		new Flag({
			flag: '--first-name <name>',
			transform: identity,
		}),
		new Flag({
			flag: '--last-name <name>',
			transform: identity,
		}),
	] as const,
	module.userName,
);
