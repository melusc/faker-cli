import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger, identity} from '../util.ts';

const module = faker.system;
const template = createTemplate('system');

template('commonFileExt', [] as const, module.commonFileExt);

template(
	'commonFileName',
	[
		new Flag({
			flag: '--ext <ext>',
			transform: identity,
		}),
	] as const,
	module.commonFileName,
);

template('commonFileType', [] as const, module.commonFileType);

template(
	'cron',
	[
		{
			includeNonStandard: new BooleanFlag({
				flag: '--include-non-standard',
			}),
			includeYear: new BooleanFlag({
				flag: '--include-year',
			}),
		},
	] as const,
	module.cron,
);

template('directoryPath', [] as const, module.directoryPath);

template(
	'fileExt',
	[
		new Flag({
			flag: '--mime-type <mimeType>',
			transform: identity,
		}),
	] as const,
	module.fileExt,
);

template(
	'fileName',
	[
		{
			extensionCount: new Flag({
				flag: '--extension-count <count>',
				transform: transformInteger,
			}),
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
			interfaceSchema: new Flag({
				flag: '--interface-schema <schema>',
				transform: stringOf(new Set(['index', 'slot', 'mac', 'pci'] as const)),
			}),
			interfaceType: new Flag({
				flag: '--interface-type <type>',
				transform: stringOf(new Set(['en', 'wl', 'ww'] as const)),
			}),
		},
	] as const,
	module.networkInterface,
);

template('semver', [] as const, module.semver);
