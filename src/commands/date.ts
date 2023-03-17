import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger, transformNumber} from '../util.ts';

const module = faker.date;
const template = createTemplate('date');

function transformDate(s: string): string | number {
	if (/^\d+$/.test(s)) {
		return Number(s);
	}

	return s;
}

template(
	'between',
	[
		new Flag({
			flag: '--from <from>',
			transform: transformDate,
			required: true,
		}),
		new Flag({
			flag: '--to <to>',
			transform: transformDate,
			required: true,
		}),
	] as const,
	module.between,
);

template(
	'betweens',
	[
		new Flag({
			flag: '--from <from>',
			transform: transformDate,
			required: true,
		}),
		new Flag({
			flag: '--to <to>',
			transform: transformDate,
			required: true,
		}),
		new Flag({
			flag: '--amount <amount>',
			transform: transformInteger,
		}),
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
			refDate: new Flag({
				flag: '--ref-date <date>',
				transform: transformDate,
			}),
		},
	] as const,
	module.birthdate,
);

template(
	'future',
	[
		new Flag({
			flag: '--years <years>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--ref-date <date>',
			transform: transformDate,
		}),
	] as const,
	module.future,
);

template(
	'month',
	[
		{
			abbr: new BooleanFlag({
				flag: '--abbreviate',
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
		new Flag({
			flag: '--years <years>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--ref-date <date>',
			transform: transformDate,
		}),
	] as const,
	module.past,
);

template(
	'recent',
	[
		new Flag({
			flag: '--days <days>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--ref-date <date>',
			transform: transformDate,
		}),
	] as const,
	module.recent,
);

template(
	'soon',
	[
		new Flag({
			flag: '--days <days>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--ref-date <date>',
			transform: transformDate,
		}),
	] as const,
	module.soon,
);

template(
	'weekday',
	[
		{
			abbr: new BooleanFlag({
				flag: '--abbreviate',
			}),
			context: new BooleanFlag({
				flag: '--context',
			}),
		},
	] as const,
	module.weekday,
);
