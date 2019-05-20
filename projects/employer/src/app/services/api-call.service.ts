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
		headers['Content-Type'] = 'multipart/form-data';
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
	createEmployer(employerData): Observable<any> {
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






	getSingleEmployersJobsList(employerId): Observable<any> {
		let employerIds = employerId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/jobslist', employerIds, { headers: headers })
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

	closeJob(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/changejobstatus', jobStatus, { headers: headers })
	}

	getJobDetails(jobId): Observable<any> {
		let jobIds = jobId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/fetchparticularjob', jobIds, { headers: headers })
	}

	getJobContractors(jobId): Observable<any> {
		let jobIds = jobId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/contractslist', jobIds, { headers: headers })
	}

	getAppliedCandidates(jobId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/fetchparticularjobappliedjobseekers', jobId, { headers: headers })
	}

	getPendingJobApplications(): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let dummy = '';
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/fetchalljobappliedjobseekers', dummy, { headers: headers })
	}

	getJobSeekerDetails(jobseekerId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/fetchparticularjobseeker', jobseekerId, { headers: headers })
	}

	selectApplication(ids): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/offerjob', ids, { headers: headers })
	}

	jobAddToEmployer(employerJobData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/createjob', employerJobData, { headers: headers })
			.map(res => res)
	}

	jobUpdateToEmployer(employerJobData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/job/updatejob', employerJobData, { headers: headers })
			.map(res => res)
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

	getContractDetails(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/fetchparticularcontract', contractId, { headers: headers })
	}

	getTimesheetDetails(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/contract/fetchtimesheetdetails', contractId, { headers: headers })
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

	createsupervisor(employerData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/createsupervisor', employerData, { headers: headers })
			.map(res => res)
	}

	updateUserProfile(employerData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/updatesupervisor', employerData, { headers: headers })
			.map(res => res)
	}

	deleteUserProfile(employerData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/deletesupervisor', employerData, { headers: headers })
			.map(res => res)
	}

	// Dummy
	userAdd(employerData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
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



	getUserProfileDetails(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/fetchownprofile', dummyData, { headers: headers })
			.map(res => res)
	}

	uploadUserProfilePic(formData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
			})
		return this.http.post(this._baseUrl + '/updateprofileimage', formData, { headers: headers })
	}



	getExtraUserProfileDetails(userid): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/fetchsupervisor', userid, { headers: headers })
			.map(res => res)
	}

	getListOfUsers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this._baseUrl + '/listsupervisors', dummyData, { headers: headers })
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
