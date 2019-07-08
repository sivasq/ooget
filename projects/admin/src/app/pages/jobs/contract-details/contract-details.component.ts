import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { EditClockInOutComponent } from '../dialogs/edit-clock-in-out/edit-clock-in-out.component';
import { DatePipe } from '@angular/common';
import { PaginationInstance } from 'ngx-pagination';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import 'moment-duration-format';
import { TimesheetNotesComponent } from '../dialogs/timesheet-notes/timesheet-notes.component';
import { JsonToCsvService } from '../../../services/json-to-csv.service';
import { JsonToTextService } from '../../../services/json-to-text.service';
import { of, concat } from 'rxjs';
import { PayrollProcessService } from '../../../services/payroll-process.service';
import { NgModel } from '@angular/forms';
import { LatereasonComponent } from '../dialogs/latereason/latereason.component';
import { isArray } from 'util';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {

	public today = new Date();
	public tomorrow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

	public contract_id;
	public contractDetails;
	public contractJobDetails;
	public contractorDetails;
	public payrollsList: any[] = [];

	public contractorPayrolls = [
		{
			'datefrom': '2018/05/16',
			'dateto': '2018/05/31',
			'totalnormalworkhr': '112',
			'totalotworkhr': '20',
			'totalnormalworkhrsalary': '1232',
			'totalothrsalary': '440',
			'totalsalary': '1672',
			'paymentstatus': 'paid',
			'paiddate': '2018/05/31',
			'paymenttype': 'neft',
			'verified': 'true',
			'timesheet': [
				{ 'date': '2018/05/16', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/17', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/18', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/19', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/20', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/21', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/22', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/23', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/24', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/25', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/26', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/27', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/28', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/29', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/30', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/05/31', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
			]
		},
		{
			'datefrom': '2018/06/01',
			'dateto': '2018/06/15',
			'totalnormalworkhr': '105',
			'totalotworkhr': '18',
			'totalnormalworkhrsalary': '1155',
			'totalothrsalary': '396',
			'totalsalary': '1551',
			'paymentstatus': 'not paid',
			'paiddate': '',
			'paymenttype': '',
			'verified': 'false',
			'timesheet': [
				{ 'date': '2018/06/1', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/2', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/3', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/4', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/5', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/6', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/7', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/8', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/9', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/10', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/11', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' },
				{ 'date': '2018/06/12', 'punchintime': '09:30', 'punchouttime': '16:30', 'normalworkhr': '7', 'otworkhr': '0', 'totalworkhr': '7', 'normalworkhrsalary': '70', 'othrsalary': '0', 'totalsalary': '70' }]
		}
	];

	// busy Config
	busy: Subscription;

	contractStatus = ['Open', 'Closed'];
	public csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalseparator: '.',
		showLabels: true,
		showTitle: false,
		title: 'title',
		useBom: true,
		noDownload: false,
		headers: ['date', 'punchintime', 'punchouttime', 'normalworkhr', 'otworkhr', 'totalworkhr', 'normalworkhrsalary', 'othrsalary', 'totalsalary', 'paystatus', 'paiddate', 'paymenttype']
	};

	// public pageSizeOptions = [5, 10, 15, 20, 25, 50, 100];
	// DayOff Pagination config
	// public dayOffPaginateConfig: PaginationInstance = {
	// 	id: 'tab1',
	// 	itemsPerPage: 5,
	// 	currentPage: 1
	// };
	// public dayOffFilter = '';
	// public dayOffPaginateControlMaxSize = 5;
	// public dayOffPaginateControlAutoHide = true;

	constructor(public router: Router, private _httpService: ApiCallService, private route: ActivatedRoute, public dialog: MatDialog, private bottomSheet: MatBottomSheet, public snackBar: MatSnackBar, private datePipe: DatePipe, public csv: JsonToCsvService, public texts: JsonToTextService, public payroll: PayrollProcessService) {
		this.contract_id = this.route.snapshot.params['contract_id'];
		// this.getPreviousDays();
		this.getContractDetails({ 'contractid': this.contract_id });
		// this.getTimesheetDetails({ 'contractid': this.contract_id, 'from': this.activeTimesheetPeriod.startDate, 'to': this.activeTimesheetPeriod.endDate });
		// this.getAllOffDays({ 'contractid': this.contract_id });
		// this.getAllPayrollsInContract({ 'contractid': this.contract_id });
	}

	// ================================================================================


	// public verifiedTimeMask = [/[0-9]/, /\d/, ':', /\d/, /\d/];
	// keepCharPositions = true;
	// ================================================================================
	getContractDetails(contractId) {
		this.busy = this._httpService.getContractDetails(contractId)
			.subscribe(
				response => {
					if (response.success) {
						this.contractDetails = response.result[0];
						this.contractJobDetails = response.result[0];
						this.contractorDetails = response.result[0];
						// this.timesheets = response.contract.timesheet;
						// this.dailyTimeSheetDataSource.data = this.timesheets;

						// if (this.timesheets.length > 0) {
						// 	this.verifiedTimeSheets = this.timesheets.filter(data => data.sheet_verified == true);
						// }

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	downloadTimesheet(timesheetData) {
		// new Angular5Csv(timesheetData, 'TimeSheet', this.csvOptions);
	}

	ngOnInit() {
		// this.contractorTimesheet.sort(
		// 	function (a, b) {
		// 		return new Date(b.date).getTime() - new Date(a.date).getTime()
		// 	});
		// let demo = [{
		// 	'data': '5656',
		// 	'data1': '45645',
		// }]
		// console.log(demo);

		this.contractorPayrolls.sort(
			function (a, b) {
				return new Date(b.datefrom).getTime() - new Date(a.datefrom).getTime()
			});
		// console.log(this.contractorPayrolls);

		let hrs = moment.duration(0, 'minutes').format('hh:mm', {
			trim: false
		});
		// console.log(hrs);
	}

	// ==================================
	getAllPayrollsInContract(contractId) {
		this.busy = this._httpService.getAllPayrollsInContract(contractId)
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response.payrolls);
						this.payrollsList = response.payrolls;
						this.payrollsList.sort(
							function (a, b) {
								return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
							});
						// console.log(this.payrollsList);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// =====================================
	public payrollCsvOptions = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalseparator: '.',
		showLabels: false,
		showTitle: false,
		title: 'PayRoll',
		useBom: true,
		noDownload: false,
		// headers: ["H01 Record Type", "H02 File Creation Date", "H03 Organization ID", "H04 Sender Name", "D01 Record Type", "D02 Product Type", "D03 Originating Account Number", "D04 Originating Account Currency", "D05 Customer Reference or Batch Reference", "D06 Payment Currency", "D07 Batch ID", "D08 Payment Date", "D09 Bank Charges", "D10 Debit Account for Bank Charges", "D11 Receiving Party Name", "D12 Payable To", "D13 Receiving Party Address 1", "D14 Receiving Party Address 2", "D15 Receiving Party Address 3", "D16 Receiving Account Number/IBAN", "D17 Country Specific", "D18 Receiving Bank Code", "D19 Receiving Branch Code", "D20 Clearing Code", "D21 Beneficiary Bank SWIFT BIC", "D22 Beneficiary Bank Name", "D23 Beneficiary Bank Address", "D24 Beneficiary Bank Country", "D25 Routing Code", "D26 Intermediary Bank SWIFT BIC", "D27 Amount Currency", "D28 Amount", "D29 FX Contract Reference 1", "D30 Amount to be Utilized 1", "D31 FX Contract Reference 2", "D32 Amount to be Utilized 2", "D33 Transaction Code", "D34 Particulars / Beneficary or Payer Reference", "D35 DDA Reference (SG HK collection) or Reference", "D36 Payment Details", "D37 Instruction to Ordering Bank", "D38 Beneficiary Resident Status", "D39 Beneficiary Category", "D40 Transaction Relationship", "D41 Payee Role", "D42 Remitter Identity", "D43 Purpose of Payment", "D44 Supplementary Info", "D45 Delivery Mode", "D46 Print At Location/Pick Up Location", "D47 Payable Location", "D48 Mail to Party Name", "D49 Mail to Party Address 1", "D50 Mail to Party Address 2", "D51 Mail to Party Address 3", "D52 Reserved Field", "D53 Postal Code", "D54 Email 1", "D55 Email 2", "D56 Email 3", "D57 Email 4", "D58 Email 5", "D59 Phone Number 1", "D60 Phone Number 2", "D61 Phone Number 3", "D62 Phone Number 4", "D63 Phone Number 5", "D64 Invoice Details", "D65 Client Reference 1", "D66 Client Reference 2", "D67 Client Reference 3", "D68 Client Reference 4", "T01 Record Type", "T02 Total No. of Transactions", "T03 Total Transaction Amount"]
	};

	processPayrollGenerateold(payrollData) {
		// console.log('payroll generated');
		let today = new Date();
		let newData: any[] = [];
		let oldData: any[] = [];
		oldData.push(payrollData);
		if (oldData.length > 0) {
			for (let i = 0; i < oldData.length; i++) {
				newData.push({
					'H01 Record Type': 'HEADER',
					'H02 File Creation Date': this.datePipe.transform(today, 'ddMMyyyy'),
					'H03 Organization ID': oldData[i].organizationid ? oldData[i].organizationid : 'OrgID',
					'H04 Sender Name': oldData[i].companyname ? oldData[i].companyname : 'COMPANYNAME',
					'D01 Record Type': 'PAYMENT',
					'D02 Product Type': oldData[i].producttype ? oldData[i].producttype : '',
					'D03 Originating Account Number': oldData[i].originatingaccountnumber ? oldData[i].originatingaccountnumber : '',
					'D04 Originating Account Currency': oldData[i].originatingaccountcurrency ? oldData[i].originatingaccountcurrency : '',
					'D05 Customer Reference or Batch Reference': oldData[i].CustomerReference ? oldData[i].CustomerReference : '',
					'D06 Payment Currency': oldData[i].paymentcurrency ? oldData[i].paymentcurrency : '',
					'D07 Batch ID': oldData[i].batchid ? oldData[i].batchid : '',
					'D08 Payment Date': this.datePipe.transform(today, 'ddMMyyyy'),
					'D09 Bank Charges': oldData[i].BankCharges ? oldData[i].BankCharges : '',
					'D10 Debit Account for Bank Charges': oldData[i].DebitAccountforBankCharges ? oldData[i].DebitAccountforBankCharges : '',
					'D11 Receiving Party Name': oldData[i].benificaryname ? oldData[i].benificaryname : '',
					'D12 Payable To': oldData[i].PayableTo ? oldData[i].PayableTo : '',
					'D13 Receiving Party Address 1': oldData[i].ReceivingPartyAddress1 ? oldData[i].ReceivingPartyAddress1 : '',
					'D14 Receiving Party Address 2': oldData[i].ReceivingPartyAddress2 ? oldData[i].ReceivingPartyAddress2 : '',
					'D15 Receiving Party Address 3': oldData[i].ReceivingPartyAddress3 ? oldData[i].ReceivingPartyAddress3 : '',

					'D16 Receiving Account Number/IBAN': oldData[i].benificaryaccountnumber ? oldData[i].benificaryaccountnumber : '',

					'D17 Country Specific': oldData[i].CountrySpecific ? oldData[i].CountrySpecific : '01',

					'D18 Receiving Bank Code': oldData[i].receivingbankcode ? oldData[i].receivingbankcode : '',
					'D19 Receiving Branch Code': oldData[i].receivingbranchcode ? oldData[i].receivingbranchcode : '',

					'D20 Clearing Code': oldData[i].ClearingCode ? oldData[i].ClearingCode : '',
					'D21 Beneficiary Bank SWIFT BIC': oldData[i].BeneficiaryBankSWIFTBIC ? oldData[i].BeneficiaryBankSWIFTBIC : '',
					'D22 Beneficiary Bank Name': oldData[i].BeneficiaryBankName ? oldData[i].BeneficiaryBankName : '',
					'D23 Beneficiary Bank Address': oldData[i].BeneficiaryBankAddress ? oldData[i].BeneficiaryBankAddress : '',
					'D24 Beneficiary Bank Country': oldData[i].BeneficiaryBankCountry ? oldData[i].BeneficiaryBankCountry : '',
					'D25 Routing Code': oldData[i].RoutingCode ? oldData[i].RoutingCode : '',
					'D26 Intermediary Bank SWIFT BIC': oldData[i].IntermediaryBankSWIFTBIC ? oldData[i].IntermediaryBankSWIFTBIC : '',

					'D27 Amount Currency': oldData[i].AmountCurrency ? oldData[i].AmountCurrency : '0',

					'D28 Amount': oldData[i].amount ? oldData[i].amount : '',

					'D29 FX Contract Reference 1': oldData[i].FXContractReference1 ? oldData[i].FXContractReference1 : '',
					'D30 Amount to be Utilized 1': oldData[i].AmounttobeUtilized1 ? oldData[i].AmounttobeUtilized1 : '',
					'D31 FX Contract Reference 2': oldData[i].FXContractReference2 ? oldData[i].FXContractReference2 : '',
					'D32 Amount to be Utilized 2': oldData[i].AmounttobeUtilized2 ? oldData[i].AmounttobeUtilized2 : '',
					'D33 Transaction Code': oldData[i].TransactionCode ? oldData[i].TransactionCode : '',
					'D34 Particulars / Beneficary or Payer Reference': oldData[i].BeneficaryorPayerReference ? oldData[i].BeneficaryorPayerReference : '',
					'D35 DDA Reference (SG HK collection) or Reference': oldData[i].DDAReference ? oldData[i].DDAReference : '',
					'D36 Payment Details': oldData[i].PaymentDetails ? oldData[i].PaymentDetails : '',
					'D37 Instruction to Ordering Bank': oldData[i].average1 ? oldData[i].name : '',
					'D38 Beneficiary Resident Status': oldData[i].InstructiontoOrderingBank ? oldData[i].InstructiontoOrderingBank : '',
					'D39 Beneficiary Category': oldData[i].BeneficiaryCategory ? oldData[i].BeneficiaryCategory : '',
					'D40 Transaction Relationship': oldData[i].TransactionRelationship ? oldData[i].TransactionRelationship : '',
					'D41 Payee Role': oldData[i].PayeeRole ? oldData[i].PayeeRole : '',
					'D42 Remitter Identity': oldData[i].RemitterIdentity ? oldData[i].RemitterIdentity : '',
					'D43 Purpose of Payment': oldData[i].PurposeofPayment ? oldData[i].PurposeofPayment : '',
					'D44 Supplementary Info': oldData[i].SupplementaryInfo ? oldData[i].SupplementaryInfo : '',

					'D45 Delivery Mode': oldData[i].deliverymode ? oldData[i].deliverymode : 'B',

					'D46 Print At Location/Pick Up Location': oldData[i].PickUpLocation ? oldData[i].PickUpLocation : '',
					'D47 Payable Location': oldData[i].PayableLocation ? oldData[i].PayableLocation : '',
					'D48 Mail to Party Name': oldData[i].MailtoPartyName ? oldData[i].MailtoPartyName : '',
					'D49 Mail to Party Address 1': oldData[i].MailtoPartyAddress1 ? oldData[i].MailtoPartyAddress1 : '',
					'D50 Mail to Party Address 2': oldData[i].MailtoPartyAddress2 ? oldData[i].MailtoPartyAddress2 : '',
					'D51 Mail to Party Address 3': oldData[i].MailtoPartyAddress3 ? oldData[i].MailtoPartyAddress3 : '',
					'D52 Reserved Field': oldData[i].ReservedField ? oldData[i].ReservedField : '',
					'D53 Postal Code': oldData[i].PostalCode ? oldData[i].PostalCode : '',

					'D54 Email 1': oldData[i].email1 ? oldData[i].email1 : '',

					'D55 Email 2': oldData[i].Email2 ? oldData[i].Email2 : '',
					'D56 Email 3': oldData[i].Email3 ? oldData[i].Email3 : '',
					'D57 Email 4': oldData[i].Email4 ? oldData[i].Email4 : '',
					'D58 Email 5': oldData[i].Email5 ? oldData[i].Email5 : '',
					'D59 Phone Number 1': oldData[i].PhoneNumber1 ? oldData[i].PhoneNumber1 : '',
					'D60 Phone Number 2': oldData[i].PhoneNumber2 ? oldData[i].PhoneNumber2 : '',
					'D61 Phone Number 3': oldData[i].PhoneNumber3 ? oldData[i].PhoneNumber3 : '',
					'D62 Phone Number 4': oldData[i].PhoneNumber4 ? oldData[i].PhoneNumber4 : '',
					'D63 Phone Number 5': oldData[i].PhoneNumber5 ? oldData[i].PhoneNumber5 : '',
					'D64 Invoice Details': oldData[i].invoicedetails ? oldData[i].invoicedetails : '',

					'D65 Client Reference 1': oldData[i].ClientReference1 ? oldData[i].ClientReference1 : '',
					'D66 Client Reference 2': oldData[i].ClientReference2 ? oldData[i].ClientReference2 : '',
					'D67 Client Reference 3': oldData[i].ClientReference3 ? oldData[i].ClientReference3 : '',
					'D68 Client Reference 4': oldData[i].ClientReference4 ? oldData[i].ClientReference4 : '',

					'T01 Record Type': 'TRAILER',
					'T02 Total No. of Transactions': oldData[i].totalnooftransactions ? oldData[i].totalnooftransactions : '',
					'T03 Total Transaction Amount': oldData[i].totaltransactionamount ? oldData[i].totaltransactionamount : '',
				})
			}
		}
		// let csvData = new Angular5Csv(newData, 'payroll ' + this.datePipe.transform(today, 'MMMd,y,HH:mm'), this.payrollCsvOptions);
		let csvData = this.texts.textInit(newData, 'payroll ' + this.datePipe.transform(today, 'MMMd,y,HH:mm'), this.payrollCsvOptions);
	}

	processPayrollGenerate(payrollData) {
		// console.log(payrollData);
		this.payroll.processPayroll(payrollData.payrollheader, payrollData.payrollbody);
	}
}
