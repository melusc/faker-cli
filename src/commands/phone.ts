import {Flag, createTemplate} from '../command-template.ts';
import {identity} from '../util.ts';

const template = createTemplate('phone');

template('imei', [] as const);

template('number', [
	new Flag({
		flag: '--format <format>',
		transform: identity,
		description: '# are replaced with a random number',
	}),
] as const);
