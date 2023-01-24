import {faker} from '@faker-js/faker';

import {Flag, createTemplate} from '../command-template.js';
import {transformSexType, identity} from '../util.js';

const module = faker.name;
const template = createTemplate('name');

template(
	['firstName', 'first'],
	[
		new Flag({
			transform: transformSexType,
			flag: '--sex <sex>',
		}),
	] as const,
	module.firstName,
);

template(
	['fullName', 'full'],
	[
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
		new Flag({
			transform: transformSexType,
			flag: '--sex <sex>',
		}),
	] as const,
	module.lastName,
);

template(
	['middleName', 'middle'],
	[
		new Flag({
			transform: transformSexType,
			flag: '--sex <sex>',
		}),
	] as const,
	module.middleName,
);

template(
	'prefix',
	[
		new Flag({
			transform: transformSexType,
			flag: '--sex <sex>',
		}),
	] as const,
	module.prefix,
);

template('sex', [] as const, module.sex);

template('sexType', [] as const, module.sexType);

template('suffix', [] as const, module.suffix);
