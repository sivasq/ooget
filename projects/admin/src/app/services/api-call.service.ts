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

	// Get User Profile Details
	getUserProfileDetails(userid): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'GetUser');
		return this.http.post(this._baseUrl, userid, { headers: headers, params: params });
	}

	// Delete User Profile Details
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

	// Add New Job
	addNewJob(JobDetails): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'CreateJob');
		return this.http.post(this._baseUrl, JobDetails, { headers: headers, params: params });
	}

	// Get Single Employers All Jobs List
	getSingleEmployersJobsList(employerId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetAllJobList');
		return this.http.post(this._baseUrl, employerId, { headers: headers, params: params });
	}

	// Change Job Status
	changeJobHiringStatus(hiringStatus): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'ChangeRecruitmentOpen');
		return this.http.post(this._baseUrl, hiringStatus, { headers: headers, params: params });
	}

	// Get Job Details
	getJobDetails(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetJobDetails');
		return this.http.post(this._baseUrl, jobId, { headers: headers, params: params });
	}

	// Get Live Jobs List
	getLiveJobsList(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetLiveJobList');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Get Pending Jobs List
	getPendingJobsList(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetPendingJobList');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Get All Jobseekers
	getAllJobseekers(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Jobseeker', 'GetJobseeker');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Get Pending Jobseekers
	getPendingJobseekers(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Jobseeker', 'GetJobseeker');
		return this.http.post(this._baseUrl, { 'pending': true }, { headers: headers, params: params });
	}

	// Toggle JobSeeker Status
	changeJobseekerStatus(jobseekerStatus): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Jobseeker', 'UpdateJobseekerStatus');
		return this.http.post(this._baseUrl, jobseekerStatus, { headers: headers, params: params });
	}

	// Get Jobseeker Details
	getJobSeekerDetails(jobseekerId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Jobseeker', 'GetJobseeker');
		return this.http.post(this._baseUrl, jobseekerId, { headers: headers, params: params });
	}

	// Get Job Applied Candidate List
	getAppliedCandidates(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetAppliedList');
		return this.http.post(this._baseUrl, jobId, { headers: headers, params: params });
	}

	// Get Jobseeker Application Details For Particular Job
	getJobseekerApplicationDetails(jobseekerId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetAppliedList');
		return this.http.post(this._baseUrl, jobseekerId, { headers: headers, params: params });
	}

	// Offer A Job
	selectApplication(applicationId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'JobOffered');
		return this.http.post(this._baseUrl, applicationId, { headers: headers, params: params });
	}

	// Get Contractors List For Job
	getJobContractors(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetAppliedList');
		return this.http.post(this._baseUrl, jobId, { headers: headers, params: params });
	}

	// Get Jobseeker Contract Details
	getContractDetails(contractId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetContractList');
		return this.http.post(this._baseUrl, contractId, { headers: headers, params: params });
	}

	// Get Timesheet List for Single Contractor
	getTimesheetDetails(contractId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Timesheet', 'GetTimeSheet');
		return this.http.post(this._baseUrl, contractId, { headers: headers, params: params });
	}

	// Get Roster Off Days
	getAllOffDays(contractId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Timesheet', 'GetTimeSheet');
		return this.http.post(this._baseUrl, contractId, { headers: headers, params: params });
	}

	// Toggle Roster Day Type
	addOffDay(Data): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Timesheet', 'TimesheetSetHoliday');
		return this.http.post(this._baseUrl, Data, { headers: headers, params: params });
	}

	// Add FAQ
	faqAdd(faqData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Faq', 'CreateFaq');
		return this.http.post(this._baseUrl, faqData, { headers: headers, params: params });
	}

	// Get All Faq
	getAllFaqItems(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Faq', 'GetFaq');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Get Single Faq
	getFaqItemDetails(faqId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Faq', 'GetFaq');
		return this.http.post(this._baseUrl, faqId, { headers: headers, params: params });
	}

	// Update FAQ
	faqUpdate(faqData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Faq', 'UpdateFaq');
		return this.http.post(this._baseUrl, faqData, { headers: headers, params: params });
	}

	// Delete FAQ
	faqDelete(faqId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Faq', 'DeleteFaq');
		return this.http.post(this._baseUrl, faqId, { headers: headers, params: params });
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

