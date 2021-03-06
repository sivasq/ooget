import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

@Injectable()
export class ApiCallService {
	private _baseUrl;
	private _token;

	constructor(private http: HttpClient, private config: ConfigService) {
		this._baseUrl = config.base_url;
		// this._token = localStorage.getItem('ogToken');
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
		headers['token'] = localStorage.getItem('ogToken');
		// headers['Token'] = this._token;
		return headers;
	}

	createAuthorizationHeaderFormData() {
		const headers = {};
		// headers['Accept'] = 'application/json';
		headers['token'] = localStorage.getItem('ogToken');
		// headers['token'] = this._token;
		return headers;
	}

	createUrlParams(moduleName, modeName) {
		const params = {};
		params['module'] = moduleName;
		params['mode'] = modeName;
		return params;
	}

	// ==================================== Services ==================================== //

	// Check Unique Email
	checkEmailExists(email): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'CheckEmail');
		return this.http.post(this._baseUrl, email, { headers: headers, params: params });
	}

	// Check UEN Number Exists for Employer
	checkUENExists(uen): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Employer', 'CheckCompanyUenExist');
		return this.http.post(this._baseUrl, uen, { headers: headers, params: params });
	}

	// Create New Employer with Default User
	registerEmployer(employerData): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Employer', 'CreateEmployer');
		return this.http.post(this._baseUrl, employerData, { headers: headers, params: params });
	}

	// User Login Auth Check
	authLogin(authData): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'Login');
		return this.http.post(this._baseUrl, authData, { headers: headers, params: params });
	}

	// Get Current User Profile Details
	getCurrentUserProfileDetails(): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'GetUser');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Upload Current User Profile Image
	uploadCurrentUserProfilePic(formData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'ImageUpload');
		return this.http.post(this._baseUrl, formData, { headers: headers, params: params });
	}

	// Get Particular Employers
	getEmployer(): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Employer', 'GetEmployer');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Update Employer
	updateEmployer(employerData): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Employer', 'UpdateEmployer');
		return this.http.post(this._baseUrl, employerData, { headers: headers, params: params });
	}

	// Get users list
	getListOfUsers(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'GetUserList');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Get User Profile Details
	getUserProfileDetails(userid): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'GetUser');
		return this.http.post(this._baseUrl, userid, { headers: headers, params: params });
	}

	// Upload Extra User Profile Image
	uploadUserProfilePic(formData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'ImageUpload');
		return this.http.post(this._baseUrl, formData, { headers: headers, params: params });
	}

	// Create Extra User
	createExtraUser(userDetails): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'CreateUser');
		return this.http.post(this._baseUrl, userDetails, { headers: headers, params: params });
	}

	// Update Extra User
	updateExtraUser(userDetails): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Users', 'UpdateUser');
		return this.http.post(this._baseUrl, userDetails, { headers: headers, params: params });
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
		return this.http.post(this._baseUrl, hiringStatus, { headers: headers, params: params })
	}

	// Get Job Details
	getJobDetails(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetJobDetails');
		return this.http.post(this._baseUrl, jobId, { headers: headers, params: params });
	}

	// Get Contractors List For Job
	getJobContractors(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetAppliedList');
		return this.http.post(this._baseUrl, jobId, { headers: headers, params: params });
	}

	// Get Job Contracts List
	getJobContractsList(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetContractList');
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

	// Get All Jobseekers
	getAllJobseekers(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Jobseeker', 'GetJobseeker');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Reports
	// Get Jobseeker OffDays Report
	getMatrixOffDays(args): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Timesheet', 'GetJobContractTimesheetList');
		return this.http.post(this._baseUrl, args, { headers: headers, params: params });
	}

	// Get Jobseeker Contracts
	getJobseekerContracts(data): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Timesheet', 'GetJobseekerContractTimesheetList');
		return this.http.post(this._baseUrl, data, { headers: headers, params: params });
	}

	// Get Timesheet List for Single Contractor
	GetJobTimeSheetList(contractId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Timesheet', 'GetJobTimeSheetList');
		return this.http.post(this._baseUrl, contractId, { headers: headers, params: params });
	}

	// Get single Employer contract & timesheet Details
	getEmployerJobs(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Timesheet', 'GetEmployerContractTimesheetList');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Update Job
	jobUpdateToEmployer(employerJobData): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'UpdateJob');
		return this.http.post(this._baseUrl, employerJobData, { headers: headers, params: params });
	}

	deleteUserProfile(userid): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Users', 'DeleteUser');
		return this.http.post(this._baseUrl, userid, { headers: headers, params: params });
	}

	getPendingJobApplications(): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetAppliedList');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	getAppliedCandidates(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'GetAppliedList');
		return this.http.post(this._baseUrl, jobId, { headers: headers, params: params });
	}

	selectApplication(applicationId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'JobOffered');
		return this.http.post(this._baseUrl, applicationId, { headers: headers, params: params });
	}

	rejectApplication(applicationId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'ApplicationRejected');
		return this.http.post(this._baseUrl, applicationId, { headers: headers, params: params });
	}

	getJobSeekerDetails(jobseekerId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Jobseeker', 'GetJobseeker');
		return this.http.post(this._baseUrl, jobseekerId, { headers: headers, params: params });
	}

	deleteJob(jobId): Observable<any> {
		const headers = this.createAuthorizationHeaderFormData();
		const params = this.createUrlParams('Job', 'DeleteJob');
		return this.http.post(this._baseUrl, jobId, { headers: headers, params: params });
	}





	// ====================================================
	getUserDetails(userId): Observable<any> {
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})

		return this.http.post(this._baseUrl + '/fetchemailwithidnoauth', userId, { headers: headers })
	}

	resetPassword(data): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this._baseUrl + '/changepasswordnoauth', data, { headers: headers })
	}

	getTermsAcceptanceStatus(employerData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/fetchtermsstatus', employerData, { headers: headers })
	}

	termsAcceptanceUpdate(termData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/updatetermsstatus', termData, { headers: headers })
	}

	verifyTimeSheets(timesheetIds): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/verifytimesheet', timesheetIds, { headers: headers })
			.map(res => res)
	}

	generatepayroll(contractid): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/generatepayroll', contractid, { headers: headers })
			.map(res => res)
	}

	timesheetAdjust(verifiedTime): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/verifypunch', verifiedTime, { headers: headers })
			.map(res => res)
	}

	updatePunchin(verifiedTime): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/verifypunchin', verifiedTime, { headers: headers })
			.map(res => res)
	}

	updatePunchout(verifiedTime): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/verifypunchout', verifiedTime, { headers: headers })
			.map(res => res)
	}

	getAllOffDays(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/fetchoffdays', contractId, { headers: headers })
	}

	addOffDay(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/addoffday', Data, { headers: headers })
	}

	removeOffDay(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/removeoffday', Data, { headers: headers })
	}

	timesheetNotesUpdate(notesData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/updatenotes', notesData, { headers: headers })
			.map(res => res)
	}

	updateProfile(employerData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/updateownprofile', employerData, { headers: headers })
			.map(res => res)
	}

	// Dummy
	userAdd(employerData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/createemployer', employerData, { headers: headers })
			.map(res => res)
	}

	getRolesAndPermissions(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/fetchownroles', dummyData, { headers: headers })
	}
}
