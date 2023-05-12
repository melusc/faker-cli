import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger} from '../util.ts';

const module = faker.word;
const template = createTemplate('word');

const lengthFlag = new Flag({
	flag: '--length <length>',
	transform: transformInteger,
});

const strategyFlag = new Flag({
	flag: '--strategy <strategy>',
	transform: stringOf([
		'any-length',
		'closest',
		'fail',
		'longest',
		'shortest',
	] as const),
	description:
		"One of 'any-length' | 'closest' | 'fail' | 'longest' | 'shortest'",
});

template(
	'adjective',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.adjective,
);

template(
	'adverb',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.adverb,
);

template(
	'conjunction',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.conjunction,
);

template(
	'interjection',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.interjection,
);

template(
	'noun',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.noun,
);

template(
	'preposition',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.preposition,
);

template(
	'sample',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.sample,
);

template(
	'verb',
	[
		{
			length: lengthFlag,
			strategy: strategyFlag,
		},
	],
	module.verb,
);

template(
	'words',
	[
		{
			count: new Flag({
				flag: '--count <count>',
				transform: transformInteger,
			}),
		},
	],
	module.words,
);
