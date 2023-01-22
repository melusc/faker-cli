import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.database;
const template = createTemplate('database');

template('collation', [], module.collation);

template('column', [], module.column);

template('engine', [], module.engine);

template('mongodbObjectId', [], module.mongodbObjectId);

template('type', [], module.type);
