import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {transformString} from '../util.js';

const module = faker.phone;
const template = createTemplate('phone');

template('imei', [] as const, module.imei);

template(
	'number',
	[
		{
			key: '--format <format>',
			transform: transformString,
			description: '# are replaced with a random number',
		},
	] as const,
	module.number,
);
