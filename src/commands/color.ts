import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf} from '../util.js';

const module = faker.color;
const template = createTemplate('color');

const colorFormat = {
	format: {
		key: '--format <format>',
		transform: stringOf(new Set(['css', 'binary', 'decimal'] as const)),
	},
} as const;

template('cmyk', [colorFormat], module.cmyk);

template('colorByCSSColorSpace', [colorFormat], module.colorByCSSColorSpace);

template('cssSupportedFunction', [], module.cssSupportedFunction);

template('cssSupportedSpace', [], module.cssSupportedSpace);

template('hsl', [colorFormat], module.hsl);

template('human', [], module.human);

template('hwb', [colorFormat], module.hwb);

template('lab', [colorFormat], module.lab);

template('lch', [colorFormat], module.lch);

template('rgb', [colorFormat], module.rgb);

template('space', [], module.space);
