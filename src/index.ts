/* eslint-disable import/no-unassigned-import */
import {exit} from 'node:process';

import {program} from 'commander';

import './commands/address.js';
import './commands/animal.js';
import './commands/color.js';
import './commands/commerce.js';
import './commands/company.js';
import './commands/database.js';
import './commands/datatype.js';
import './commands/date.js';
import './commands/finance.js';
import './commands/git.js';
import './commands/hacker.js';
import './commands/name.js';

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
