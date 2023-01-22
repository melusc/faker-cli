import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {stringOf} from '../util.js';

const module = faker.git;
const template = createTemplate('git');

template('branch', [], module.branch);

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
	],
	module.commitEntry,
);

template('commitMessage', [], module.commitMessage);

template('commitSha', [], module.commitSha);

template('shortSha', [], module.shortSha);
