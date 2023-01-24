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
	] as const,
	module.account,
);

template('accountName', [] as const, module.accountName);

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
	] as const,
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
	] as const,
	module.bic,
);

template('bitcoinAddress', [] as const, module.bitcoinAddress);

template('creditCardCVV', [] as const, module.creditCardCVV);

template('creditCardIssuer', [] as const, module.creditCardIssuer);

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
		{
			key: '--formatted',
		},
		{
			key: '--country-code <code>',
			transform: transformString,
		},
	] as const,
	module.iban,
);

template('litecoinAddress', [] as const, module.litecoinAddress);

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
	] as const,
	module.mask,
);

template(
	'pin',
	[
		{
			key: '--length <length>',
			transform: transformInteger,
		},
	] as const,
	module.pin,
);

template('routingNumber', [] as const, module.routingNumber);

template('transactionDescription', [] as const, module.transactionDescription);

template('transactionType', [] as const, module.transactionType);
