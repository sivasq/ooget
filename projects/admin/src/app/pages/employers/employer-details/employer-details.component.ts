import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DatePipe } from '@angular/common';
import { FormControl, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-employer-details',
	templateUrl: './employer-details.component.html',
	styleUrls: ['./employer-details.component.scss'],
	// encapsulation: ViewEncapsulation.None
})
export class EmployerDetailsComponent implements OnInit {
	navMode: string = '';
	navOpen: boolean;
	public baseUrl;
	public imgBaseUrl;
	// @ViewChild('docFileInput') docFileInput: ElementRef;

	@ViewChild('docFileInput') myInputVariable: ElementRef;

	public employerDetails: any = [];
	objectKeys = Object.keys;
	public companyCodeGenerator: boolean = false;

	public docName;
	public employerid;
	public companyCodes = {
		employerid: '',
		employercode: ''
	};
	showUpload = true;
	uploaded = false;

	busy: Subscription;

	companyCodeForm: FormGroup;

	public serverResponseData = [
		{
			OrganizationID: "ORGID",
			CompanyName: "COMPANYNAME",
			ProductType: "LVT",
			OriginatingAccountNumber: "123456789",
			OriginatingAccountCurrency: "SGD",
			PaymentCurrency: "SGD",
			BatchID: "1",
			BenificaryName: "BENEFICIARYNAME",
			BenificaryAccountNumber: "0018765432",
			ReceivingBankCode: "7171",
			ReceivingBranchCode: "001",
			Amount: "123456.78",
			DeliveryMode: "E",
			Email1: "example@domain.com",
			InvoiceDetails: "NVOICEDETAILS",
			TotalNoofTransactions: "1",
			TotalTransactionAmount: "123456.78"
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
		headers: ["H01 Record Type", "H02 File Creation Date", "H03 Organization ID", "H04 Sender Name", "D01 Record Type", "D02 Product Type", "D03 Originating Account Number", "D04 Originating Account Currency", "D05 Customer Reference or Batch Reference", "D06 Payment Currency", "D07 Batch ID", "D08 Payment Date", "D09 Bank Charges", "D10 Debit Account for Bank Charges", "D11 Receiving Party Name", "D12 Payable To", "D13 Receiving Party Address 1", "D14 Receiving Party Address 2", "D15 Receiving Party Address 3", "D16 Receiving Account Number/IBAN", "D17 Country Specific", "D18 Receiving Bank Code", "D19 Receiving Branch Code", "D20 Clearing Code", "D21 Beneficiary Bank SWIFT BIC", "D22 Beneficiary Bank Name", "D23 Beneficiary Bank Address", "D24 Beneficiary Bank Country", "D25 Routing Code", "D26 Intermediary Bank SWIFT BIC", "D27 Amount Currency", "D28 Amount", "D29 FX Contract Reference 1", "D30 Amount to be Utilized 1", "D31 FX Contract Reference 2", "D32 Amount to be Utilized 2", "D33 Transaction Code", "D34 Particulars / Beneficary or Payer Reference", "D35 DDA Reference (SG HK collection) or Reference", "D36 Payment Details", "D37 Instruction to Ordering Bank", "D38 Beneficiary Resident Status", "D39 Beneficiary Category", "D40 Transaction Relationship", "D41 Payee Role", "D42 Remitter Identity", "D43 Purpose of Payment", "D44 Supplementary Info", "D45 Delivery Mode", "D46 Print At Location/Pick Up Location", "D47 Payable Location", "D48 Mail to Party Name", "D49 Mail to Party Address 1", "D50 Mail to Party Address 2", "D51 Mail to Party Address 3", "D52 Reserved Field", "D53 Postal Code", "D54 Email 1", "D55 Email 2", "D56 Email 3", "D57 Email 4", "D58 Email 5", "D59 Phone Number 1", "D60 Phone Number 2", "D61 Phone Number 3", "D62 Phone Number 4", "D63 Phone Number 5", "D64 Invoice Details", "D65 Client Reference 1", "D66 Client Reference 2", "D67 Client Reference 3", "D68 Client Reference 4", "T01 Record Type", "T02 Total No. of Transactions", "T03 Total Transaction Amount"]
	};

	constructor(private fb: FormBuilder, private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, private configService: ConfigService, private datePipe: DatePipe) {
		this.buildCompanyCodeForm();
		this.baseUrl = configService.base_url;
		this.imgBaseUrl = configService.img_base_url;
		this.employerid = this.route.snapshot.params['emp_id'];
		let employerId = {
			employerid: this.route.snapshot.params['emp_id'],
		};
		this.getEmployerDetails({ 'employerid': this.route.snapshot.params['emp_id'] });
	}

	toggleCompanyCodeGenerator(el) {
		this.companyCodeForm.patchValue({
			'employercode': ''
		});
		this.companyCodeGenerator = !this.companyCodeGenerator;
	}

	buildCompanyCodeForm(): void {
		this.companyCodeForm = this.fb.group({
			employerid: ['', Validators.compose([Validators.required])],
			employercode: ['', Validators.compose([Validators.required]), this.isCompanycodeUnique.bind(this)],
		});
	}
	//

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

					'D17 Country Specific': oldData[i].CountrySpecific ? oldData[i].CountrySpecific : "01",

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
				});
			}
			// this.NewData = newData;
		}
		// new Angular5Csv(newData, 'My Report', this.csvOptions);
	}

	getEmployerDetails(employerId) {
		this.busy = this._httpService.getEmployer(employerId)
			.subscribe(
				response => {
					if (response.success) {
						this.employerDetails = response.result[0];
						this.companyCodeForm.patchValue({
							'employerid': response.result[0].id
						});
						console.log(this.employerDetails);

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Check Company code Unique
	isCompanycodeUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this._httpService.checkCompanyCodeExists({ 'companycode': control.value.toUpperCase() }).subscribe((response) => {
					if (response.success) {
						resolve(null);
					} else {
						resolve({ 'isCompanycodeUnique': true });
					}
				}, () => { resolve({ 'isCompanycodeUnique': false }); });
			}, 50);
		});
	}

	updateCompanyCode() {
		this.busy = this._httpService.updateCompanyCode(this.companyCodeForm.value)
			.subscribe(
				response => {
					if (response.success) {
						this.employerDetails.companycode = this.companyCodeForm.get('employercode').value;
						this.companyCodeGenerator = !this.companyCodeGenerator;
						console.log(response);

						let snackBarRef = this.snackBar.open('CompanyCode Added Successfully.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	getDoc(event) {
		console.log(event.target.files[0]);
		this.showUpload = false;
		this.uploaded = true;
		this.docName = event.target.files[0].name;
		// if (event.target.files && event.target.files[0]) {
		// 	var reader = new FileReader();
		// 	reader.readAsDataURL(event.target.files[0]); // read file as data url
		// 	reader.onload = (event:any) => { // called once readAsDataURL is completed
		// 		this.profileImage = event.target.result;
		// 		console.log(event.target.result);
		// 	}
		// }
	}

	removeDoc() {
		this.myInputVariable.nativeElement.value = '';
		this.showUpload = true;
		this.uploaded = false;
		this.docName = '';
	}

	uploadDoc() {
		console.log(this.myInputVariable.nativeElement.files);

		const fileBrowser = this.myInputVariable.nativeElement;
		const formData: FormData = new FormData();
		if (fileBrowser.files && fileBrowser.files[0]) {
			formData.append('termsandconditions', fileBrowser.files[0]);
			formData.append('employerid', this.employerid);
		}

		this.busy = this._httpService.uploadTermsDoc(formData, this.employerid)
			.subscribe(
				response => {
					if (response.success) {
						this.employerDetails.termsandconditions = response.message;
						this.showUpload = true;
						this.uploaded = false;
						this.docName = '';

						let snackBarRef = this.snackBar.open('Terms & Condition Uploaded Successfully.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	ngOnInit() {
		// this.companyCodeForm.valueChanges
		// 	.subscribe(x => {
		// 		if (x != null) {
		// 			console.log(x);
		// 		}
		// 	});
	}
}
