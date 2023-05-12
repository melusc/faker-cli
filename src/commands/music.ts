import {createTemplate} from '../command-template.ts';

const template = createTemplate('music');

template('genre', [] as const);

template('songName', [] as const);
