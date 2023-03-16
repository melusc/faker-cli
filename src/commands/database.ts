import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.ts';

const module = faker.database;
const template = createTemplate('database');

template('collation', [] as const, module.collation);

template('column', [] as const, module.column);

template('engine', [] as const, module.engine);

template('mongodbObjectId', [] as const, module.mongodbObjectId);

template('type', [] as const, module.type);
