import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger} from '../util.ts';

const module = faker.airline;
const template = createTemplate('airline');

template('aircraftType', [] as const, module.aircraftType);

template('airline', [] as const, module.airline);

template('airplane', [] as const, module.airplane);

template('airport', [] as const, module.airport);

template(
	'flightNumber',
	[
		{
			length: new Flag({
				flag: '--length <length>',
				transform: transformInteger,
			}),
			addLeadingZeros: new BooleanFlag({
				flag: '--add-leading-zeros',
			}),
		},
	] as const,
	module.flightNumber,
);

template(
	'recordLocator',
	[
		{
			allowNumerics: new BooleanFlag({
				flag: '--allow-numberics',
			}),
			allowVisuallySimilarCharacters: new BooleanFlag({
				flag: '--allow-visually-similar-characters',
			}),
		},
	],
	module.recordLocator,
);

template(
	'seat',
	[
		{
			aircraftType: new Flag({
				flag: '--aircraft-type <type>',
				transform: stringOf(
					new Set(['narrowbody', 'regional', 'widebody'] as const),
				),
			}),
		},
	],
	module.seat,
);
