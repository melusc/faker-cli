import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.company;
const template = createTemplate('company');

template('bs', [], module.bs);

template('bsAdjective', [], module.bsAdjective);

template('bsBuzz', [], module.bsBuzz);

template('bsNoun', [], module.bsNoun);

template('catchPhrase', [], module.catchPhrase);

template('catchPhraseAdjective', [], module.catchPhraseAdjective);

template('catchPhraseDescriptor', [], module.catchPhraseDescriptor);

template('catchPhraseNoun', [], module.catchPhraseNoun);

template('companySuffix', [], module.companySuffix);

template('name', [], module.name);

template('suffixes', [], module.suffixes);
