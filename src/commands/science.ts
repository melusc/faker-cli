import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.science;
const template = createTemplate('science');

template('chemicalElement', [], module.chemicalElement);

template('unit', [], module.unit);
