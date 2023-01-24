import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.music;
const template = createTemplate('music');

template('genre', [] as const, module.genre);

template('songName', [] as const, module.songName);
