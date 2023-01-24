import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.js';
import {stringOf} from '../util.js';

const module = faker.color;
const template = createTemplate('color');

const colorFormat = [
	{
		format: new Flag({
			flag: '--format <format>',
			transform: stringOf(new Set(['css', 'binary', 'decimal'] as const)),
		}),
	},
] as const;

template('cmyk', colorFormat, module.cmyk);

template('colorByCSSColorSpace', colorFormat, module.colorByCSSColorSpace);

template('cssSupportedFunction', [] as const, module.cssSupportedFunction);

template('cssSupportedSpace', [] as const, module.cssSupportedSpace);

template('hsl', colorFormat, module.hsl);

template('human', [] as const, module.human);

template('hwb', colorFormat, module.hwb);

template('lab', colorFormat, module.lab);

template('lch', colorFormat, module.lch);

template('rgb', colorFormat, module.rgb);

template('space', [] as const, module.space);
