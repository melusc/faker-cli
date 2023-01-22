import {faker} from '@faker-js/faker';

import {createTemplate} from '../command-template.js';
import {transformInteger, transformNumber, transformString} from '../util.js';

const module = faker.finance;
const template = createTemplate('finance');

template(
	'account',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
	],
	module.account,
);

template('accountName', [], module.accountName);

template(
	'amount',
	[
		{
			key: '--min <min>',
			transform: transformNumber,
		},
		{
			key: '--max <max>',
			transform: transformNumber,
		},
		{
			key: '--precision <precision>',
			transform: transformInteger,
		},
		{
			key: '--symbol <symbol>',
			transform: transformString,
		},
		{
			key: '--auto-format',
		},
	],
	module.amount,
);

template(
	'bic',
	[
		{
			includeBranchCode: {
				key: '--include-branch-code',
			},
		},
	],
	module.bic,
);

template('bitcoinAddress', [], module.bitcoinAddress);

template('creditCardCVV', [], module.creditCardCVV);

template('creditCardIssuer', [], module.creditCardIssuer);

template(
	'creditCardNumber',
	[
		{
			key: '--issuer <issuer or format>',
			transform: transformString,
			description: `Either an issuer or a format
--issuer visa => 4882664999007
--issuer "63[7-9]#-####-####-###L" => '6375-3265-4676-6646`,
		},
	],
	module.creditCardNumber,
);

template('currencyCode', [], module.currencyCode);

template('currencyName', [], module.currencyName);

template('currencySymbol', [], module.currencySymbol);

template('ethereumAddress', [], module.ethereumAddress);

template(
	'iban',
	[
		{
			key: '--formatted',
		},
		{
			key: '--country-code <code>',
			transform: transformString,
		},
	],
	module.iban,
);

template('litecoinAddress', [], module.litecoinAddress);

template(
	'mask',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
		{
			key: '--parens',
		},
		{
			key: '--ellipsis',
		},
	],
	module.mask,
);

template(
	'pin',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
	],
	module.pin,
);

template('routingNumber', [], module.routingNumber);

template('transactionDescription', [], module.transactionDescription);

template('transactionType', [], module.transactionType);
