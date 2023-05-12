import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformDate, transformInteger, transformNumber} from '../util.ts';

const module = faker.date;
const template = createTemplate('date');

const refDateFlag = new Flag({
	flag: '--ref-date <date>',
	transform: transformDate,
});

template(
	'anytime',
	[
		{
			refDate: refDateFlag,
		},
	] as const,
	module.anytime,
);

template(
	'between',
	[
		{
			from: new Flag({
				flag: '--from <from>',
				transform: transformDate,
				required: true,
			}),
			to: new Flag({
				flag: '--to <to>',
				transform: transformDate,
				required: true,
			}),
		},
	] as const,
	module.between,
);

template(
	'betweens',
	[
		{
			from: new Flag({
				flag: '--from <from>',
				transform: transformDate,
				required: true,
			}),
			to: new Flag({
				flag: '--to <to>',
				transform: transformDate,
				required: true,
			}),
			count: new Flag({
				flag: '--count <count>',
				transform: transformInteger,
			}),
		},
	] as const,
	module.betweens,
);

template(
	'birthdate',
	[
		{
			min: new Flag({
				flag: '--min <min>',
				transform: transformInteger,
			}),
			max: new Flag({
				flag: '--max <max>',
				transform: transformInteger,
			}),
			mode: new Flag({
				flag: '--mode <mode>',
				transform: stringOf(new Set(['age', 'year'] as const)),
			}),
			refDate: refDateFlag,
		},
	] as const,
	module.birthdate,
);

template(
	'future',
	[
		{
			years: new Flag({
				flag: '--years <years>',
				transform: transformNumber,
			}),
			refDate: refDateFlag,
		},
	] as const,
	module.future,
);

template(
	'month',
	[
		{
			abbreviated: new BooleanFlag({
				flag: '--abbreviated',
			}),
			context: new BooleanFlag({
				flag: '--context',
			}),
		},
	] as const,
	module.month,
);

template(
	'past',
	[
		{
			years: new Flag({
				flag: '--years <years>',
				transform: transformNumber,
			}),
			refDate: refDateFlag,
		},
	] as const,
	module.past,
);

template(
	'recent',
	[
		{
			days: new Flag({
				flag: '--days <days>',
				transform: transformNumber,
			}),
			refDate: refDateFlag,
		},
	] as const,
	module.recent,
);

template(
	'soon',
	[
		{
			days: new Flag({
				flag: '--days <days>',
				transform: transformNumber,
			}),
			refDate: refDateFlag,
		},
	] as const,
	module.soon,
);

template(
	'weekday',
	[
		{
			abbreviated: new BooleanFlag({
				flag: '--abbreviated',
			}),
			context: new BooleanFlag({
				flag: '--context',
			}),
		},
	] as const,
	module.weekday,
);
