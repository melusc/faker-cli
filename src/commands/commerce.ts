import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {transformInteger, transformNumber, transformString} from '../util.js';

const module = faker.commerce;
const template = createTemplate('commerce');

template('department', [], module.department);

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
	],
	module.price,
);

template('product', [], module.product);

template('productAdjective', [], module.productAdjective);

template('productDescription', [], module.productDescription);

template('productMaterial', [], module.productMaterial);

template('productName', [], module.productName);
