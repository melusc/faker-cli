import {Flag, createTemplate} from '../command-template.ts';
import {matchRegex, transformInteger, transformNumber} from '../util.ts';

const template = createTemplate('number');

template('bigInt', [
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
]);

template('binary', [
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
]);

template('float', [
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
]);

template('hex', [
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
]);

template('int', [
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
]);

template('octal', [
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
]);
