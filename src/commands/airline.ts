import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger} from '../util.ts';

const template = createTemplate('airline');

template('aircraftType', [] as const);

template('airline', [] as const);

template('airplane', [] as const);

template('airport', [] as const);

template('flightNumber', [
	{
		length: new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
		addLeadingZeros: new BooleanFlag({
			flag: '--add-leading-zeros',
		}),
	},
] as const);

template('recordLocator', [
	{
		allowNumerics: new BooleanFlag({
			flag: '--allow-numberics',
		}),
		allowVisuallySimilarCharacters: new BooleanFlag({
			flag: '--allow-visually-similar-characters',
		}),
	},
]);

template('seat', [
	{
		aircraftType: new Flag({
			flag: '--aircraft-type <type>',
			transform: stringOf(
				new Set(['narrowbody', 'regional', 'widebody'] as const),
			),
		}),
	},
]);
