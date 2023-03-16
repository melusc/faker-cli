import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.ts';

const module = faker.company;
const template = createTemplate('company');

template('bs', [] as const, module.bs);

template('bsAdjective', [] as const, module.bsAdjective);

template('bsBuzz', [] as const, module.bsBuzz);

template('bsNoun', [] as const, module.bsNoun);

template('catchPhrase', [] as const, module.catchPhrase);

template('catchPhraseAdjective', [] as const, module.catchPhraseAdjective);

template('catchPhraseDescriptor', [] as const, module.catchPhraseDescriptor);

template('catchPhraseNoun', [] as const, module.catchPhraseNoun);

template('companySuffix', [] as const, module.companySuffix);

template('name', [] as const, module.name);

template('suffixes', [] as const, module.suffixes);
