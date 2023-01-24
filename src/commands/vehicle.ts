import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.vehicle;
const template = createTemplate('vehicle');

template('bicycle', [] as const, module.bicycle);

template('color', [] as const, module.color);

template('fuel', [] as const, module.fuel);

template('manufacturer', [] as const, module.manufacturer);

template('model', [] as const, module.model);

template('type', [] as const, module.type);

template('vehicle', [] as const, module.vehicle);

template('vin', [] as const, module.vin);

template('vrm', [] as const, module.vrm);
