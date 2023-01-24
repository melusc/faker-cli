import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf, transformInteger, transformNumber} from '../util.js';

const module = faker.date;
const template = createTemplate('date');

function transformDate(s: string | undefined): string | number | undefined {
	if (s === undefined) {
		return undefined;
	}

	if (/^\d+$/.test(s)) {
		return Number(s);
	}

	return s;
}

template(
	'between',
	[
		{
			key: '--from <from>',
			transform: transformDate,
			required: true,
		},
		{
			key: '--to <to>',
			transform: transformDate,
			required: true,
		},
	] as const,
	module.between,
);

template(
	'betweens',
	[
		{
			key: '--from <from>',
			transform: transformDate,
			required: true,
		},
		{
			key: '--to <to>',
			transform: transformDate,
			required: true,
		},
		{
			key: '--amount <amount>',
			transform: transformInteger,
		},
	] as const,
	module.betweens,
);

template(
	'birthdate',
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
			mode: {
				key: '--mode <mode>',
				transform: stringOf(new Set(['age', 'year'] as const)),
			},
			refDate: {
				key: '--ref-date <date>',
				transform: transformDate,
			},
		},
	] as const,
	module.birthdate,
);

template(
	'future',
	[
		{
			key: '--years <years>',
			transform: transformNumber,
		},
		{
			key: '--ref-date <date>',
			transform: transformDate,
		},
	] as const,
	module.future,
);

template(
	'month',
	[
		{
			abbr: {
				key: '--abbreviate',
			},
			context: {
				key: '--context',
			},
		},
	] as const,
	module.month,
);

template(
	'past',
	[
		{
			key: '--years <years>',
			transform: transformNumber,
		},
		{
			key: '--ref-date <date>',
			transform: transformDate,
		},
	] as const,
	module.past,
);

template(
	'recent',
	[
		{
			key: '--days <days>',
			transform: transformNumber,
		},
		{
			key: '--ref-date <date>',
			transform: transformDate,
		},
	] as const,
	module.recent,
);

template(
	'soon',
	[
		{
			key: '--days <days>',
			transform: transformNumber,
		},
		{
			key: '--ref-date <date>',
			transform: transformDate,
		},
	] as const,
	module.soon,
);

template(
	'weekday',
	[
		{
			abbr: {
				key: '--abbreviate',
			},
			context: {
				key: '--context',
			},
		},
	] as const,
	module.weekday,
);
