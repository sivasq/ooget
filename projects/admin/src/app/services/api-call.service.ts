import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

@Injectable()
export class ApiCallService {
	public baseUrl;
	constructor(private http: HttpClient, private config: ConfigService) {
		this.baseUrl = config.base_url;
	}

	createAuthorizationHeaderJson(headers: HttpHeaders) {
		const userToken = localStorage.getItem('ogToken');
		headers.set('Content-Type', 'application/json');
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Accept', 'application/json');
		headers.set('token', userToken);
	}

	createAuthorizationHeaderFormData(headers: HttpHeaders) {
		const userToken = localStorage.getItem('ogToken');
		headers.set('Content-Type', 'multipart/form-data');
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Accept', 'application/json');
		headers.set('token', userToken);
	}

	createUrl(params: HttpParams, module, mode) {
		params.set('module', module);
		params.set('mode', mode);
	}

	// ==================================== Services ==================================== //

	authLogin(authData): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderJson(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Users', 'Login');
		return this.http.post(this.baseUrl, authData, { headers: headers, params: params });
	}

	// Check Unique Email
	checkEmailExists(email): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderJson(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Users', 'CheckEmail');
		return this.http.post(this.baseUrl, email, { headers: headers, params: params });
	}

	// Create Extra User
	createExtraUser(userDetails): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderJson(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Users', 'CreateUser');
		return this.http.post(this.baseUrl, userDetails, { headers: headers, params: params });
	}

	// Upload Current User Profile Image
	uploadCurrentUserProfilePic(formData): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderFormData(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Users', 'ImageUpload');
		return this.http.post(this.baseUrl, formData, { headers: headers, params: params });
	}

	// Remove Current User Profile Image
	RemoveCurrentUserProfilePic(): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderFormData(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Users', 'ImageDelete');
		return this.http.post(this.baseUrl, {}, { headers: headers, params: params });
	}

	// Get Current User Profile Details
	getCurrentUserProfileDetails(): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderFormData(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Users', 'ImageDelete');
		return this.http.post(this.baseUrl, {}, { headers: headers, params: params });
	}

	// Check UEN Number Exists for Employer
	checkUENExists(uen): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderFormData(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Employer', 'CheckCompanyUenExist');
		return this.http.post(this.baseUrl, uen, { headers: headers });
	}

	// Check Company Code Exists for Employer
	checkCompanyCodeExists(companyCode): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeaderFormData(headers);

		const params = new HttpParams();
		this.createUrl(params, 'Employer', 'CheckCompanyCodeExist');
		return this.http.post(this.baseUrl, companyCode, { headers: headers });
	}




	adminProfileUpdate(adminProfileData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/updateprofiledetails', adminProfileData, { headers: headers });
	}

	getHomePageContents(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/fetchoogethome', dummyData, { headers: headers })
			.map(res => res);
	}

	getFeaturedEmployers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/fetchfeaturedimages', dummyData, { headers: headers })
			.map(res => res);
	}

	removeFeaturedEmployer(imageId): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/deletefeaturedimage', imageId, { headers: headers })
			.map(res => res);
	}

	homePageContentUpdate(homePageContent): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/updateoogethome', homePageContent, { headers: headers });
	}

	getAllEmployers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/employerslist', dummyData, { headers: headers })
			.map(res => res);
	}

	getAllJobseekersList(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/jobseeker/fetchalljobseekersnew', dummyData, { headers: headers })
			.map(res => res);
	}

	getAllJobseekers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/jobseeker/fetchalljobseekers', dummyData, { headers: headers })
			.map(res => res);
	}

	getPendingJobseekers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/jobseeker/fetchpendingjobseekers', dummyData, { headers: headers })
			.map(res => res);
	}

	getJobseekersTC(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/fetchjobseekerterms', dummyData, { headers: headers })
			.map(res => res);
	}

	updateJobseekersTC(terms): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/updatejobseekerterms', terms, { headers: headers })
			.map(res => res);
	}

	uploadTermsDoc(formData, comapnyId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
				'companyid': comapnyId
			});
		return this.http.post(this.baseUrl + '/employer/updatetermsandconditions', formData, { headers: headers })
			.map(res => res);
	}

	getEmployerDetails(employerId): Observable<any> {
		let employerIds = employerId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/viewparticularemployer', employerIds, { headers: headers });
	}

	activateJob(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/changejobstatus', jobStatus, { headers: headers });
	}

	addPayInfoToJob(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/updatejobstatuswithpayinfo', jobStatus, { headers: headers });
	}

	closeJobHiring(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/changehiringstatus', jobStatus, { headers: headers });
	}

	changeEmployerStatus(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/updateactivestatus', jobStatus, { headers: headers });
	}

	changeJobseekerStatus(jobseekerStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/jobseeker/updateactivestatus', jobseekerStatus, { headers: headers });
	}

	employerAdd(employerData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/createemployer', employerData, { headers: headers })
			.map(res => res);
	}

	employerUpdate(employerData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/updatecompanydetails', employerData, { headers: headers })
			.map(res => res);
	}

	updateCompanyCode(companyCode): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/updatecompanycode', companyCode, { headers: headers })
			.map(res => res);
	}

	getSingleEmployersJobsList(employerId): Observable<any> {
		let employerIds = employerId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/jobslistbyemployer', employerIds, { headers: headers });
	}

	getAppliedCandidates(jobId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/fetchparticularjobappliedjobseekers', jobId, { headers: headers });
	}

	selectApplication(ids): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/offerjob', ids, { headers: headers });
	}

	getJobSeekerDetails(jobseekerId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/fetchparticularjobseeker', jobseekerId, { headers: headers });
	}

	toggleIdProofEditable(data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/jobseeker/updateidproofeditable', data, { headers: headers });
	}

	toggleNricFinEditable(data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/jobseeker/updatenriceditable', data, { headers: headers });
	}

	getPendingJobsList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/fetchpendingjobs', employerIds, { headers: headers });
	}

	getLiveJobsList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/fetchlivejobs', employerIds, { headers: headers });
	}

	jobAddToEmployer(employerJobData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/createjob', employerJobData, { headers: headers })
			.map(res => res);
	}

	jobUpdateToEmployer(employerJobData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/updatejob', employerJobData, { headers: headers })
			.map(res => res);
	}

	getJobDetails(jobId): Observable<any> {
		let jobIds = jobId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/job/fetchparticularjob', jobIds, { headers: headers });
	}

	getContractDetails(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/fetchparticularcontract', contractId, { headers: headers });
	}

	getTimesheetDetails(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/fetchtimesheetdetails', contractId, { headers: headers });
	}

	getAllOffDays(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/fetchoffdays', contractId, { headers: headers });
	}

	getAllPayrollsInContract(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/fetchpayrollforparticularcontract', contractId, { headers: headers });
	}

	addOffDay(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/addoffday', Data, { headers: headers });
	}

	removeOffDay(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/removeoffday', Data, { headers: headers });
	}

	removeContractorFromJob(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/removeoffday', Data, { headers: headers });
	}

	getAllPHHolidays(): Observable<any> {
		let dummydata;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/fetchholidaylist', dummydata, { headers: headers });
	}

	getJobContractors(jobId): Observable<any> {
		let jobIds = jobId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/contractslist', jobIds, { headers: headers });
	}

	timesheetAdjust(verifiedTime): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/verifypunch', verifiedTime, { headers: headers })
			.map(res => res);
	}

	updatePunchin(verifiedTime): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/verifypunchin', verifiedTime, { headers: headers })
			.map(res => res);
	}

	updatePunchout(verifiedTime): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/verifypunchout', verifiedTime, { headers: headers })
			.map(res => res);
	}

	timesheetNotesUpdate(notesData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/updatenotes', notesData, { headers: headers })
			.map(res => res);
	}

	verifyTimeSheets(timesheetIds): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/verifytimesheet', timesheetIds, { headers: headers })
			.map(res => res);
	}

	generatepayroll(contractid): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/generatepayroll', contractid, { headers: headers })
			.map(res => res);
	}

	faqAdd(faqData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/addfaq', faqData, { headers: headers })
			.map(res => res);
	}

	getAllFaqItems(): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let dummy;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/fetchfaqs', dummy, { headers: headers })
			.map(res => res);
	}

	faqUpdate(faqData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/updatefaq', faqData, { headers: headers })
			.map(res => res);
	}

	faqDelete(faqId): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/deletefaq', faqId, { headers: headers })
			.map(res => res);
	}

	getEmployerJobs(data): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/generatereportforparticularemployer', data, { headers: headers })
			.map(res => res);
	}

	getJobseekerContracts(data): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/generatetimesheetreportforparticularjobseeker', data, { headers: headers })
			.map(res => res);
	}

	getMatrixOffDays(args): Observable<any> {
		// let employerIds = args;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/contract/fetchoffdayssheetforparticularjob', args, { headers: headers });
	}

	getListOfUsers(comapnyid): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/listsupervisors', comapnyid, { headers: headers })
			.map(res => res);
	}

	getExtraUserProfileDetails(userid): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/fetchsupervisor', userid, { headers: headers })
			.map(res => res);
	}

	updateUserProfile(employerData): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/updatesupervisor', employerData, { headers: headers })
			.map(res => res);
	}



	deleteUserProfile(employerData): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this.baseUrl + '/employer/deletesupervisor', employerData, { headers: headers })
			.map(res => res);
	}
}
