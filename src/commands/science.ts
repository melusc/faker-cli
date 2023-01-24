import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.science;
const template = createTemplate('science');

template('chemicalElement', [] as const, module.chemicalElement);

template('unit', [] as const, module.unit);
