import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.ts';
import {transformInteger, transformNumber, identity} from '../util.ts';

const module = faker.commerce;
const template = createTemplate('commerce');

template('department', [] as const, module.department);

template(
	'price',
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
			dec: new Flag({
				flag: '--dec <decimal places>',
				transform: transformInteger,
			}),
			symbol: new Flag({
				flag: '--symbol <symbol>',
				transform: identity,
			}),
		},
	] as const,
	module.price,
);

template('product', [] as const, module.product);

template('productAdjective', [] as const, module.productAdjective);

template('productDescription', [] as const, module.productDescription);

template('productMaterial', [] as const, module.productMaterial);

template('productName', [] as const, module.productName);
