import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.js';
import {
	matchRegex,
	stringOf,
	transformInteger,
	transformNumber,
	identity,
} from '../util.js';

const module = faker.datatype;
const template = createTemplate('datatype');

template(
	'array',
	[
		new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
	] as const,
	module.array,
);

template(
	'bigInt',
	[
		{
			min: new Flag({
				flag: '--min <min>',
				transform: matchRegex(/^\d+$/),
			}),
			max: new Flag({
				flag: '--max <max>',
				transform: matchRegex(/^\d+$/),
			}),
		},
	] as const,
	module.bigInt,
);

template('boolean', [] as const, module.boolean);

template(
	'datetime',
	[
		{
			min: new Flag({
				flag: '--min <min>',
				transform: transformInteger,
			}),
			max: new Flag({
				flag: '--max <max>',
				transform: transformInteger,
			}),
		},
	] as const,
	module.datetime,
);

template(
	'float',
	[
		{
			min: new Flag({
				flag: '--min <min>',
				transform: transformNumber,
			}),
			max: new Flag({
				flag: '--max <max>',
				transform: transformNumber,
			}),
			precision: new Flag({
				flag: '--precision <precision>',
				transform: transformNumber,
			}),
		},
	] as const,
	module.float,
);

template(
	'hexadecimal',
	[
		{
			length: new Flag({
				flag: '--length <length>',
				transform: transformInteger,
			}),
			prefix: new Flag({
				flag: '--prefix <prefix>',
				transform: identity,
			}),
			case: new Flag({
				flag: '--case <case>',
				transform: stringOf(new Set(['mixed', 'upper', 'lower'] as const)),
			}),
		},
	] as const,
	module.hexadecimal,
);

template('json', [] as const, module.json);

template(
	'number',
	[
		{
			min: new Flag({
				flag: '--min <min>',
				transform: transformNumber,
			}),
			max: new Flag({
				flag: '--max <max>',
				transform: transformNumber,
			}),
			precision: new Flag({
				flag: '--precision <precision>',
				transform: transformNumber,
			}),
		},
	] as const,
	module.number,
);

template(
	'string',
	[
		new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
	] as const,
	module.string,
);

template('uuid', [] as const, module.uuid);
