import {Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger} from '../util.ts';

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

template('adjective', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('adverb', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('conjunction', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('interjection', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('noun', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('preposition', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('sample', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('verb', [
	{
		length: lengthFlag,
		strategy: strategyFlag,
	},
]);

template('words', [
	{
		count: new Flag({
			flag: '--count <count>',
			transform: transformInteger,
		}),
	},
]);
