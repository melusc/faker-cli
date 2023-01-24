import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.js';
import {identity} from '../util.js';

const module = faker.phone;
const template = createTemplate('phone');

template('imei', [] as const, module.imei);

template(
	'number',
	[
		new Flag({
			flag: '--format <format>',
			transform: identity,
			description: '# are replaced with a random number',
		}),
	] as const,
	module.number,
);
