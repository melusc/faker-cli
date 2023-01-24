import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf} from '../util.js';

const module = faker.git;
const template = createTemplate('git');

template('branch', [] as const, module.branch);

template(
	'commitEntry',
	[
		{
			eol: {
				key: '--eol <eol>',
				transform: stringOf(new Set(['LF', 'CRLF'] as const)),
			},
			merge: {
				key: '--merge',
			},
		},
	] as const,
	module.commitEntry,
);

template('commitMessage', [] as const, module.commitMessage);

template('commitSha', [] as const, module.commitSha);

template('shortSha', [] as const, module.shortSha);
