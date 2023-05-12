import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.ts';

const module = faker.company;
const template = createTemplate('company');

template('buzzAdjective', [] as const, module.buzzAdjective);

template('buzzNoun', [] as const, module.buzzNoun);

template('buzzPhrase', [] as const, module.buzzPhrase);

template('buzzVerb', [] as const, module.buzzVerb);

template('catchPhrase', [] as const, module.catchPhrase);

template('catchPhraseAdjective', [] as const, module.catchPhraseAdjective);

template('catchPhraseDescriptor', [] as const, module.catchPhraseDescriptor);

template('catchPhraseNoun', [] as const, module.catchPhraseNoun);

template('name', [] as const, module.name);
