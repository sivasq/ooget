import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { JsonToTextService } from '../../../services/json-to-text.service';
import { PayrollProcessService } from '../../../services/payroll-process.service';
import { Subscription } from 'rxjs';
import { JobActivationComponent } from '../dialogs/job-activation/job-activation.component';

@Component({
	selector: 'app-pending-jobs',
	templateUrl: './pending-jobs.component.html',
	styleUrls: ['./pending-jobs.component.scss']
})
export class PendingJobsComponent implements OnInit {

	// busy Config
	busy: Subscription;

	// set pending jobs array
	public pendingJobs: any[] = [];
	companyDetails = '';
	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public datePipe: DatePipe, public toUpperCase: UpperCasePipe, public texts: JsonToTextService, public dialog: MatDialog) {
		this.getPendingJobsList();
	}

	getPendingJobsList() {
		this.busy = this._httpService.getPendingJobsList()
			.subscribe(
				response => {
					if (response.success) {
						this.pendingJobs = response.result;
					} else if (!response.success) {

						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Job Activation with Pay Info
	activateJobConfirm(event) {
		if (!event.status) return false;

		let dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			'jobid': event.jobId,
			'companyid': event.employerId,
		};
		let dialogRef = this.dialog.open(JobActivationComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(response => {
			this.getPendingJobsList();
		});
	}

	ngOnInit() {
		// let payrollData = this.payroll.processPayroll();
		// this.processPayrollGenerate(payrollData);
	}

	// ngOnInit() {

	// 	let payrollJsonData: any[] = [];

	// 	let payrollHeaderData: any = [
	// 		{
	// 			ValueDate: "2018/08/03",
	// 			OriginatingBankNumber: "7171",
	// 			OriginatingBranchNumber: "123",
	// 			OriginatingAccountNumber: "0010020099",
	// 			OriginatorsName: "sivaraj",
	// 			MessageSequenceNumber: "00001",
	// 			SendersCompanyId: "sqindia",
	// 			RecordType: "0",
	// 		}
	// 	];

	// 	let payrollBodyData: any = [
	// 		{
	// 			ReceivingBankNumber: "7172",
	// 			ReceivingBranchNumber: "124",
	// 			ReceivingAccountNumber: "0010177030",
	// 			ReceivingAccountName: "siva",
	// 			TransactionCode: "22",
	// 			AmountInCents: "12345678",
	// 			// Particulars: "particular",
	// 			// Reference: "reference",
	// 			RecordType: "1",
	// 		},
	// 		{
	// 			ReceivingBankNumber: "7173",
	// 			ReceivingBranchNumber: "125",
	// 			ReceivingAccountNumber: "0010010131",
	// 			ReceivingAccountName: "sivraj",
	// 			TransactionCode: "22",
	// 			AmountInCents: "12345679",
	// 			// Particulars: "particular",
	// 			// Reference: "reference",
	// 			RecordType: "1",
	// 		},
	// 		{
	// 			ReceivingBankNumber: "7173",
	// 			ReceivingBranchNumber: "125",
	// 			ReceivingAccountNumber: "0010760110",
	// 			ReceivingAccountName: "sivraj",
	// 			TransactionCode: "22",
	// 			AmountInCents: "12345679",
	// 			// Particulars: "particular",
	// 			// Reference: "reference",
	// 			RecordType: "1",
	// 		},
	// 		{
	// 			ReceivingBankNumber: "7173",
	// 			ReceivingBranchNumber: "125",
	// 			ReceivingAccountNumber: "0010020013",
	// 			ReceivingAccountName: "sivraj",
	// 			TransactionCode: "22",
	// 			AmountInCents: "12345679",
	// 			// Particulars: "particular",
	// 			// Reference: "reference",
	// 			RecordType: "1",
	// 		},
	// 		{
	// 			ReceivingBankNumber: "7173",
	// 			ReceivingBranchNumber: "125",
	// 			ReceivingAccountNumber: "0010020020",
	// 			ReceivingAccountName: "sivraj",
	// 			TransactionCode: "22",
	// 			AmountInCents: "12345679",
	// 			// Particulars: "particular",
	// 			// Reference: "reference",
	// 			RecordType: "1",
	// 		},
	// 		{
	// 			ReceivingBankNumber: "7173",
	// 			ReceivingBranchNumber: "125",
	// 			ReceivingAccountNumber: "0010020030",
	// 			ReceivingAccountName: "sivraj",
	// 			TransactionCode: "22",
	// 			AmountInCents: "12345679",
	// 			// Particulars: "particular",
	// 			// Reference: "reference",
	// 			RecordType: "1",
	// 		},
	// 		{
	// 			ReceivingBankNumber: "7173",
	// 			ReceivingBranchNumber: "125",
	// 			ReceivingAccountNumber: "0010020048",
	// 			ReceivingAccountName: "sivraj",
	// 			TransactionCode: "22",
	// 			AmountInCents: "12345679",
	// 			// Particulars: "particular",
	// 			// Reference: "reference",
	// 			RecordType: "1",
	// 		}
	// 	];

	// 	let orgAccHash;
	// 	let AccountNumberHashTotal = 0;

	// 	// Process Header
	// 	if (payrollHeaderData.length > 0) {
	// 		for (let i = 0; i < payrollHeaderData.length; i++) {
	// 			// process Hash for Org Acc
	// 			let orgAcc = payrollHeaderData[i].OriginatingAccountNumber + '0'.repeat(11 - payrollHeaderData[i].OriginatingAccountNumber.length);

	// 			// Split Org Acc into two parts (6 and 5)
	// 			let orgAcc1 = orgAcc.substr(0, 6);//6 chars
	// 			let orgAcc2 = orgAcc.substr(6);//5 chars
	// 			// Subtract two parts
	// 			orgAccHash = Number(orgAcc1) - Number(orgAcc2);

	// 			console.log(orgAcc1);
	// 			console.log(orgAcc2);
	// 			console.log(orgAccHash);

	// 			// Process Org acc Data Row '0'
	// 			let hearerRow = '';
	// 			if (this.datePipe.transform(payrollHeaderData[i].ValueDate, 'yyMMdd')) {
	// 				hearerRow = this.datePipe.transform(payrollHeaderData[i].ValueDate, 'yyMMdd');
	// 			}

	// 			hearerRow = hearerRow + ' '.repeat(45);

	// 			if (payrollHeaderData[i].OriginatingBankNumber) {
	// 				hearerRow = hearerRow.substr(0, 52) + payrollHeaderData[i].OriginatingBankNumber + hearerRow.substr(52);
	// 			}

	// 			if (payrollHeaderData[i].OriginatingBranchNumber) {
	// 				hearerRow = hearerRow.substr(0, 56) + '0'.repeat(3 - payrollHeaderData[i].OriginatingBranchNumber.length) + payrollHeaderData[i].OriginatingBranchNumber + hearerRow.substr(56);
	// 			}

	// 			if (payrollHeaderData[i].OriginatingAccountNumber) {
	// 				hearerRow = hearerRow.substr(0, 59) + payrollHeaderData[i].OriginatingAccountNumber + ' '.repeat(11 - payrollHeaderData[i].OriginatingAccountNumber.length) + hearerRow.substr(59);
	// 			}

	// 			hearerRow = hearerRow + ' '.repeat(2);

	// 			if (payrollHeaderData[i].OriginatorsName) {
	// 				hearerRow = hearerRow.substr(0, 72) + this.toUpperCase.transform(payrollHeaderData[i].OriginatorsName) + ' '.repeat(20 - payrollHeaderData[i].OriginatorsName.length) + hearerRow.substr(72);
	// 			}

	// 			if (payrollHeaderData[i].MessageSequenceNumber) {
	// 				hearerRow = hearerRow.substr(0, 92) + '0'.repeat(5 - payrollHeaderData[i].MessageSequenceNumber.length) + payrollHeaderData[i].MessageSequenceNumber + hearerRow.substr(92);
	// 			}

	// 			if (payrollHeaderData[i].SendersCompanyId) {
	// 				hearerRow = hearerRow.substr(0, 97) + this.toUpperCase.transform(payrollHeaderData[i].SendersCompanyId) + ' '.repeat(8 - payrollHeaderData[i].SendersCompanyId.length) + hearerRow.substr(97);
	// 			}

	// 			hearerRow = hearerRow + ' '.repeat(9);

	// 			if (payrollHeaderData[i].RecordType) {
	// 				hearerRow = hearerRow.substr(0, 114) + payrollHeaderData[i].RecordType + hearerRow.substr(114);
	// 			}
	// 			payrollJsonData.push({ dataRow: hearerRow });
	// 			console.log(hearerRow);
	// 		}
	// 	}

	// 	// Process Body
	// 	if (payrollBodyData.length > 0) {
	// 		for (let i = 0; i < payrollBodyData.length; i++) {
	// 			// process Hash for Org Acc
	// 			if (payrollBodyData[i].ReceivingAccountNumber) {
	// 				let recAcc = payrollBodyData[i].ReceivingAccountNumber + '0'.repeat(11 - payrollBodyData[i].ReceivingAccountNumber.length);
	// 				// Split Org Acc into two parts (6 and 5)
	// 				let recAcc1 = recAcc.substr(0, 6);
	// 				let recAcc2 = recAcc.substr(6);
	// 				// Subtract two parts
	// 				let recAccHash = Number(recAcc1) - Number(recAcc2);
	// 				// Subtract RecAcchash - OrgAccHash
	// 				let OrgRecAccHash = Math.abs(Number(recAccHash) - Number(orgAccHash));
	// 				// Add All RecAccHash
	// 				AccountNumberHashTotal = Number(AccountNumberHashTotal) + Number(OrgRecAccHash);

	// 				console.log(recAcc1);
	// 				console.log(recAcc2);
	// 				console.log(recAccHash);
	// 				console.log(OrgRecAccHash);
	// 				console.log(AccountNumberHashTotal);
	// 			}

	// 			// Process Rec acc Data Row '1'
	// 			let bodyRow = '';
	// 			if (payrollBodyData[i].ReceivingBankNumber) {
	// 				bodyRow = bodyRow.substr(0, 1) + payrollBodyData[i].ReceivingBankNumber + bodyRow.substr(1);
	// 				// bodyRow = bodyRow + payrollBodyData[i].ReceivingBankNumber;
	// 			}

	// 			if (payrollBodyData[i].ReceivingBranchNumber) {
	// 				bodyRow = bodyRow.substr(0, 5) + '0'.repeat(3 - payrollBodyData[i].ReceivingBranchNumber.length) + payrollBodyData[i].ReceivingBranchNumber + bodyRow.substr(5);
	// 				// bodyRow = bodyRow + payrollBodyData[i].ReceivingBranchNumber;
	// 			}

	// 			if (payrollBodyData[i].ReceivingAccountNumber) {
	// 				bodyRow = bodyRow.substr(0, 8) + payrollBodyData[i].ReceivingAccountNumber + ' '.repeat(11 - payrollBodyData[i].ReceivingAccountNumber.length) + bodyRow.substr(8);
	// 				// bodyRow = bodyRow + payrollBodyData[i].ReceivingAccountNumber;
	// 			}

	// 			if (payrollBodyData[i].ReceivingAccountName) {
	// 				bodyRow = bodyRow.substr(0, 19) + this.toUpperCase.transform(payrollBodyData[i].ReceivingAccountName) + ' '.repeat(20 - payrollBodyData[i].ReceivingAccountName.length) + bodyRow.substr(19);
	// 				// bodyRow = bodyRow + payrollBodyData[i].ReceivingAccountName;
	// 			}

	// 			if (payrollBodyData[i].TransactionCode) {
	// 				bodyRow = bodyRow.substr(0, 39) + '0'.repeat(2 - payrollBodyData[i].TransactionCode.length) + payrollBodyData[i].TransactionCode + bodyRow.substr(39);
	// 				// bodyRow = bodyRow + payrollBodyData[i].TransactionCode;
	// 			}

	// 			if (payrollBodyData[i].AmountInCents) {
	// 				bodyRow = bodyRow.substr(0, 41) + '0'.repeat(11 - payrollBodyData[i].AmountInCents.length) + payrollBodyData[i].AmountInCents + bodyRow.substr(41);
	// 				// bodyRow = bodyRow + payrollBodyData[i].AmountInCents;
	// 			}

	// 			bodyRow = bodyRow + ' '.repeat(38);

	// 			if (payrollBodyData[i].Particulars) {
	// 				bodyRow = bodyRow.substr(0, 90) + ' '.repeat(12 - payrollBodyData[i].Particulars.length) + payrollBodyData[i].Particulars + bodyRow.substr(90);
	// 				// bodyRow = bodyRow + payrollBodyData[i].Particulars;
	// 			} else {
	// 				bodyRow = bodyRow + ' '.repeat(12);
	// 			}

	// 			if (payrollBodyData[i].Reference) {
	// 				bodyRow = bodyRow.substr(0, 102) + ' '.repeat(12 - payrollBodyData[i].Reference.length) + payrollBodyData[i].Reference + bodyRow.substr(102);
	// 				// bodyRow = bodyRow + payrollBodyData[i].Reference;
	// 			} else {
	// 				bodyRow = bodyRow + ' '.repeat(12);
	// 			}

	// 			if (payrollBodyData[i].RecordType) {
	// 				bodyRow = bodyRow.substr(0, 114) + payrollBodyData[i].RecordType + bodyRow.substr(114);
	// 				// bodyRow = bodyRow + payrollBodyData[i].RecordType;
	// 			}
	// 			payrollJsonData.push({ dataRow: bodyRow });
	// 			console.log(bodyRow);
	// 		}
	// 	}

	// 	let payrollFooterData: any[] = [];

	// 	// Process Credit Transactions
	// 	let creditTransactions = payrollBodyData.filter(data => {
	// 		return data.TransactionCode != '30'
	// 	});
	// 	let TotalNumberOfCreditTransactions = creditTransactions.length;
	// 	console.log(TotalNumberOfCreditTransactions);

	// 	let TotalCreditAmountInCents = creditTransactions.map(data => data.AmountInCents).reduce((previous, current) => {
	// 		return Number(previous) + Number(current)
	// 	}, 0);
	// 	console.log(TotalCreditAmountInCents);

	// 	// Process Debit Transactions
	// 	let debitTransactions = payrollBodyData.filter(data => {
	// 		return data.TransactionCode == '30'
	// 	});
	// 	let TotalNumberOfDebitTransactions = debitTransactions.length;

	// 	let TotalDebitAmountInCents = debitTransactions.map(data => data.AmountInCents).reduce((previous, current) => {
	// 		return Number(previous) + Number(current)
	// 	}, 0);
	// 	console.log(TotalDebitAmountInCents);

	// 	payrollFooterData.push({
	// 		'TotalNumberOfCreditTransactions': TotalNumberOfCreditTransactions.toString(),
	// 		'TotalCreditAmountInCents': TotalCreditAmountInCents.toString(),
	// 		'TotalNumberOfDebitTransactions': TotalNumberOfDebitTransactions.toString(),
	// 		'TotalDebitAmountInCents': TotalDebitAmountInCents.toString(),
	// 		'AccountNumberHashTotal': AccountNumberHashTotal.toString(),
	// 		'RecordType':'9'
	// 	});

	// 	// Process Footer Row Data
	// 	if (payrollFooterData.length > 0) {
	// 		for (let i = 0; i < payrollFooterData.length; i++) {
	// 			// Process Rec acc Data Row '1'
	// 			let footerRow = '';
	// 			if (payrollFooterData[i].TotalNumberOfCreditTransactions) {
	// 				footerRow = footerRow.substr(0, 1) + '0'.repeat(8 - payrollFooterData[i].TotalNumberOfCreditTransactions.length) + payrollFooterData[i].TotalNumberOfCreditTransactions + footerRow.substr(1);
	// 			}

	// 			if (payrollFooterData[i].TotalCreditAmountInCents) {
	// 				footerRow = footerRow.substr(0, 9) + '0'.repeat(11 - payrollFooterData[i].TotalCreditAmountInCents.length) + payrollFooterData[i].TotalCreditAmountInCents + footerRow.substr(9);
	// 			}

	// 			footerRow = footerRow + ' '.repeat(5);

	// 			if (payrollFooterData[i].TotalNumberOfDebitTransactions) {
	// 				footerRow = footerRow.substr(0, 25) + '0'.repeat(8 - payrollFooterData[i].TotalNumberOfDebitTransactions.length) + payrollFooterData[i].TotalNumberOfDebitTransactions + footerRow.substr(25);
	// 			}

	// 			if (payrollFooterData[i].TotalDebitAmountInCents) {
	// 				footerRow = footerRow.substr(0, 33) + '0'.repeat(11 - payrollFooterData[i].TotalDebitAmountInCents.length) + payrollFooterData[i].TotalDebitAmountInCents + footerRow.substr(33);
	// 			}

	// 			footerRow = footerRow + ' '.repeat(26);

	// 			if (payrollFooterData[i].AccountNumberHashTotal) {
	// 				footerRow = footerRow.substr(0, 70) + '0'.repeat(11 - payrollFooterData[i].AccountNumberHashTotal.length) + payrollFooterData[i].AccountNumberHashTotal + footerRow.substr(70);
	// 			}

	// 			footerRow = footerRow + ' '.repeat(33);

	// 			if (payrollFooterData[i].RecordType) {
	// 				footerRow = footerRow.substr(0, 114) + payrollFooterData[i].RecordType + footerRow.substr(114);
	// 			}
	// 			payrollJsonData.push({ dataRow: footerRow });
	// 			console.log(footerRow);
	// 		}
	// 	}

	// 	console.log(payrollJsonData);
	// 	// this.processPayrollGenerate(payrollJsonData);
	// }

	public payrollCsvOptions = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalseparator: '.',
		showLabels: false,
		showTitle: false,
		title: 'PayRoll',
		useBom: true,
		noDownload: false,
	};

	processPayrollGenerate(payrollData) {
		console.log("payroll generated");
		let today = new Date();

		// let csvData = new Angular5Csv(newData, 'payroll ' + this.datePipe.transform(today, 'MMMd,y,HH:mm'), this.payrollCsvOptions);
		let csvData = this.texts.textInit(payrollData, 'payroll ' + this.datePipe.transform(today, 'MMMd,y,HH:mm'), this.payrollCsvOptions);
	}
}
