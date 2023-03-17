import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.ts';

const module = faker.animal;
const template = createTemplate('animal');

template('bear', [] as const, module.bear);

template('bird', [] as const, module.bird);

template('cat', [] as const, module.cat);

template('cetacean', [] as const, module.cetacean);

template('crocodilia', [] as const, module.crocodilia);

template('cow', [] as const, module.cow);

template('dog', [] as const, module.dog);

template('fish', [] as const, module.fish);

template('horse', [] as const, module.horse);

template('insect', [] as const, module.insect);

template('lion', [] as const, module.lion);

template('rabbit', [] as const, module.rabbit);

template('rodent', [] as const, module.rodent);

template('snake', [] as const, module.snake);

template('type', [] as const, module.type);
