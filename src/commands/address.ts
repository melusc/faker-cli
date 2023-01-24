import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {
	stringOf,
	transformInteger,
	transformNumber,
	transformString,
} from '../util.js';

const module = faker.address;
const template = createTemplate('address');

template('buildingNumber', [] as const, module.buildingNumber);

template(
	'cardinalDirection',
	[
		{
			key: '--use-abbreviation',
		},
	] as const,
	module.cardinalDirection,
);

template('city', [] as const, module.city);

template('cityName', [] as const, module.cityName);

template('country', [] as const, module.country);

template(
	'countryCode',
	[
		{
			key: '--alpha-code <code>',
			transform: stringOf(new Set(['alpha-2', 'alpha-3'] as const)),
		},
	] as const,
	module.countryCode,
);

template('county', [] as const, module.county);

template(
	'direction',
	[
		{
			key: '--use-abbreviation',
		},
	] as const,
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
			transform: transformInteger,
		},
	] as const,
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
			transform: transformInteger,
		},
	] as const,
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
			key: '--metric',
		},
	] as const,
	module.nearbyGPSCoordinate,
	{
		pre(...args) {
			const [coordinates] = args;
			if (
				coordinates === undefined
				|| coordinates.every(t => t === undefined)
			) {
				// @ts-expect-error Typescript expects [number, number]
				// but faker can also take undefined
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
	] as const,
	module.ordinalDirection,
);

template('secondaryAddress', [] as const, module.secondaryAddress);

template('state', [] as const, module.state);

template('stateAbbr', [] as const, module.stateAbbr);

template('street', [] as const, module.street);

template(
	'streetAddress',
	[
		{
			key: '--use-full-address',
		},
	] as const,
	module.streetAddress,
);

template('streetName', [] as const, module.streetName);

template('timeZone', [] as const, module.timeZone);

template(
	'zipCode',
	[
		{
			key: '--format <format>',
			transform: transformString,
			description: '"#" is replaced with a number.',
		},
	] as const,
	module.zipCode,
);

template(
	'zipCodeByState',
	[
		{
			key: '--state <state>',
			transform: transformString,
			required: true,
		},
	] as const,
	module.zipCodeByState,
);
