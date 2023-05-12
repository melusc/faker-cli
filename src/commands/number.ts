import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.ts';
import {matchRegex, transformInteger, transformNumber} from '../util.ts';

const module = faker.number;
const template = createTemplate('number');

template(
	'bigInt',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: matchRegex(/^-?\d+$/),
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: matchRegex(/^-?\d+$/),
			}),
		},
	],
	module.bigInt,
);

template(
	'binary',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: transformInteger,
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: transformInteger,
			}),
		},
	],
	module.binary,
);

template(
	'float',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: transformNumber,
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: transformNumber,
			}),
			precision: new Flag({
				flag: '--precision <precision>',
				transform: transformNumber,
			}),
		},
	],
	module.float,
);

template(
	'hex',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: transformInteger,
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: transformInteger,
			}),
		},
	],
	module.hex,
);

template(
	'int',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: transformInteger,
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: transformInteger,
			}),
		},
	],
	module.int,
);

template(
	'octal',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: transformInteger,
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: transformInteger,
			}),
		},
	],
	module.octal,
);
