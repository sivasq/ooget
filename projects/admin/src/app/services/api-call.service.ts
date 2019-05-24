import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

@Injectable()
export class ApiCallService {
	private _baseUrl;
	private _token;
	constructor(private http: HttpClient, private config: ConfigService) {
		this._baseUrl = config.base_url;
		this._token = localStorage.getItem('ogToken');
	}

	createNonAuthorizationHeaderJson() {
		const headers = {};
		headers['Content-Type'] = 'application/json';
		headers['Access-Control-Allow-Origin'] = '*';
		// headers['Accept'] = 'application/json';
		return headers;
	}

	createAuthorizationHeaderJson() {
		const headers = {};
		headers['Content-Type'] = 'application/json';
		headers['Access-Control-Allow-Origin'] = '*';
		// headers['Accept'] = 'application/json';
		headers['Token'] = this._token;
		return headers;
	}

	createAuthorizationHeaderFormData() {
		const headers = {};
		headers['Access-Control-Allow-Origin'] = '*';
		// headers['Accept'] = 'application/json';
		headers['token'] = this._token;
		return headers;
	}

	createUrlParams(moduleName, modeName) {
		const params = {};
		params['module'] = moduleName;
		params['mode'] = modeName;
		return params;
	}

	// ==================================== Services ==================================== //

	// User Login Auth Check
	authLogin(authData): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'Login');
		return this.http.post(this._baseUrl, authData, { headers: headers, params: params });
	}

	// Check Unique Email
	checkEmailExists(email): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'CheckEmail');
		return this.http.post(this._baseUrl, email, { headers: headers, params: params });
	}

	// Create Extra User
	createExtraUser(userDetails): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'CreateUser');
		return this.http.post(this._baseUrl, userDetails, { headers: headers, params: params });
	}

	// Upload Current User Profile Image
	uploadCurrentUserProfilePic(formData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'ImageUpload');
		return this.http.post(this._baseUrl, formData, { headers: headers, params: params });
	}

	// Remove Current User Profile Image
	RemoveCurrentUserProfilePic(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'ImageDelete');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Get Current User Profile Details
	getCurrentUserProfileDetails(): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'GetUser');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Check UEN Number Exists for Employer
	checkUENExists(uen): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Employer', 'CheckCompanyUenExist');
		return this.http.post(this._baseUrl, uen, { headers: headers, params: params });
	}

	// Check Company Code Exists for Employer
	checkCompanyCodeExists(companyCode): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Employer', 'CheckCompanyCodeExist');
		return this.http.post(this._baseUrl, companyCode, { headers: headers, params: params });
	}

	// Create New Employer with Default User
	createEmployer(employerData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Employer', 'CreateEmployer');
		return this.http.post(this._baseUrl, employerData, { headers: headers, params: params });
	}

	// Get All Employers
	getAllEmployers(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Employer', 'GetEmployer');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Get Particular Employers
	getEmployer(employerId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Employer', 'GetEmployer');
		return this.http.post(this._baseUrl, employerId, { headers: headers, params: params });
	}

	// Update Employer
	updateEmployer(employerData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Employer', 'UpdateEmployer');
		return this.http.post(this._baseUrl, employerData, { headers: headers, params: params });
	}

	// Get users list
	getListOfUsers(employerid): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'GetUserList');
		return this.http.post(this._baseUrl, employerid, { headers: headers, params: params });
	}

	// Get Current User Profile Details
	getUserProfileDetails(userid): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'GetUser');
		return this.http.post(this._baseUrl, userid, { headers: headers, params: params });
	}

	// Get Current User Profile Details
	deleteUserProfile(userid): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'DeleteUser');
		return this.http.post(this._baseUrl, userid, { headers: headers, params: params });
	}

	// Upload Extra User Profile Image
	uploadUserProfilePic(formData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'ImageUpload');
		return this.http.post(this._baseUrl, formData, { headers: headers, params: params });
	}

	// Get All Public Holidays
	getAllPHHolidays(date): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Holiday', 'GetHolidayList');
		return this.http.post(this._baseUrl, date, { headers: headers, params: params });
	}











	// ====================================================

	adminProfileUpdate(adminProfileData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/updateprofiledetails', adminProfileData, { headers: headers });
	}

	getHomePageContents(): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/fetchoogethome', dummyData, { headers: headers })
			.map(res => res);
	}

	getFeaturedEmployers(): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/fetchfeaturedimages', dummyData, { headers: headers })
			.map(res => res);
	}

	removeFeaturedEmployer(imageId): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/deletefeaturedimage', imageId, { headers: headers })
			.map(res => res);
	}

	homePageContentUpdate(homePageContent): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/updateoogethome', homePageContent, { headers: headers });
	}



	getAllJobseekersList(): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/jobseeker/fetchalljobseekersnew', dummyData, { headers: headers })
			.map(res => res);
	}

	getAllJobseekers(): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/jobseeker/fetchalljobseekers', dummyData, { headers: headers })
			.map(res => res);
	}

	getPendingJobseekers(): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/jobseeker/fetchpendingjobseekers', dummyData, { headers: headers })
			.map(res => res);
	}

	getJobseekersTC(): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/fetchjobseekerterms', dummyData, { headers: headers })
			.map(res => res);
	}

	updateJobseekersTC(terms): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/updatejobseekerterms', terms, { headers: headers })
			.map(res => res);
	}

	uploadTermsDoc(formData, comapnyId): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
				'companyid': comapnyId
			});
		return this.http.post(this._baseUrl + '/employer/updatetermsandconditions', formData, { headers: headers })
			.map(res => res);
	}

	getEmployerDetails(employerId): Observable<any> {
		const employerIds = employerId;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/employer/viewparticularemployer', employerIds, { headers: headers });
	}

	activateJob(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/changejobstatus', jobStatus, { headers: headers });
	}

	addPayInfoToJob(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/updatejobstatuswithpayinfo', jobStatus, { headers: headers });
	}

	closeJobHiring(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/changehiringstatus', jobStatus, { headers: headers });
	}

	changeEmployerStatus(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/employer/updateactivestatus', jobStatus, { headers: headers });
	}

	changeJobseekerStatus(jobseekerStatus): Observable<any> {
		// let jobStatus = jobStatus;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/jobseeker/updateactivestatus', jobseekerStatus, { headers: headers });
	}



	updateCompanyCode(companyCode): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/employer/updatecompanycode', companyCode, { headers: headers })
			.map(res => res);
	}

	getSingleEmployersJobsList(employerId): Observable<any> {
		const employerIds = employerId;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/jobslistbyemployer', employerIds, { headers: headers });
	}

	getAppliedCandidates(jobId): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/fetchparticularjobappliedjobseekers', jobId, { headers: headers });
	}

	selectApplication(ids): Observable<any> {
		// let jobStatus = jobStatus;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/offerjob', ids, { headers: headers });
	}

	getJobSeekerDetails(jobseekerId): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/fetchparticularjobseeker', jobseekerId, { headers: headers });
	}

	toggleIdProofEditable(data): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/jobseeker/updateidproofeditable', data, { headers: headers });
	}

	toggleNricFinEditable(data): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/jobseeker/updatenriceditable', data, { headers: headers });
	}

	getPendingJobsList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/fetchpendingjobs', employerIds, { headers: headers });
	}

	getLiveJobsList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/fetchlivejobs', employerIds, { headers: headers });
	}

	jobAddToEmployer(employerJobData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/createjob', employerJobData, { headers: headers })
			.map(res => res);
	}

	jobUpdateToEmployer(employerJobData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/updatejob', employerJobData, { headers: headers })
			.map(res => res);
	}

	getJobDetails(jobId): Observable<any> {
		const jobIds = jobId;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/fetchparticularjob', jobIds, { headers: headers });
	}

	getContractDetails(contractId): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/fetchparticularcontract', contractId, { headers: headers });
	}

	getTimesheetDetails(contractId): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/fetchtimesheetdetails', contractId, { headers: headers });
	}

	getAllOffDays(contractId): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/fetchoffdays', contractId, { headers: headers });
	}

	getAllPayrollsInContract(contractId): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/fetchpayrollforparticularcontract', contractId, { headers: headers });
	}

	addOffDay(Data): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/addoffday', Data, { headers: headers });
	}

	removeOffDay(Data): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/removeoffday', Data, { headers: headers });
	}

	removeContractorFromJob(Data): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/removeoffday', Data, { headers: headers });
	}



	getJobContractors(jobId): Observable<any> {
		const jobIds = jobId;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/contractslist', jobIds, { headers: headers });
	}

	timesheetAdjust(verifiedTime): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/verifypunch', verifiedTime, { headers: headers })
			.map(res => res);
	}

	updatePunchin(verifiedTime): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/verifypunchin', verifiedTime, { headers: headers })
			.map(res => res);
	}

	updatePunchout(verifiedTime): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/verifypunchout', verifiedTime, { headers: headers })
			.map(res => res);
	}

	timesheetNotesUpdate(notesData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/updatenotes', notesData, { headers: headers })
			.map(res => res);
	}

	verifyTimeSheets(timesheetIds): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/verifytimesheet', timesheetIds, { headers: headers })
			.map(res => res);
	}

	generatepayroll(contractid): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/generatepayroll', contractid, { headers: headers })
			.map(res => res);
	}

	faqAdd(faqData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/addfaq', faqData, { headers: headers })
			.map(res => res);
	}

	getAllFaqItems(): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let dummy;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/fetchfaqs', dummy, { headers: headers })
			.map(res => res);
	}

	faqUpdate(faqData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/updatefaq', faqData, { headers: headers })
			.map(res => res);
	}

	faqDelete(faqId): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/deletefaq', faqId, { headers: headers })
			.map(res => res);
	}

	getEmployerJobs(data): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/generatereportforparticularemployer', data, { headers: headers })
			.map(res => res);
	}

	getJobseekerContracts(data): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/generatetimesheetreportforparticularjobseeker', data, { headers: headers })
			.map(res => res);
	}

	getMatrixOffDays(args): Observable<any> {
		// let employerIds = args;
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/fetchoffdayssheetforparticularjob', args, { headers: headers });
	}



	getExtraUserProfileDetails(userid): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/employer/fetchsupervisor', userid, { headers: headers })
			.map(res => res);
	}

	updateUserProfile(employerData): Observable<any> {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/employer/updatesupervisor', employerData, { headers: headers })
			.map(res => res);
	}




}

