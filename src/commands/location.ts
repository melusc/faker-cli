import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {
	stringOf,
	transformInteger,
	transformNumber,
	identity,
} from '../util.ts';

const module = faker.location;
const template = createTemplate('location');

template('buildingNumber', [] as const, module.buildingNumber);

template(
	'cardinalDirection',
	[
		{
			abbreviated: new BooleanFlag({
				flag: '--abbreviated',
			}),
		},
	] as const,
	module.cardinalDirection,
);

template('city', [] as const, module.city);

template('country', [] as const, module.country);

template(
	'countryCode',
	[
		{
			variant: new Flag({
				flag: '--variant <code>',
				transform: stringOf(['alpha-2', 'alpha-3'] as const),
			}),
		},
	] as const,
	module.countryCode,
);

template('county', [] as const, module.county);

template(
	'direction',
	[
		{
			abbreviated: new BooleanFlag({
				flag: '--abbreviated',
			}),
		},
	] as const,
	module.direction,
);

template(
	'latitude',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: transformNumber,
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: transformNumber,
			}),
			precision: new Flag({
				flag: '--precision <precision>',
				transform: transformInteger,
			}),
		},
	] as const,
	module.latitude,
);

template(
	'longitude',
	[
		{
			max: new Flag({
				flag: '--max <max>',
				transform: transformNumber,
			}),
			min: new Flag({
				flag: '--min <min>',
				transform: transformNumber,
			}),
			precision: new Flag({
				flag: '--precision <precision>',
				transform: transformInteger,
			}),
		},
	] as const,
	module.longitude,
);

template(
	'nearbyGPSCoordinate',
	[
		{
			isMetric: new BooleanFlag({
				flag: '--metric',
			}),
			origin: [
				new Flag({
					flag: '--latitude <latitude>',
					transform: transformNumber,
				}),
				new Flag({
					flag: '--longitude <longitude>',
					transform: transformNumber,
				}),
			],
			radius: new Flag({
				flag: '--radius <radius>',
				transform: transformNumber,
			}),
		},
	] as const,
	options =>
		module.nearbyGPSCoordinate({
			...options,
			origin: [...options.origin],
		}),
	{
		pre(...args) {
			const [{origin}] = args;
			if (origin === undefined || origin.every(t => t === undefined)) {
				// @ts-expect-error It is readonly
				options.origin = undefined;
				return args;
			}

			if (origin?.some(n => n === undefined)) {
				throw new Error(
					`Expected coordinates to either all be undefined or a number, got [${origin
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
			abbreviated: new BooleanFlag({
				flag: '--abbreviated',
			}),
		},
	] as const,
	module.ordinalDirection,
);

template('secondaryAddress', [] as const, module.secondaryAddress);

template(
	'state',
	[
		{
			abbreviated: new BooleanFlag({
				flag: '--abreviated',
			}),
		},
	] as const,
	module.state,
);

template('street', [] as const, module.street);

template(
	'streetAddress',
	[
		{
			useFullAddress: new BooleanFlag({
				flag: '--use-full-address',
			}),
		},
	] as const,
	module.streetAddress,
);

template('timeZone', [] as const, module.timeZone);

template(
	'zipCode',
	[
		{
			format: new Flag({
				flag: '--format <format>',
				transform: identity,
				description: '"#" is replaced with a number.',
			}),
			state: new Flag({
				flag: '--state <state>',
				transform: identity,
			}),
		},
	] as const,
	module.zipCode,
);
