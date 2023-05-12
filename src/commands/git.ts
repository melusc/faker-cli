import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformDate, transformInteger} from '../util.ts';

const refDateFlag = new Flag({
	flag: '--ref-date <date>',
	transform: transformDate,
});

const module = faker.git;
const template = createTemplate('git');

template('branch', [] as const, module.branch);

template(
	'commitDate',
	[
		{
			refDate: refDateFlag,
		},
	] as const,
	module.commitDate,
);

template(
	'commitEntry',
	[
		{
			eol: new Flag({
				flag: '--eol <eol>',
				transform: stringOf(new Set(['LF', 'CRLF'] as const)),
			}),
			merge: new BooleanFlag({
				flag: '--merge',
			}),
			refDate: refDateFlag,
		},
	] as const,
	module.commitEntry,
);

template('commitMessage', [] as const, module.commitMessage);

template(
	'commitSha',
	[
		{
			length: new Flag({
				flag: '--length <length>',
				transform: transformInteger,
			}),
		},
	] as const,
	module.commitSha,
);
