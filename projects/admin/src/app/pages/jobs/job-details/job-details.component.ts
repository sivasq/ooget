import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import * as moment from 'moment';
import { DublicateJobConfirmComponent } from '../dialogs/dublicate-job-confirm/dublicate-job-confirm.component';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as XLSX from 'xlsx';
import { JobActivationComponent } from '../dialogs/job-activation/job-activation.component';
import { SingleTextareaComponent } from '../dialogs/single-textarea/single-textarea.component';
import { JobRegion, JobLocation } from '../../../classes/jobLocation';
import { Specialization } from '../../../classes/Specialization';
import { WorkingEnvironment } from '../../../classes/WorkingEnvironment';
import { Industry } from '../../../classes/Industry';
import { MockDataService } from '../../../services/mock-data.service';
import { isArray } from 'util';

@Component({
	selector: 'app-job-details',
	templateUrl: './job-details.component.html',
	styleUrls: ['./job-details.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class JobDetailsComponent implements OnInit {
	// ========================
	@ViewChild('TABLE') table: ElementRef;
	public ELEMENT_DATA: any[] = [
		{
			name: 'name',
			jan1stHalf: {
				unVerified: 6,
			},
			jan2ndHalf: 'H',
			feb1stHalf: 'f',
			feb2ndHalf: 'g',
			mar1stHalf: 'l',
			mar2ndHalf: 'f',
			apr1stHalf: 't',
			apr2ndHalf: 'e',
			may1stHalf: 'r',
			may2ndHalf: 't',
			jun1stHalf: 'e',
			jun2ndHalf: 'q',
			jul1stHalf: 'j',
			jul2ndHalf: 'q',
			aug1stHalf: 'a',
			aug2ndHalf: 'e',
			sep1stHalf: 'w',
			sep2ndHalf: 's',
			oct1stHalf: 'o',
			oct2ndHalf: 'k',
			nov1stHalf: 'n',
			nov2ndHalf: 'm',
			dec1stHalf: 'd',
			dec2ndHalf: 'f',
			description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
		}
	];

	displayedColumns1: string[] = ['select1', 'name1', 'jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'];
	displayedColumns: string[] = ['select', 'name', 'jan1stHalf', 'jan2ndHalf', 'feb1stHalf', 'feb2ndHalf', 'mar1stHalf', 'mar2ndHalf', 'apr1stHalf', 'apr2ndHalf', 'may1stHalf', 'may2ndHalf', 'jun1stHalf', 'jun2ndHalf', 'jul1stHalf', 'jul2ndHalf', 'aug1stHalf', 'aug2ndHalf', 'sep1stHalf', 'sep2ndHalf', 'oct1stHalf', 'oct2ndHalf', 'nov1stHalf', 'nov2ndHalf', 'dec1stHalf', 'dec2ndHalf'];
	dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
	selection = new SelectionModel<any>(true, []);
	expandedElement: any;

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	exportAsExcel() {
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ELEMENT_DATA);// converts a DOM TABLE element to a worksheet
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, 'SheetJS.xlsx');
	}
	// ========================
	public baseUrl;

	public jobDetails: any = [];
	objectKeys = Object.keys;
	public companyid;
	public companyDetails: any;

	public candidatesApplied: any[];
	public candidatesOffered: any[];
	public offersAccepted: any[];
	public jobContractors: any[];

	// busy Config
	busy: Subscription;

	// public holidaysList: any[] = [];

	public serverResponseData = [
		{
			OrganizationID: 'ORGID',
			CompanyName: 'COMPANYNAME',
			ProductType: 'LVT',
			OriginatingAccountNumber: '123456789',
			OriginatingAccountCurrency: 'SGD',
			PaymentCurrency: 'SGD',
			BatchID: '1',
			BenificaryName: 'BENEFICIARYNAME',
			BenificaryAccountNumber: '0018765432',
			ReceivingBankCode: '7171',
			ReceivingBranchCode: '001',
			Amount: '123456.78',
			DeliveryMode: 'E',
			Email1: 'example@domain.com',
			InvoiceDetails: 'NVOICEDETAILS',
			TotalNoofTransactions: '1',
			TotalTransactionAmount: '123456.78'
		}
	];

	public csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalseparator: '.',
		showLabels: true,
		showTitle: false,
		title: 'Your title',
		useBom: true,
		noDownload: false,
		headers: ['H01 Record Type', 'H02 File Creation Date', 'H03 Organization ID', 'H04 Sender Name', 'D01 Record Type', 'D02 Product Type', 'D03 Originating Account Number', 'D04 Originating Account Currency', 'D05 Customer Reference or Batch Reference', 'D06 Payment Currency', 'D07 Batch ID', 'D08 Payment Date', 'D09 Bank Charges', 'D10 Debit Account for Bank Charges', 'D11 Receiving Party Name', 'D12 Payable To', 'D13 Receiving Party Address 1', 'D14 Receiving Party Address 2', 'D15 Receiving Party Address 3', 'D16 Receiving Account Number/IBAN', 'D17 Country Specific', 'D18 Receiving Bank Code', 'D19 Receiving Branch Code', 'D20 Clearing Code', 'D21 Beneficiary Bank SWIFT BIC', 'D22 Beneficiary Bank Name', 'D23 Beneficiary Bank Address', 'D24 Beneficiary Bank Country', 'D25 Routing Code', 'D26 Intermediary Bank SWIFT BIC', 'D27 Amount Currency', 'D28 Amount', 'D29 FX Contract Reference 1', 'D30 Amount to be Utilized 1', 'D31 FX Contract Reference 2', 'D32 Amount to be Utilized 2', 'D33 Transaction Code', 'D34 Particulars / Beneficary or Payer Reference', 'D35 DDA Reference (SG HK collection) or Reference', 'D36 Payment Details', 'D37 Instruction to Ordering Bank', 'D38 Beneficiary Resident Status', 'D39 Beneficiary Category', 'D40 Transaction Relationship', 'D41 Payee Role', 'D42 Remitter Identity', 'D43 Purpose of Payment', 'D44 Supplementary Info', 'D45 Delivery Mode', 'D46 Print At Location/Pick Up Location', 'D47 Payable Location', 'D48 Mail to Party Name', 'D49 Mail to Party Address 1', 'D50 Mail to Party Address 2', 'D51 Mail to Party Address 3', 'D52 Reserved Field', 'D53 Postal Code', 'D54 Email 1', 'D55 Email 2', 'D56 Email 3', 'D57 Email 4', 'D58 Email 5', 'D59 Phone Number 1', 'D60 Phone Number 2', 'D61 Phone Number 3', 'D62 Phone Number 4', 'D63 Phone Number 5', 'D64 Invoice Details', 'D65 Client Reference 1', 'D66 Client Reference 2', 'D67 Client Reference 3', 'D68 Client Reference 4', 'T01 Record Type', 'T02 Total No. of Transactions', 'T03 Total Transaction Amount']
	};

	employmentType = ['', 'Part Time', 'Full Time'];
	jobStatus = ['', 'Pending', 'Live', 'Closed'];
	workDaysType = ['', 'Normal', 'Flexible'];
	Regions: JobRegion[];
	JobLocations: JobLocation[];
	Specializations: Specialization[];
	WorkingEnvironments: WorkingEnvironment[];
	Industries: Industry[];

	constructor(private urlconfig: ConfigService, public router: Router, private _httpService: ApiCallService, private route: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar, private datePipe: DatePipe, private mockDataService: MockDataService) {
		this.baseUrl = urlconfig.base_url;
		this.companyid = this.route.snapshot.params['emp_id'];
		let jobId = {
			jobid: this.route.snapshot.params['job_id']
		};
		this.getWorkingEnvironments();
		this.getJobRegions();
		this.getJobLocations();
		this.getSpecializations();
		this.getIndustries();
		this.getJobDetails();
		this.getJobContractors(jobId);
	}

	getWorkingEnvironments(): void {
		this.mockDataService.getWorkingEnvironments()
			.subscribe(WorkingEnvironments => this.WorkingEnvironments = WorkingEnvironments);
	}
	getJobRegions(): void {
		this.mockDataService.getJobRegions()
			.subscribe(Regions => this.Regions = Regions);
	}
	getJobLocations(): void {
		this.mockDataService.getJobLocations()
			.subscribe(Locations => this.JobLocations = Locations);
	}
	getSpecializations(): void {
		this.mockDataService.getSpecializations()
			.subscribe(Specializations => this.Specializations = Specializations);
	}
	getIndustries(): void {
		this.mockDataService.getIndustries()
			.subscribe(Industries => this.Industries = Industries);
	}

	getJobSpecializationName(SpecializationId) {
		if (SpecializationId == '' || SpecializationId == undefined) { return false; }

		let filteredSpecializations = this.Specializations.filter(specialization => specialization.id == SpecializationId);
		return filteredSpecializations[0].name;
	}

	getRegionName(regionId) {
		if (regionId == '' || regionId == undefined) { return false; }
		let filteredRegions = this.Regions.filter(region => region.id == regionId);
		return filteredRegions[0].name;
	}

	getJobLocationName(locationId) {
		if (locationId == '' || locationId == undefined) { return false; }
		let filteredLocation = this.JobLocations.filter(location => location.id == locationId);
		return filteredLocation[0].name;
	}

	getIndustryName(industryId) {
		if (industryId == '' || industryId == undefined) { return false; }
		let filteredIndustry = this.Industries.filter(industry => industry.id == industryId);
		return filteredIndustry[0].name;
	}

	getWorkingEnvironmentName(envId) {
		if (envId == '' || envId == undefined) { return false; }
		let envIds = this.stringToArray(envId);
		let filteredEnv = envIds.map(envid => {
			return this.WorkingEnvironments.filter(workEnv => workEnv.id == envid);
		});
		let filteredName = filteredEnv.map(env => env[0].name);
		return this.ArrayToString(filteredName);
	}

	processPayrollGenerate() {
		let today = new Date();
		let newData: any[] = [];
		let oldData: any = this.serverResponseData;
		if (oldData.length > 0) {
			for (let i = 0; i < oldData.length; i++) {
				newData.push({
					'H01 Record Type': 'HEADER',
					'H02 File Creation Date': this.datePipe.transform(today, 'ddMMyyyy'),
					'H03 Organization ID': oldData[i].OrganizationID ? oldData[i].OrganizationID : 'OrgID',
					'H04 Sender Name': oldData[i].CompanyName ? oldData[i].CompanyName : 'COMPANYNAME',
					'D01 Record Type': 'PAYMENT',
					'D02 Product Type': oldData[i].ProductType ? oldData[i].ProductType : '',
					'D03 Originating Account Number': oldData[i].OriginatingAccountNumber ? oldData[i].OriginatingAccountNumber : '',
					'D04 Originating Account Currency': oldData[i].OriginatingAccountCurrency ? oldData[i].OriginatingAccountCurrency : '',
					'D05 Customer Reference or Batch Reference': oldData[i].CustomerReference ? oldData[i].CustomerReference : '',
					'D06 Payment Currency': oldData[i].PaymentCurrency ? oldData[i].PaymentCurrency : '',
					'D07 Batch ID': oldData[i].BatchID ? oldData[i].BatchID : '',
					'D08 Payment Date': this.datePipe.transform(today, 'ddMMyyyy'),
					'D09 Bank Charges': oldData[i].BankCharges ? oldData[i].BankCharges : '',
					'D10 Debit Account for Bank Charges': oldData[i].DebitAccountforBankCharges ? oldData[i].DebitAccountforBankCharges : '',
					'D11 Receiving Party Name': oldData[i].BenificaryName ? oldData[i].BenificaryName : '',
					'D12 Payable To': oldData[i].PayableTo ? oldData[i].PayableTo : '',
					'D13 Receiving Party Address 1': oldData[i].ReceivingPartyAddress1 ? oldData[i].ReceivingPartyAddress1 : '',
					'D14 Receiving Party Address 2': oldData[i].ReceivingPartyAddress2 ? oldData[i].ReceivingPartyAddress2 : '',
					'D15 Receiving Party Address 3': oldData[i].ReceivingPartyAddress3 ? oldData[i].ReceivingPartyAddress3 : '',

					'D16 Receiving Account Number/IBAN': oldData[i].BenificaryAccountNumber ? oldData[i].BenificaryAccountNumber : '',

					'D17 Country Specific': oldData[i].CountrySpecific ? oldData[i].CountrySpecific : '01',

					'D18 Receiving Bank Code': oldData[i].ReceivingBankCode ? oldData[i].ReceivingBankCode : '',
					'D19 Receiving Branch Code': oldData[i].ReceivingBranchCode ? oldData[i].ReceivingBranchCode : '',

					'D20 Clearing Code': oldData[i].ClearingCode ? oldData[i].ClearingCode : '',
					'D21 Beneficiary Bank SWIFT BIC': oldData[i].BeneficiaryBankSWIFTBIC ? oldData[i].BeneficiaryBankSWIFTBIC : '',
					'D22 Beneficiary Bank Name': oldData[i].BeneficiaryBankName ? oldData[i].BeneficiaryBankName : '',
					'D23 Beneficiary Bank Address': oldData[i].BeneficiaryBankAddress ? oldData[i].BeneficiaryBankAddress : '',
					'D24 Beneficiary Bank Country': oldData[i].BeneficiaryBankCountry ? oldData[i].BeneficiaryBankCountry : '',
					'D25 Routing Code': oldData[i].RoutingCode ? oldData[i].RoutingCode : '',
					'D26 Intermediary Bank SWIFT BIC': oldData[i].IntermediaryBankSWIFTBIC ? oldData[i].IntermediaryBankSWIFTBIC : '',

					'D27 Amount Currency': oldData[i].AmountCurrency ? oldData[i].AmountCurrency : '0',

					'D28 Amount': oldData[i].Amount ? oldData[i].Amount : '',

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

					'D45 Delivery Mode': oldData[i].DeliveryMode ? oldData[i].DeliveryMode : 'B',

					'D46 Print At Location/Pick Up Location': oldData[i].PickUpLocation ? oldData[i].PickUpLocation : '',
					'D47 Payable Location': oldData[i].PayableLocation ? oldData[i].PayableLocation : '',
					'D48 Mail to Party Name': oldData[i].MailtoPartyName ? oldData[i].MailtoPartyName : '',
					'D49 Mail to Party Address 1': oldData[i].MailtoPartyAddress1 ? oldData[i].MailtoPartyAddress1 : '',
					'D50 Mail to Party Address 2': oldData[i].MailtoPartyAddress2 ? oldData[i].MailtoPartyAddress2 : '',
					'D51 Mail to Party Address 3': oldData[i].MailtoPartyAddress3 ? oldData[i].MailtoPartyAddress3 : '',
					'D52 Reserved Field': oldData[i].ReservedField ? oldData[i].ReservedField : '',
					'D53 Postal Code': oldData[i].PostalCode ? oldData[i].PostalCode : '',

					'D54 Email 1': oldData[i].Email1 ? oldData[i].Email1 : '',

					'D55 Email 2': oldData[i].Email2 ? oldData[i].Email2 : '',
					'D56 Email 3': oldData[i].Email3 ? oldData[i].Email3 : '',
					'D57 Email 4': oldData[i].Email4 ? oldData[i].Email4 : '',
					'D58 Email 5': oldData[i].Email5 ? oldData[i].Email5 : '',
					'D59 Phone Number 1': oldData[i].PhoneNumber1 ? oldData[i].PhoneNumber1 : '',
					'D60 Phone Number 2': oldData[i].PhoneNumber2 ? oldData[i].PhoneNumber2 : '',
					'D61 Phone Number 3': oldData[i].PhoneNumber3 ? oldData[i].PhoneNumber3 : '',
					'D62 Phone Number 4': oldData[i].PhoneNumber4 ? oldData[i].PhoneNumber4 : '',
					'D63 Phone Number 5': oldData[i].PhoneNumber5 ? oldData[i].PhoneNumber5 : '',
					'D64 Invoice Details': oldData[i].InvoiceDetails ? oldData[i].InvoiceDetails : '',

					'D65 Client Reference 1': oldData[i].ClientReference1 ? oldData[i].ClientReference1 : '',
					'D66 Client Reference 2': oldData[i].ClientReference2 ? oldData[i].ClientReference2 : '',
					'D67 Client Reference 3': oldData[i].ClientReference3 ? oldData[i].ClientReference3 : '',
					'D68 Client Reference 4': oldData[i].ClientReference4 ? oldData[i].ClientReference4 : '',

					'T01 Record Type': 'TRAILER',
					'T02 Total No. of Transactions': oldData[i].TotalNoofTransactions ? oldData[i].TotalNoofTransactions : '',
					'T03 Total Transaction Amount': oldData[i].TotalTransactionAmount ? oldData[i].TotalTransactionAmount : '',
				})
			}
			// this.NewData = newData;
		}
		// new Angular5Csv(newData, 'My Report', this.csvOptions);
	}

	getJobDetails() {
		this.busy = this._httpService.getJobDetails({ 'jobid': this.route.snapshot.params['job_id'] })
			.subscribe(
				response => {
					if (response.success) {
						this.jobDetails = response.result;
						this.jobDetails.specializations = this.isNumeric(response.result.specializations) ? Number(response.result.specializations) : 'Others';

						this.jobDetails.otherjobspecialization = this.isNumeric(response.result.specializations) ? '' : response.result.specializations;
						// this.companyDetails = response.job.companyid;
						// this.candidatesApplied = response.job.candidatesapplied;
						// this.candidatesOffered = response.job.candidatesseleceted;
						// this.offersAccepted = response.job.candidatessigned;
						// console.log(this.jobDetails.jobperiodfrom);
						// console.log(this.jobDetails.jobperiodfrom.split("/").reverse().join("/"));
						this.jobDetails.from = this.jobDetails.from.split('-').reverse().join('-');
						this.jobDetails.to = this.jobDetails.to.split('-').reverse().join('-');
						// this.getDateArray(startDate, endDate);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	getJobContractors(jobId) {
		this.busy = this._httpService.getJobContractsList(jobId)
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response);
						this.jobContractors = response.result.filter(job => job.offer_accepted !== null);
						// console.log(this.jobContractors);
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Job Activation with Pay Info
	activateJobConfirm(jobDetails) {
		let dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			'jobid': jobDetails.id,
			'companyid': jobDetails.employer_id,
			'charge_rate': jobDetails.charge_rate,
			'markup_rate': jobDetails.markup_rate,
			'markup_in': jobDetails.markup_in,
			'jobseeker_salary': jobDetails.jobseeker_salary,
			'markup_amount': jobDetails.markup_amount,
		};
		let dialogRef = this.dialog.open(JobActivationComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(response => {
			// console.log(response);
			if (response.callback) {
				this.getJobDetails();
			}
			// error => {
			// 	console.log(error);
		}
		);
	}

	duplicateJobConfirm(companyid, jobid) {
		// routerLink="/admin/employers/{{jobDetails.companyid._id}}/jobs/{{jobDetails._id}}/copyjob"
		let dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			'jobid': jobid,
			'companyid': companyid,
		};
		let dialogRef = this.dialog.open(DublicateJobConfirmComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(employerid => {
			// console.log(employerid);
			// this.router.navigate(['employers/' + companyid + '/view']);
			// this.router.navigate(['/admin/employers/' + employerid + '/jobs/' + jobid + '/copyjob'])
		});
	}

	rePostJob(companyid, jobid) { }
	// getDateArray(start, end) {
	// 	var holidaysDates = new Array();
	// 	var dt = new Date(start);
	// 	while (dt <= end) {
	// 		holidaysDates.push(new Date(dt));
	// 		dt.setDate(dt.getDate() + 1);
	// 	}
	// 	this.holidaysList = holidaysDates;
	// 	console.log(this.holidaysList);
	// }

	removeContractorFromJobConfirm(contractId, index) {
		let dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			// boxTitle:"Confirmation",
			confirmMsg: '<h4>Do you want remove this contractor from This Contract ?</h4>',
			okButtonText: 'Yes',
			noButtonText: 'No',
			actionalign: 'center'
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					// console.log(employerId);
					// this.removeContractorFromJob(contractId, index)
					this.getReasonForRemoveContractorFromJob(contractId, index)
				} else if (data == 'no') {
					// this.accept_terms = "true";
					// console.log('no');
				}
			}
		);
	}

	// Job Activation with Pay Info
	getReasonForRemoveContractorFromJob(contractId, index) {
		let dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			boxTitle: 'Please Enter Valid Reason',
			textPlaceHolder: 'Valid Reason',
			okButtonText: 'Submit',
			noButtonText: 'Cancel',
			actionalign: 'center'
		};
		let dialogRef = this.dialog.open(SingleTextareaComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(response => {
			if (response.callback) {
				this.removeContractorFromJob(contractId, index)
			}
			// console.log(response);
		})
	}

	public removeContractorFromJob(contractId, index) {

		// this.jobContractors.splice(index, 1);

		let snackBarRef = this.snackBar.open('This Function not Done.', 'Close', {
			duration: 10000,
		});
		snackBarRef.onAction().subscribe(() => {
			snackBarRef.dismiss();
		});
		// this.busy = this._httpService.removeContractorFromJob({ 'contractid': contractId })
		// 	.subscribe(
		// 		response => {
		// 			if (response.success) {
		// 				this.jobContractors.splice(index, 1);
		// 			} else if (!response.success) {
		// 				console.log(response);
		// 			}
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
	}

	ArrayToString(dataArray) {
		if (isArray(dataArray)) {
			dataArray.map(function (e) {
				// return JSON.stringify(e);
				return e;
			});
			return dataArray.join(',');
		}
	}

	stringToArray(dataString) {
		if (typeof dataString !== 'undefined' && dataString) {
			if (dataString.includes(',')) {
				return dataString.split(',').map(Number);
			} else {
				return [dataString].map(Number);
			}
		} else {
			return [];
		}
	}

	isNumeric(string) {
		if (isNaN(string)) {
			return false;
		} else {
			return true;
		}
	}

	ngOnInit() {
		// let startDate = new Date("2017-10-01"); //YYYY-MM-DD
		// let endDate = new Date("2017-10-07"); //YYYY-MM-DD

		// let dateArr = this.getDateArray(startDate, endDate);
		// console.log(dateArr);
	}

}
