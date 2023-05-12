import {BooleanFlag, Flag, createTemplate} from '../command-template.ts';
import {transformInteger, transformNumber, identity} from '../util.ts';

const template = createTemplate('finance');

template('accountName', [] as const);

template('accountNumber', [
	{
		length: new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
	},
] as const);

template('amount', [
	new Flag({
		flag: '--min <min>',
		transform: transformNumber,
	}),
	new Flag({
		flag: '--max <max>',
		transform: transformNumber,
	}),
	new Flag({
		flag: '--dec <decimal plcaes>',
		transform: transformInteger,
	}),
	new Flag({
		flag: '--symbol <symbol>',
		transform: identity,
	}),
	new BooleanFlag({
		flag: '--auto-format',
	}),
] as const);

template('bic', [
	{
		includeBranchCode: new BooleanFlag({
			flag: '--include-branch-code',
		}),
	},
] as const);

template('bitcoinAddress', [] as const);

template('creditCardCVV', [] as const);

template('creditCardIssuer', [] as const);

template('creditCardNumber', [
	new Flag({
		flag: '--issuer <issuer or format>',
		transform: identity,
		description: `Either an issuer or a format
--issuer visa => 4882664999007
--issuer "63[7-9]#-####-####-###L" => '6375-3265-4676-6646`,
	}),
] as const);

template('currency', [] as const);

template('currencyCode', [] as const);

template('currencyName', [] as const);

template('currencySymbol', [] as const);

template('ethereumAddress', [] as const);

template('iban', [
	new BooleanFlag({
		flag: '--formatted',
	}),
	new Flag({
		flag: '--country-code <code>',
		transform: identity,
	}),
] as const);

template('litecoinAddress', [] as const);

template('maskedNumber', [
	{
		length: new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
		parens: new BooleanFlag({
			flag: '--parens',
		}),
		ellipsis: new BooleanFlag({
			flag: '--ellipsis',
		}),
	},
] as const);

template('pin', [
	{
		length: new Flag({
			flag: '--length <length>',
			transform: transformInteger,
		}),
	},
] as const);

template('routingNumber', [] as const);

template('transactionDescription', [] as const);

template('transactionType', [] as const);
