import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {
	identity,
	stringOf,
	transformInteger,
	transformNumber,
} from '../util.ts';

const template = createTemplate('location');

template('buildingNumber', [] as const);

template('cardinalDirection', [
	{
		abbreviated: new BooleanFlag({
			flag: '--abbreviated',
		}),
	},
] as const);

template('city', [] as const);

template('country', [] as const);

template('countryCode', [
	{
		variant: new Flag({
			flag: '--variant <code>',
			transform: stringOf(['alpha-2', 'alpha-3'] as const),
		}),
	},
] as const);

template('county', [] as const);

template('direction', [
	{
		abbreviated: new BooleanFlag({
			flag: '--abbreviated',
		}),
	},
] as const);

template('latitude', [
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
] as const);

template('longitude', [
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
] as const);

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
	{
		pre(...arguments_) {
			const [{origin}] = arguments_;
			if (origin === undefined || origin.every(t => t === undefined)) {
				// @ts-expect-error It is readonly
				options.origin = undefined;
				return arguments_;
			}

			if (origin?.some(n => n === undefined)) {
				throw new Error(
					`Expected coordinates to either all be undefined or a number, got [${origin
						.map(t => t ?? 'undefined')
						.join(', ')}].`,
				);
			}

			return arguments_;
		},
	},
);

template('ordinalDirection', [
	{
		abbreviated: new BooleanFlag({
			flag: '--abbreviated',
		}),
	},
] as const);

template('secondaryAddress', [] as const);

template('state', [
	{
		abbreviated: new BooleanFlag({
			flag: '--abreviated',
		}),
	},
] as const);

template('street', [] as const);

template('streetAddress', [
	{
		useFullAddress: new BooleanFlag({
			flag: '--use-full-address',
		}),
	},
] as const);

template('timeZone', [] as const);

template('zipCode', [
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
] as const);
