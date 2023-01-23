import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';

const module = faker.vehicle;
const template = createTemplate('vehicle');

template('bicycle', [], module.bicycle);

template('color', [], module.color);

template('fuel', [], module.fuel);

template('manufacturer', [], module.manufacturer);

template('model', [], module.model);

template('type', [], module.type);

template('vehicle', [], module.vehicle);

template('vin', [], module.vin);

template('vrm', [], module.vrm);
