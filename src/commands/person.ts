import {Flag, createTemplate} from '../command-template.ts';
import {transformSexType, identity} from '../util.ts';

const template = createTemplate('person');

template('bio', [] as const);

template('firstName', [
	new Flag({
		flag: '--sex <sex>',
		transform: transformSexType,
	}),
] as const);

template('fullName', [
	{
		firstName: new Flag({
			transform: identity,
			flag: '--first-name <name>',
		}),
		lastName: new Flag({
			transform: identity,
			flag: '--last-name <name>',
		}),
		sex: new Flag({
			transform: transformSexType,
			flag: '--sex <sex>',
		}),
	},
] as const);

template('gender', [] as const);

template('jobArea', [] as const);

template('jobDescriptor', [] as const);

template('jobTitle', [] as const);

template('jobType', [] as const);

template('lastName', [
	new Flag({
		flag: '--sex <sex>',
		transform: transformSexType,
	}),
] as const);

template('middleName', [
	new Flag({
		flag: '--sex <sex>',
		transform: transformSexType,
	}),
] as const);

template('prefix', [
	new Flag({
		transform: transformSexType,
		flag: '--sex <sex>',
	}),
] as const);

template('sex', [] as const);

template('sexType', [] as const);

template('suffix', [] as const);

template('zodiacSign', [] as const);
