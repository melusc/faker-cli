import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {identity, stringOf} from '../util.ts';

const template = createTemplate('color');

const formatFlag = new Flag({
	flag: '--format <format>',
	transform: stringOf(new Set(['css', 'binary', 'decimal'] as const)),
});

const spaceFlag = new Flag({
	flag: '--space <space>',
	transform: stringOf(
		new Set([
			'sRGB',
			'display-p3',
			'rec2020',
			'a98-rgb',
			'prophoto-rgb',
		] as const),
	),
});

const includeAlphaFlag = new BooleanFlag({
	flag: '--include-alpha',
});

template('cmyk', [
	{
		format: formatFlag,
	},
]);

template('colorByCSSColorSpace', [
	{
		format: formatFlag,
		space: spaceFlag,
	},
]);

template('cssSupportedFunction', [] as const);

template('cssSupportedSpace', [] as const);

template('hsl', [
	{
		format: formatFlag,
		includeAlpha: includeAlphaFlag,
	},
]);

template('human', [] as const);

template('hwb', [
	{
		format: formatFlag,
	},
]);

template('lab', [
	{
		format: formatFlag,
	},
]);

template('lch', [
	{
		format: formatFlag,
	},
]);

template('rgb', [
	{
		format: new Flag({
			flag: '--format <format>',
			transform: stringOf(
				new Set(['hex', 'css', 'binary', 'decimal'] as const),
			),
		}),
		includeAlpha: includeAlphaFlag,
		prefix: new Flag({
			flag: '--prefix <prefix>',
			transform: identity,
		}),
		casing: new Flag({
			flag: '--casing <casing>',
			transform: stringOf(new Set(['lower', 'upper', 'mixed'] as const)),
		}),
	},
]);

template('space', [] as const);
