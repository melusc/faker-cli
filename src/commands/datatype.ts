import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {
	matchRegex,
	stringOf,
	transformInteger,
	transformNumber,
	transformString,
} from '../util.js';

const module = faker.datatype;
const template = createTemplate('datatype');

template(
	'array',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
	],
	module.array,
);

template(
	'bigInt',
	[
		{
			min: {
				key: '--min <min>',
				transform: matchRegex(/^\d+$/),
			},
			max: {
				key: '--max <max>',
				transform: matchRegex(/^\d+$/),
			},
		},
	],
	(options: {min: string; max: string}) => module.bigInt(options),
);

template('boolean', [], module.boolean);

template(
	'datetime',
	[
		{
			min: {
				key: '--min <min>',
				transform: transformInteger,
			},
			max: {
				key: '--max <max>',
				transform: transformInteger,
			},
		},
	],
	(options: {min: number; max: number}) => module.datetime(options),
);

template(
	'float',
	[
		{
			min: {
				key: '--min <min>',
				transform: transformNumber,
			},
			max: {
				key: '--max <max>',
				transform: transformNumber,
			},
			precision: {
				key: '--precision <precision>',
				transform: transformNumber,
			},
		},
	],
	(options: {min: number; max: number; precision: number}) =>
		module.float(options),
);

template(
	'hexadecimal',
	[
		{
			length: {
				key: '--length <length>',
				transform: transformInteger,
			},
			prefix: {
				key: '--prefix <prefix>',
				transform: transformString,
			},
			case: {
				key: '--case <case>',
				transform: stringOf(new Set(['mixed', 'upper', 'lower'] as const)),
			},
		},
	],
	(options: {
		length: number;
		prefix: string;
		case: 'upper' | 'lower' | 'mixed';
	}) => module.hexadecimal(options),
);

template('json', [], module.json);

template(
	'number',
	[
		{
			min: {
				key: '--min <min>',
				transform: transformNumber,
			},
			max: {
				key: '--max <max>',
				transform: transformNumber,
			},
			precision: {
				key: '--precision <precision>',
				transform: transformNumber,
			},
		},
	],
	(options: {min: number; max: number; precision: number}) =>
		module.number(options),
);

template(
	'string',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
	],
	module.string,
);

template('uuid', [], module.uuid);
