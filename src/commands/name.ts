import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {transformSexType, transformString} from '../util.js';

const module = faker.name;
const template = createTemplate('name');

template(
	['firstName', 'first'],
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	] as const,
	module.firstName,
);

template(
	['fullName', 'full'],
	[
		{
			firstName: {
				transform: transformString,
				key: '--first-name <name>',
			},
			lastName: {
				transform: transformString,
				key: '--last-name <name>',
			},
			sex: {
				transform: transformSexType,
				key: '--sex <sex>',
			},
		},
	] as const,
	module.fullName,
);

template('gender', [] as const, module.gender);

template('jobArea', [] as const, module.jobArea);

template('jobDescriptor', [] as const, module.jobDescriptor);

template('jobTitle', [] as const, module.jobTitle);

template('jobType', [] as const, module.jobType);

template(
	['lastName', 'last'],
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	] as const,
	module.lastName,
);

template(
	['middleName', 'middle'],
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	] as const,
	module.middleName,
);

template(
	'prefix',
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	] as const,
	module.prefix,
);

template('sex', [] as const, module.sex);

template('sexType', [] as const, module.sexType);

template('suffix', [] as const, module.suffix);
