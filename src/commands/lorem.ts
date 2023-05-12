import {Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger, identity} from '../util.ts';

const template = createTemplate('lorem');

template('lines', [
	new Flag({
		flag: '--line-count <count>',
		transform: transformInteger,
	}),
] as const);

template('paragraph', [
	new Flag({
		flag: '--sentence-count <count>',
		transform: transformInteger,
	}),
] as const);

template('paragraphs', [
	new Flag({
		flag: '--paragraph-count <count>',
		transform: transformInteger,
	}),
	new Flag({
		flag: '--separator <sep>',
		transform: identity,
	}),
] as const);

template('sentence', [
	new Flag({
		flag: '--word-count <count>',
		transform: transformInteger,
	}),
] as const);

template('sentences', [
	new Flag({
		flag: '--sentence-count <count>',
		transform: transformInteger,
	}),
	new Flag({
		flag: '--separator <sep>',
		transform: identity,
	}),
] as const);

template('slug', [
	new Flag({
		flag: '--word-count <count>',
		transform: transformInteger,
	}),
] as const);

template('text', [] as const);

template('word', [
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
] as const);

template('words', [
	new Flag({
		flag: '--word-count <amount>',
		transform: transformInteger,
	}),
] as const);
