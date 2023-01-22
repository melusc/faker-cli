import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.hacker;
const template = createTemplate('hacker');

template('abbreviation', [], module.abbreviation);

template('adjective', [], module.adjective);

template('ingverb', [], module.ingverb);

template('noun', [], module.noun);

template('phrase', [], module.phrase);

template('verb', [], module.verb);
