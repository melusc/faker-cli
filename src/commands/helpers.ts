import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.ts';
import {identity, transformNumber} from '../util.ts';

const module = faker.helpers;
const template = createTemplate('helpers');

template(
	'rangeToNumber',
	[
		{
			min: new Flag({
				flag: '--min <min>',
				transform: transformNumber,
				required: true,
			}),
			max: new Flag({
				flag: '--max <max>',
				transform: transformNumber,
				required: true,
			}),
		},
	],
	module.rangeToNumber,
);

template(
	'replaceCreditCardSymbols',
	[
		new Flag({
			flag: '--string <string>',
			transform: identity,
		}),
		new Flag({
			flag: '--symbol <symbol>',
			transform: identity,
		}),
	],
	module.replaceCreditCardSymbols,
);

template(
	'replaceSymbolWithNumber',
	[
		new Flag({
			flag: '--string <string>',
			transform: identity,
		}),
		new Flag({
			flag: '--symbol <symbol>',
			transform: identity,
		}),
	],
	module.replaceSymbolWithNumber,
);

template(
	'replaceSymbols',
	[
		new Flag({
			flag: '--string <string>',
			transform: identity,
			description: `# will be replaced with a digit (0 - 9).
? will be replaced with an upper letter ('A' - 'Z')
and * will be replaced with either a digit or letter.`,
		}),
	],
	module.replaceSymbols,
);

template(
	'slugify',
	[
		new Flag({
			flag: '--string <string>',
			transform: identity,
		}),
	],
	module.slugify,
);
