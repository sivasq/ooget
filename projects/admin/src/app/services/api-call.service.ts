import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

@Injectable()
export class ApiCallService {
	public baseUrl;
	constructor(private http: HttpClient, private config: ConfigService) {
		this.baseUrl = config.base_url;
	}

	postLoginData(authData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this.baseUrl + '/login', authData, { headers: headers })
	}

	checkUEN(uen) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post<any>(this.baseUrl + '/employer/unqiuecompany', uen, { headers: headers })
			.map(res => res)
	}

	getAdminProfileDetails(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/fetchprofiledetails', dummyData, { headers: headers })
			.map(res => res)
	}

	adminProfileUpdate(adminProfileData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/updateprofiledetails', adminProfileData, { headers: headers })
	}

	uploadAdminProfilePic(formData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
			})
		return this.http.post(this.baseUrl + '/updateprofileimage', formData, { headers: headers })
	}

	getHomePageContents(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/fetchoogethome', dummyData, { headers: headers })
			.map(res => res)
	}

	getFeaturedEmployers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/fetchfeaturedimages', dummyData, { headers: headers })
			.map(res => res)
	}

	removeFeaturedEmployer(imageId): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/deletefeaturedimage', imageId, { headers: headers })
			.map(res => res)
	}

	homePageContentUpdate(homePageContent): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/updateoogethome', homePageContent, { headers: headers })
	}

	checkAdminEmail(email) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post<any>(this.baseUrl + '/uniqueadminemail', email, { headers: headers })
			.map(res => res)
	}

	checkEmail(email) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post<any>(this.baseUrl + '/employer/unqiueemployer', email, { headers: headers })
			.map(res => res)
	}

	getAllEmployers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/employer/employerslist', dummyData, { headers: headers })
			.map(res => res)
	}

	getAllJobseekers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/jobseeker/fetchalljobseekers', dummyData, { headers: headers })
			.map(res => res)
	}

	getPendingJobseekers(): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/jobseeker/fetchpendingjobseekers', dummyData, { headers: headers })
			.map(res => res)
	}

	uploadTermsDoc(formData, comapnyId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
				'companyid': comapnyId
			})
		return this.http.post(this.baseUrl + '/employer/updatetermsandconditions', formData, { headers: headers })
			.map(res => res)
	}

	getEmployerDetails(employerId): Observable<any> {
		let employerIds = employerId;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/employer/viewparticularemployer', employerIds, { headers: headers })
	}

	activateJob(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/changejobstatus', jobStatus, { headers: headers })
	}

	addPayInfoToJob(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/updatejobstatuswithpayinfo', jobStatus, { headers: headers })
	}

	closeJobHiring(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/changehiringstatus', jobStatus, { headers: headers })
	}

	changeEmployerStatus(jobStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/employer/updateactivestatus', jobStatus, { headers: headers })
	}

	changeJobseekerStatus(jobseekerStatus): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/jobseeker/updateactivestatus', jobseekerStatus, { headers: headers })
	}

	employerAdd(employerData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/employer/createemployer', employerData, { headers: headers })
			.map(res => res)
	}

	employerUpdate(employerData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/employer/updatecompanydetails', employerData, { headers: headers })
			.map(res => res)
	}

	updateCompanyCode(companyCode): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/employer/updatecompanycode', companyCode, { headers: headers })
			.map(res => res)
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
		return this.http.post(this.baseUrl + '/job/jobslistbyemployer', employerIds, { headers: headers })
	}

	getAppliedCandidates(jobId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/fetchparticularjobappliedjobseekers', jobId, { headers: headers })
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
		return this.http.post(this.baseUrl + '/job/offerjob', ids, { headers: headers })
	}

	getJobSeekerDetails(jobseekerId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/fetchparticularjobseeker', jobseekerId, { headers: headers })
	}

	toggleIdProofEditable(data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/jobseeker/updateidproofeditable', data, { headers: headers })
	}

	toggleNricFinEditable(data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/jobseeker/updatenriceditable', data, { headers: headers })
	}

	getPendingJobsList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/fetchpendingjobs', employerIds, { headers: headers })
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
		return this.http.post(this.baseUrl + '/job/createjob', employerJobData, { headers: headers })
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
		return this.http.post(this.baseUrl + '/job/updatejob', employerJobData, { headers: headers })
			.map(res => res)
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
		return this.http.post(this.baseUrl + '/job/fetchparticularjob', jobIds, { headers: headers })
	}

	getContractDetails(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/fetchparticularcontract', contractId, { headers: headers })
	}

	getTimesheetDetails(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/fetchtimesheetdetails', contractId, { headers: headers })
	}

	getAllOffDays(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/fetchoffdays', contractId, { headers: headers })
	}

	getAllPayrollsInContract(contractId): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/fetchpayrollforparticularcontract', contractId, { headers: headers })
	}

	addOffDay(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/addoffday', Data, { headers: headers })
	}

	removeOffDay(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/removeoffday', Data, { headers: headers })
	}

	removeContractorFromJob(Data): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/removeoffday', Data, { headers: headers })
	}

	getAllPHHolidays(): Observable<any> {
		let dummydata;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/fetchholidaylist', dummydata, { headers: headers })
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
		return this.http.post(this.baseUrl + '/contract/contractslist', jobIds, { headers: headers })
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
		return this.http.post(this.baseUrl + '/contract/verifypunch', verifiedTime, { headers: headers })
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
		return this.http.post(this.baseUrl + '/contract/verifypunchin', verifiedTime, { headers: headers })
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
		return this.http.post(this.baseUrl + '/contract/verifypunchout', verifiedTime, { headers: headers })
			.map(res => res)
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
		return this.http.post(this.baseUrl + '/contract/updatenotes', notesData, { headers: headers })
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
		return this.http.post(this.baseUrl + '/contract/verifytimesheet', timesheetIds, { headers: headers })
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
		return this.http.post(this.baseUrl + '/contract/generatepayroll', contractid, { headers: headers })
			.map(res => res)
	}

	faqAdd(faqData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/addfaq', faqData, { headers: headers })
			.map(res => res)
	}

	getAllFaqItems(): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let dummy;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/fetchfaqs', dummy, { headers: headers })
			.map(res => res)
	}

	faqUpdate(faqData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/updatefaq', faqData, { headers: headers })
			.map(res => res)
	}

	faqDelete(faqId): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/deletefaq', faqId, { headers: headers })
			.map(res => res)
	}

	getEmployerJobs(data): Observable<any> {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/generatereportforparticularemployer', data, { headers: headers })
			.map(res => res)
	}
}
