import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf, transformNumber, transformString} from '../util.js';

const module = faker.address;
const template = createTemplate('address');

template('buildingNumber', [], module.buildingNumber);

template(
	'cardinalDirection',
	[
		{
			key: '--use-abbreviation',
		},
	],
	module.cardinalDirection,
);

template('city', [], module.city);

template('cityName', [], module.cityName);

template('country', [], module.country);

template(
	'countryCode',
	[
		{
			key: '--alpha-code <code>',
			transform: stringOf(new Set(['alpha-2', 'alpha-3'] as const)),
		},
	],
	module.countryCode,
);

template('county', [], module.county);

template(
	'direction',
	[
		{
			key: '--use-abbreviation',
		},
	],
	module.direction,
);

template(
	'latitude',
	[
		{
			key: '--max <max>',
			transform: transformNumber,
		},
		{
			key: '--min <min>',
			transform: transformNumber,
		},
		{
			key: '--precision <precision>',
			transform: transformNumber,
		},
	],
	module.latitude,
);

template(
	'longitude',
	[
		{
			key: '--max <max>',
			transform: transformNumber,
		},
		{
			key: '--min <min>',
			transform: transformNumber,
		},
		{
			key: '--precision <precision>',
			transform: transformNumber,
		},
	],
	module.longitude,
);

template(
	'nearbyGPSCoordinate',
	[
		[
			{
				key: '--latitude <latitude>',
				transform: transformNumber,
			},
			{
				key: '--longitude <longitude>',
				transform: transformNumber,
			},
		],
		{
			key: '--radius <radius>',
			transform: transformNumber,
		},
		{
			key: '--is-metric',
		},
	],
	module.nearbyGPSCoordinate,
	{
		pre(...args) {
			const [coordinates] = args;
			if (
				coordinates === undefined
				|| coordinates.every(t => t === undefined)
			) {
				args[0] = undefined;
				return args;
			}

			if (coordinates?.includes(undefined as any)) {
				throw new Error(
					`Expected coordinates to either all be undefined or a number, got [${coordinates
						.map(t => t ?? 'undefined')
						.join(', ')}].`,
				);
			}

			return args;
		},
	},
);

template(
	'ordinalDirection',
	[
		{
			key: '--use-abbreviation',
		},
	],
	module.ordinalDirection,
);

template('secondaryAddress', [], module.secondaryAddress);

template('state', [], module.state);

template('stateAbbr', [], module.stateAbbr);

template('street', [], module.street);

template(
	'streetAddress',
	[
		{
			key: '--use-full-address',
		},
	],
	module.streetAddress,
);

template('streetName', [], module.streetName);

template('timeZone', [], module.timeZone);

template(
	'zipCode',
	[
		{
			key: '--format <format>',
			transform: transformString,
			description: '"#" is replaced with a number.',
		},
	],
	module.zipCode,
);

template(
	'zipCodeByState',
	[
		{
			key: '--state <state>',
			transform: transformString,
		},
	],
	module.zipCodeByState,
);
