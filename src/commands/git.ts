import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformInteger} from '../util.ts';

import {refDateFlag} from './date.ts';

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
