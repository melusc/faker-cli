import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger, identity} from '../util.ts';

const template = createTemplate('system');

template('commonFileExt', [] as const);

template('commonFileName', [
	new Flag({
		flag: '--ext <ext>',
		transform: identity,
	}),
] as const);

template('commonFileType', [] as const);

template('cron', [
	{
		includeNonStandard: new BooleanFlag({
			flag: '--include-non-standard',
		}),
		includeYear: new BooleanFlag({
			flag: '--include-year',
		}),
	},
] as const);

template('directoryPath', [] as const);

template('fileExt', [
	new Flag({
		flag: '--mime-type <mimeType>',
		transform: identity,
	}),
] as const);

template('fileName', [
	{
		extensionCount: new Flag({
			flag: '--extension-count <count>',
			transform: transformInteger,
		}),
	},
] as const);

template('filePath', [] as const);

template('fileType', [] as const);

template('mimeType', [] as const);

template('networkInterface', [
	{
		interfaceSchema: new Flag({
			flag: '--interface-schema <schema>',
			transform: stringOf(new Set(['index', 'slot', 'mac', 'pci'] as const)),
		}),
		interfaceType: new Flag({
			flag: '--interface-type <type>',
			transform: stringOf(new Set(['en', 'wl', 'ww'] as const)),
		}),
	},
] as const);

template('semver', [] as const);
