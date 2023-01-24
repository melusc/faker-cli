import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {transformInteger, transformNumber, transformString} from '../util.js';

const module = faker.commerce;
const template = createTemplate('commerce');

template('department', [] as const, module.department);

template(
	'price',
	[
		{
			key: '--min <min>',
			transform: transformNumber,
		},
		{
			key: '--max <max>',
			transform: transformNumber,
		},
		{
			key: '--precision <precision>',
			transform: transformInteger,
		},
		{
			key: '--symbol <symbol>',
			transform: transformString,
		},
	] as const,
	module.price,
);

template('product', [] as const, module.product);

template('productAdjective', [] as const, module.productAdjective);

template('productDescription', [] as const, module.productDescription);

template('productMaterial', [] as const, module.productMaterial);

template('productName', [] as const, module.productName);
