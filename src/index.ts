/* eslint-disable import/no-unassigned-import */
import {exit} from 'node:process';

import {program} from 'commander';

import './commands/animal.ts';
import './commands/color.ts';
import './commands/commerce.ts';
import './commands/company.ts';
import './commands/database.ts';
import './commands/datatype.ts';
import './commands/date.ts';
import './commands/finance.ts';
import './commands/git.ts';
import './commands/hacker.ts';
import './commands/helpers.ts';
import './commands/image.ts';
import './commands/internet.ts';
import './commands/location.ts';
import './commands/lorem.ts';
import './commands/music.ts';
import './commands/number.ts';
import './commands/person.ts';
import './commands/phone.ts';
import './commands/science.ts';
import './commands/system.ts';
import './commands/vehicle.ts';

program
	.name('faker')
	.allowExcessArguments(false)
	.enablePositionalOptions()
	.option('--locale [locale]', 'Set locale of faker', 'en');

try {
	await program.parseAsync();
} catch (error: unknown) {
	if (error instanceof Error) {
		console.error(error.message);
		exit(1);
	} else {
		throw error;
	}
}
