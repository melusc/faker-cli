import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf, transformInteger, transformString} from '../util.js';

const module = faker.system;
const template = createTemplate('system');

template('commonFileExt', [] as const, module.commonFileExt);

template(
	'commonFileName',
	[
		{
			key: '--ext <ext>',
			transform: transformString,
		},
	] as const,
	module.commonFileName,
);

template('commonFileType', [] as const, module.commonFileType);

template(
	'cron',
	[
		{
			includeNonStandard: {
				key: '--include-non-standard',
			},
			includeYear: {
				key: '--include-year',
			},
		},
	] as const,
	module.cron,
);

template('directoryPath', [] as const, module.directoryPath);

template(
	'fileExt',
	[
		{
			key: '--mime-type <mimeType>',
			transform: transformString,
		},
	] as const,
	module.fileExt,
);

template(
	'fileName',
	[
		{
			extensionCount: {
				key: '--extension-count <count>',
				transform: transformInteger,
			},
		},
	] as const,
	module.fileName,
);

template('filePath', [] as const, module.filePath);

template('fileType', [] as const, module.fileType);

template('mimeType', [] as const, module.mimeType);

template(
	'networkInterface',
	[
		{
			interfaceSchema: {
				key: '--interface-schema <schema>',
				transform: stringOf(new Set(['index', 'slot', 'mac', 'pci'] as const)),
			},
			interfaceType: {
				key: '--interface-type <type>',
				transform: stringOf(new Set(['en', 'wl', 'ww'] as const)),
			},
		},
	] as const,
	module.networkInterface,
);

template('semver', [] as const, module.semver);
