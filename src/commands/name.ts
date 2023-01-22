import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {transformSexType, transformString} from '../util.js';

const module = faker.name;
const template = createTemplate('name');

template(
	'firstName',
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	],
	module.firstName,
);

template(
	'fullName',
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
	],
	module.fullName,
);

template('gender', [], module.gender);

template('jobArea', [], module.jobArea);

template('jobDescriptor', [], module.jobDescriptor);

template('jobTitle', [], module.jobTitle);

template('jobType', [], module.jobType);

template(
	'lastName',
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	],
	module.lastName,
);

template(
	'middleName',
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	],
	module.middleName,
);

template(
	'prefix',
	[
		{
			transform: transformSexType,
			key: '--sex <sex>',
		},
	],
	module.prefix,
);

template('sex', [], module.sex);

template('sexType', [], module.sexType);

template('suffix', [], module.suffix);
