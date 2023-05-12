import {Flag, createTemplate} from '../command-template.ts';
import {identity, transformInteger, transformNumber} from '../util.ts';

const template = createTemplate('commerce');

template('department', [] as const);

template('price', [
	{
		min: new Flag({
			flag: '--min <min>',
			transform: transformNumber,
		}),
		max: new Flag({
			flag: '--max <max>',
			transform: transformNumber,
		}),
		dec: new Flag({
			flag: '--dec <decimal places>',
			transform: transformInteger,
		}),
		symbol: new Flag({
			flag: '--symbol <symbol>',
			transform: identity,
		}),
	},
] as const);

template('product', [] as const);

template('productAdjective', [] as const);

template('productDescription', [] as const);

template('productMaterial', [] as const);

template('productName', [] as const);
