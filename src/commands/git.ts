import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {stringOf, transformDate, transformInteger} from '../util.ts';

const referenceDateFlag = new Flag({
	flag: '--ref-date <date>',
	transform: transformDate,
});

const template = createTemplate('git');

template('branch', [] as const);

template('commitDate', [
	{
		refDate: referenceDateFlag,
	},
] as const);

template('commitEntry', [
	{
		eol: new Flag({
			flag: '--eol <eol>',
			transform: stringOf(new Set(['LF', 'CRLF'] as const)),
		}),
		merge: new BooleanFlag({
			flag: '--merge',
		}),
		refDate: referenceDateFlag,
	},
] as const);

template('commitMessage', [] as const);

template('commitSha', [
	{
		length: new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
	},
] as const);
