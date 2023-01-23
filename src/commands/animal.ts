import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.animal;
const template = createTemplate('animal');

template('bear', [], module.bear);

template('bird', [], module.bird);

template('cat', [], module.cat);

template('cetacean', [], module.cetacean);

template('crocodilia', [], module.crocodilia);

template('cow', [], module.cow);

template('dog', [], module.dog);

template('fish', [], module.fish);

template('horse', [], module.horse);

template('insect', [], module.insect);

template('lion', [], module.lion);

template('rabbit', [], module.rabbit);

template('rodent', [], module.rodent);

template('snake', [], module.snake);

template('type', [], module.type);
