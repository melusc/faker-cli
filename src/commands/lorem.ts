import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf, transformInteger, transformString} from '../util.js';

const module = faker.lorem;
const template = createTemplate('lorem');

template(
	'lines',
	[
		{
			key: '--line-count <count>',
			transform: transformInteger,
		},
	],
	module.lines,
);

template(
	'paragraph',
	[
		{
			key: '--sentence-count <count>',
			transform: transformInteger,
		},
	],
	module.paragraph,
);

template(
	'paragraphs',
	[
		{
			key: '--paragraph-count <count>',
			transform: transformInteger,
		},
		{
			key: '--separator <sep>',
			transform: transformString,
		},
	],
	module.paragraphs,
);

template(
	'sentence',
	[
		{
			key: '--word-count <count>',
			transform: transformInteger,
		},
	],
	module.sentence,
);

template(
	'sentences',
	[
		{
			key: '--sentence-count <count>',
			transform: transformInteger,
		},
		{
			key: '--separator <sep>',
			transform: transformString,
		},
	],
	module.sentences,
);

template(
	'slug',
	[
		{
			key: '--word-count <count>',
			transform: transformInteger,
		},
	],
	module.slug,
);

template('text', [], module.text);

template(
	'word',
	[
		{
			min: {
				key: '--min <min>',
				transform: transformInteger,
			},
			max: {
				key: '--max <max>',
				transform: transformInteger,
			},
		},
		{
			key: '--strategy <strategy>',
			transform: stringOf(
				new Set([
					'fail',
					'closest',
					'shortest',
					'longest',
					'any-length',
				] as const),
			),
		},
	],
	(
		length: {min: number; max: number},
		strategy: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length',
	) => module.word({length, strategy}),
	{
		pre(...args) {
			const [{min, max}] = args;
			if ((min === undefined) !== (max === undefined)) {
				throw new Error('max and min should both be undefined or both defined');
			}

			return args;
		},
	},
);

template(
	'words',
	[
		{
			key: '--amount <amount>',
			transform: transformInteger,
		},
	],
	module.words,
);
