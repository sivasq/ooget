import { BankDetail } from '../classes/bankDetail';

export const BankDetails: BankDetail[] = [
	{
		'id': 1,
		'fullName': 'The Hongkong & Shanghai Banking Corporation Ltd',
		'shortName': 'HSBC',
		'bankCode': '7232',
		'hint': '<div>The account number consists of 9 digits. The ACH branch code is normally incorporated into the account. The first 3 digits is the ACH branch code and the subsequent 9 digits is the account number.</div><br/><div>E.g. If the account is 146225193001, the ACH branch code will be 146 and the account number 225193001.</div>'
	},
	{
		'id': 2,
		'fullName': 'United Overseas Bank Ltd',
		'shortName': 'UOB',
		'bankCode': '7375',
		'hint': '<div>The account number consists of 10 digits. Please use the first 3 digits of the account number and refer to Appendix A of <a style="color: #021def;" href="http://www.uobgroup.com.sg/pages/business/cashmgmt/achcode.html" target="_blank">http://www.uobgroup.com.sg/pages/business/cashmgmt/achcode.html</a> to retrieve the corresponding ACH branch code.</div><br/><div>E.g. If the account number is 9102031012, the corresponding ACH branch code will be 030 and the account number 9102031012</div>'
	},
	{
		'id': 3,
		'fullName': 'DBS Bank Ltd',
		'shortName': 'DBS',
		'bankCode': '7171',
		'hint': '<div>The account number consists of 10 digits. Please use the first 3 digits of the account number as the ACH branch code.</div><br/><div>E.g. If the account number is 0290188891, the ACH branch code will be 029 and the account number 0290188891.</div>'
	},
	{
		'id': 4,
		'fullName': 'POSB',
		'shortName': 'POSB',
		'bankCode': '7171',
		'hint': '<div>The account number consists of 9 digits. All POSB accounts must route to their head office using ACH branch code 081.</div>'
	},
	{
		'id': 5,
		'fullName': 'Oversea-Chinese Banking Corporation Ltd',
		'shortName': 'OCBC',
		'bankCode': '7339',
		'hint': '<div>The account number consists of 7 or 9 digits. The ACH branch code is normally incorporated into the account. The first 3 digits is the ACH branch code and the subsequent 7 or 9 digits is the account number.</div><br/><div>E.g. If the account is 501101899001, the ACH branch code will be 501 and the account number 101899001.</div>'
	},
	{
		'id': 6,
		'fullName': 'Standard Chartered Bank',
		'shortName': 'SCB',
		'bankCode': '7144',
		'hint': '<div>The account number consists of 10 digits. The ACH branch code is normally derived from the first 2 digits of the account number and adding a zero in front.</div><br/><div>E.g. If the account number is 0123456789, the ACH branch code will be 001 and the account number 0123456789.</div>'
	},
	{
		'id': 7,
		'fullName': 'Citibank',
		'shortName': 'Citibank',
		'bankCode': '7214',
		'hint': '<div>The account number consists of 10 digits. The ACH branch code varies for corporate and personal accounts.</div><br/><div>E.g. If the branch name is ShentonWay-IB, this will be for corporate account. The ACH branch code will be 001.</div><br/><div>If the branch name is ShentonWay-CSG, this will be for personal account. The ACH branch code will be 011 and the account number 1012345670.</div>'
	}
];
