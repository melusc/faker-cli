import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf, transformInteger, transformString} from '../util.js';

const module = faker.system;
const template = createTemplate('system');

template('commonFileExt', [], module.commonFileExt);

template(
	'commonFileName',
	[
		{
			key: '--ext <ext>',
			transform: transformString,
		},
	],
	module.commonFileName,
);

template('commonFileType', [], module.commonFileType);

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
	],
	module.cron,
);

template('directoryPath', [], module.directoryPath);

template(
	'fileExt',
	[
		{
			key: '--mime-type <mimeType>',
			transform: transformString,
		},
	],
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
	],
	module.fileName,
);

template('filePath', [], module.filePath);

template('fileType', [], module.fileType);

template('mimeType', [], module.mimeType);

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
	],
	module.networkInterface,
);

template('semver', [], module.semver);
