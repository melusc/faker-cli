import {faker} from '@faker-js/faker';

import {BooleanFlag, Flag, createTemplate} from '../command-template.js';
import {transformInteger, transformNumber, identity} from '../util.js';

const module = faker.finance;
const template = createTemplate('finance');

template(
	'account',
	[
		new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
	] as const,
	module.account,
);

template('accountName', [] as const, module.accountName);

template(
	'amount',
	[
		new Flag({
			flag: '--min <min>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--max <max>',
			transform: transformNumber,
		}),
		new Flag({
			flag: '--precision <precision>',
			transform: transformInteger,
		}),
		new Flag({
			flag: '--symbol <symbol>',
			transform: identity,
		}),
		new BooleanFlag({
			flag: '--auto-format',
		}),
	] as const,
	module.amount,
);

template(
	'bic',
	[
		{
			includeBranchCode: new BooleanFlag({
				flag: '--include-branch-code',
			}),
		},
	] as const,
	module.bic,
);

template('bitcoinAddress', [] as const, module.bitcoinAddress);

template('creditCardCVV', [] as const, module.creditCardCVV);

template('creditCardIssuer', [] as const, module.creditCardIssuer);

template(
	'creditCardNumber',
	[
		new Flag({
			flag: '--issuer <issuer or format>',
			transform: identity,
			description: `Either an issuer or a format
--issuer visa => 4882664999007
--issuer "63[7-9]#-####-####-###L" => '6375-3265-4676-6646`,
		}),
	] as const,
	module.creditCardNumber,
);

template('currencyCode', [] as const, module.currencyCode);

template('currencyName', [] as const, module.currencyName);

template('currencySymbol', [] as const, module.currencySymbol);

template('ethereumAddress', [] as const, module.ethereumAddress);

template(
	'iban',
	[
		new BooleanFlag({
			flag: '--formatted',
		}),
		new Flag({
			flag: '--country-code <code>',
			transform: identity,
		}),
	] as const,
	module.iban,
);

template('litecoinAddress', [] as const, module.litecoinAddress);

template(
	'mask',
	[
		new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
		new BooleanFlag({
			flag: '--parens',
		}),
		new BooleanFlag({
			flag: '--ellipsis',
		}),
	] as const,
	module.mask,
);

template(
	'pin',
	[
		new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
	] as const,
	module.pin,
);

template('routingNumber', [] as const, module.routingNumber);

template('transactionDescription', [] as const, module.transactionDescription);

template('transactionType', [] as const, module.transactionType);
