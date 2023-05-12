import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.ts';

const module = faker.datatype;
const template = createTemplate('datatype');

template('boolean', [] as const, module.boolean);
