import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.ts';
import {identity} from '../util.ts';

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
