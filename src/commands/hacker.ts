import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.ts';

const module = faker.hacker;
const template = createTemplate('hacker');

template('abbreviation', [] as const, module.abbreviation);

template('adjective', [] as const, module.adjective);

template('ingverb', [] as const, module.ingverb);

template('noun', [] as const, module.noun);

template('phrase', [] as const, module.phrase);

template('verb', [] as const, module.verb);
