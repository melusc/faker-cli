import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger, identity} from '../util.ts';

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
			length: new Flag({
				flag: '--length <length>',
				transform: transformInteger,
			}),
			strategy: new Flag({
				flag: '--strategy <strategy>',
				transform: stringOf(
					new Set([
						'any-length',
						'closest',
						'fail',
						'longest',
						'shortest',
					] as const),
				),
			}),
		},
	] as const,
	module.word,
);

template(
	'words',
	[
		new Flag({
			flag: '--word-count <amount>',
			transform: transformInteger,
		}),
	] as const,
	module.words,
);
