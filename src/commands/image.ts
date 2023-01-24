import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.js';
import {transformInteger, transformNumber, identity} from '../util.js';

const module = faker.image;
const template = createTemplate('image');

const imageTemplate = [
	new Flag({
		flag: '--width <width>',
		transform: transformInteger,
	}),
	new Flag({
		flag: '--height <height>',
		transform: transformInteger,
	}),
	new BooleanFlag({
		flag: '--randomize',
	}),
] as const;

template('abstract', imageTemplate, module.abstract);

template('animals', imageTemplate, module.animals);

template('avatar', [] as const, module.avatar);

template('business', imageTemplate, module.business);

template('cats', imageTemplate, module.cats);

template('city', imageTemplate, module.city);

template(
	'dataUri',
	[
		new Flag({
			flag: '--width <width>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--height <height>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--color <color>',
			transform: identity,
		}),
	] as const,
	module.dataUri,
);

template('fashion', imageTemplate, module.fashion);

template('food', imageTemplate, module.food);

template('image', imageTemplate, module.image);

template(
	'imageUrl',
	[
		new Flag({
			flag: '--width <width>',
			transform: transformInteger,
		}),
		new Flag({
			flag: '--height <height>',
			transform: transformInteger,
		}),
		new Flag({
			flag: '--category <category>',
			transform: identity,
		}),
		new BooleanFlag({
			flag: '--randomize',
		}),
	] as const,
	module.imageUrl,
);

template('nature', imageTemplate, module.nature);

template('nightlife', imageTemplate, module.nightlife);

template('people', imageTemplate, module.people);

template('sports', imageTemplate, module.sports);

template('technics', imageTemplate, module.technics);

template('transport', imageTemplate, module.transport);
