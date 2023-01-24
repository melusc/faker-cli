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
	] as const,
	module.lines,
);

template(
	'paragraph',
	[
		{
			key: '--sentence-count <count>',
			transform: transformInteger,
		},
	] as const,
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
	] as const,
	module.paragraphs,
);

template(
	'sentence',
	[
		{
			key: '--word-count <count>',
			transform: transformInteger,
		},
	] as const,
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
	] as const,
	module.sentences,
);

template(
	'slug',
	[
		{
			key: '--word-count <count>',
			transform: transformInteger,
		},
	] as const,
	module.slug,
);

template('text', [] as const, module.text);

template(
	'word',
	[
		{
			length: {
				min: {
					key: '--min <min>',
					transform: transformInteger,
				},
				max: {
					key: '--max <max>',
					transform: transformInteger,
				},
			},
			strategy: {
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
		},
	] as const,
	module.word,
	{
		pre(...args) {
			const min = args[0]?.length?.min;
			const max = args[0]?.length?.max;
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
	] as const,
	module.words,
);
