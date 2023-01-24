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
	] as const,
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
	] as const,
	module.bigInt,
);

template('boolean', [] as const, module.boolean);

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
	] as const,
	module.datetime,
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
	] as const,
	module.float,
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
	] as const,
	module.hexadecimal,
);

template('json', [] as const, module.json);

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
	] as const,
	module.number,
);

template(
	'string',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
	] as const,
	module.string,
);

template('uuid', [] as const, module.uuid);
