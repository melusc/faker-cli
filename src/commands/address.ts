import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.js';
import {
	stringOf,
	transformInteger,
	transformNumber,
	identity,
} from '../util.js';

const module = faker.address;
const template = createTemplate('address');

template('buildingNumber', [] as const, module.buildingNumber);

template(
	'cardinalDirection',
	[
		new BooleanFlag({
			flag: '--use-abbreviation',
		}),
	] as const,
	module.cardinalDirection,
);

template('city', [] as const, module.city);

template('cityName', [] as const, module.cityName);

template('country', [] as const, module.country);

template(
	'countryCode',
	[
		new Flag({
			flag: '--alpha-code <code>',
			transform: stringOf(new Set(['alpha-2', 'alpha-3'] as const)),
		}),
	] as const,
	module.countryCode,
);

template('county', [] as const, module.county);

template(
	'direction',
	[
		new BooleanFlag({
			flag: '--use-abbreviation',
		}),
	] as const,
	module.direction,
);

template(
	'latitude',
	[
		new Flag({
			flag: '--max <max>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--min <min>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--precision <precision>',
			transform: transformInteger,
		}),
	] as const,
	module.latitude,
);

template(
	'longitude',
	[
		new Flag({
			flag: '--max <max>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--min <min>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--precision <precision>',
			transform: transformInteger,
		}),
	] as const,
	module.longitude,
);

template(
	'nearbyGPSCoordinate',
	[
		[
			new Flag({
				flag: '--latitude <latitude>',
				transform: transformNumber,
			}),
			new Flag({
				flag: '--longitude <longitude>',
				transform: transformNumber,
			}),
		],
		new Flag({
			flag: '--radius <radius>',
			transform: transformNumber,
		}),
		new BooleanFlag({
			flag: '--metric',
		}),
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
		new BooleanFlag({
			flag: '--use-abbreviation',
		}),
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
		new BooleanFlag({
			flag: '--use-full-address',
		}),
	] as const,
	module.streetAddress,
);

template('streetName', [] as const, module.streetName);

template('timeZone', [] as const, module.timeZone);

template(
	'zipCode',
	[
		new Flag({
			flag: '--format <format>',
			transform: identity,
			description: '"#" is replaced with a number.',
		}),
	] as const,
	module.zipCode,
);

template(
	'zipCodeByState',
	[
		new Flag({
			flag: '--state <state>',
			transform: identity,
			required: true,
		}),
	] as const,
	module.zipCodeByState,
);
