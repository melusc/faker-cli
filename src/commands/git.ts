import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf} from '../util.ts';

const module = faker.git;
const template = createTemplate('git');

template('branch', [] as const, module.branch);

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
		},
	] as const,
	module.commitEntry,
);

template('commitMessage', [] as const, module.commitMessage);

template('commitSha', [] as const, module.commitSha);

template('shortSha', [] as const, module.shortSha);
