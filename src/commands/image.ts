import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {transformInteger, transformNumber, transformString} from '../util.js';

const module = faker.image;
const template = createTemplate('image');

const imageTemplate = [
	{
		key: '--width <width>',
		transform: transformInteger,
	},
	{
		key: '--height <height>',
		transform: transformInteger,
	},
	{
		key: '--randomize',
	},
] as const;

template('abstract', imageTemplate, module.abstract);

template('animals', imageTemplate, module.animals);

template('avatar', [], module.avatar);

template('business', imageTemplate, module.business);

template('cats', imageTemplate, module.cats);

template('city', imageTemplate, module.city);

template(
	'dataUri',
	[
		{
			key: '--width <width>',
			transform: transformNumber,
		},
		{
			key: '--height <height>',
			transform: transformNumber,
		},
		{
			key: '--color <color>',
			transform: transformString,
		},
	],
	module.dataUri,
);

template('fashion', imageTemplate, module.fashion);

template('food', imageTemplate, module.food);

template('image', imageTemplate, module.image);

template(
	'imageUrl',
	[
		{
			key: '--width <width>',
			transform: transformInteger,
		},
		{
			key: '--height <height>',
			transform: transformInteger,
		},
		{
			key: '--category <category>',
			transform: transformString,
		},
		{
			key: '--randomize',
		},
	],
	module.imageUrl,
);

template('nature', imageTemplate, module.nature);

template('nightlife', imageTemplate, module.nightlife);

template('people', imageTemplate, module.people);

template('sports', imageTemplate, module.sports);

template('technics', imageTemplate, module.technics);

template('transport', imageTemplate, module.transport);
