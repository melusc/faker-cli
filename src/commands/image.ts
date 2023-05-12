import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {
	identity,
	integerBetween,
	stringOf,
	transformInteger,
	transformNumber,
} from '../util.ts';

const template = createTemplate('image');

template('avatar', [] as const);

template('avatarGitHub', [] as const);

template('avatarLegacy', [] as const);

template('dataUri', [
	{
		width: new Flag({
			flag: '--width <width>',
			transform: transformNumber,
		}),
		height: new Flag({
			flag: '--height <height>',
			transform: transformNumber,
		}),
		color: new Flag({
			flag: '--color <color>',
			transform: identity,
		}),
	},
]);

template('url', [
	{
		width: new Flag({
			flag: '--width <width>',
			transform: transformInteger,
		}),
		height: new Flag({
			flag: '--height <height>',
			transform: transformInteger,
		}),
	},
]);

template('urlLoremFlickr', [
	{
		category: new Flag({
			flag: '--category <category>',
			transform: identity,
		}),
		height: new Flag({
			flag: '--height <height>',
			transform: transformInteger,
		}),
		width: new Flag({
			flag: '--width <width>',
			transform: transformInteger,
		}),
	},
]);

template('urlPicsumPhotos', [
	{
		blur: new Flag({
			flag: '--blur <level>',
			transform: integerBetween(1, 10) as (
				s: string,
			) => 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
		}),
		grayscale: new BooleanFlag({
			flag: '--grayscale',
		}),
		height: new Flag({
			flag: '--height <height>',
			transform: transformInteger,
		}),
		width: new Flag({
			flag: '--width <width>',
			transform: transformInteger,
		}),
	},
]);

template('urlPlaceholder', [
	{
		backgroundColor: new Flag({
			flag: '--background-color <color>',
			transform: identity,
		}),
		format: new Flag({
			flag: '--format <image format>',
			transform: stringOf(
				new Set(['gif', 'jpeg', 'jpg', 'png', 'webp'] as const),
			),
		}),
		height: new Flag({
			flag: '--height <height>',
			transform: transformInteger,
		}),
		text: new Flag({
			flag: '--text <text>',
			transform: identity,
		}),
		textColor: new Flag({
			flag: '--text-color <color>',
			transform: identity,
		}),
		width: new Flag({
			flag: '--width <width>',
			transform: transformInteger,
		}),
	},
]);
