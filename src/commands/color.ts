import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {identity, stringOf} from '../util.ts';

const module = faker.color;
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

template(
	'cmyk',
	[
		{
			format: formatFlag,
		},
	],
	module.cmyk,
);

template(
	'colorByCSSColorSpace',
	[
		{
			format: formatFlag,
			space: spaceFlag,
		},
	],
	module.colorByCSSColorSpace,
);

template('cssSupportedFunction', [] as const, module.cssSupportedFunction);

template('cssSupportedSpace', [] as const, module.cssSupportedSpace);

template(
	'hsl',
	[
		{
			format: formatFlag,
			includeAlpha: includeAlphaFlag,
		},
	],
	module.hsl,
);

template('human', [] as const, module.human);

template(
	'hwb',
	[
		{
			format: formatFlag,
		},
	],
	module.hwb,
);

template(
	'lab',
	[
		{
			format: formatFlag,
		},
	],
	module.lab,
);

template(
	'lch',
	[
		{
			format: formatFlag,
		},
	],
	module.lch,
);

template(
	'rgb',
	[
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
	],
	module.rgb,
);

template('space', [] as const, module.space);
