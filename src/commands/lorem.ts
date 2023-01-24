import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.js';
import {stringOf, transformInteger, identity} from '../util.js';

const module = faker.lorem;
const template = createTemplate('lorem');

template(
	'lines',
	[
		new Flag({
			flag: '--line-count <count>',
			transform: transformInteger,
		}),
	] as const,
	module.lines,
);

template(
	'paragraph',
	[
		new Flag({
			flag: '--sentence-count <count>',
			transform: transformInteger,
		}),
	] as const,
	module.paragraph,
);

template(
	'paragraphs',
	[
		new Flag({
			flag: '--paragraph-count <count>',
			transform: transformInteger,
		}),
		new Flag({
			flag: '--separator <sep>',
			transform: identity,
		}),
	] as const,
	module.paragraphs,
);

template(
	'sentence',
	[
		new Flag({
			flag: '--word-count <count>',
			transform: transformInteger,
		}),
	] as const,
	module.sentence,
);

template(
	'sentences',
	[
		new Flag({
			flag: '--sentence-count <count>',
			transform: transformInteger,
		}),
		new Flag({
			flag: '--separator <sep>',
			transform: identity,
		}),
	] as const,
	module.sentences,
);

template(
	'slug',
	[
		new Flag({
			flag: '--word-count <count>',
			transform: transformInteger,
		}),
	] as const,
	module.slug,
);

template('text', [] as const, module.text);

template(
	'word',
	[
		{
			length: {
				min: new Flag({
					flag: '--min <min>',
					transform: transformInteger,
				}),
				max: new Flag({
					flag: '--max <max>',
					transform: transformInteger,
				}),
			},
			strategy: new Flag({
				flag: '--strategy <strategy>',
				transform: stringOf(
					new Set([
						'fail',
						'closest',
						'shortest',
						'longest',
						'any-length',
					] as const),
				),
			}),
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
		new Flag({
			flag: '--amount <amount>',
			transform: transformInteger,
		}),
	] as const,
	module.words,
);
