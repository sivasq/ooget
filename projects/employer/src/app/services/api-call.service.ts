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

	checkUEN(uen) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})
		return this.http.post<any>(this.baseUrl + '/unqiuecompany', uen, { headers: headers })
			.map(res => res)
	}

	checkEmail(email) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})
		return this.http.post<any>(this.baseUrl + '/unqiueemployer', email, { headers: headers })
			.map(res => res)
	}

	postLoginData(authData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this.baseUrl + '/login', authData, { headers: headers })
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
		return this.http.post(this.baseUrl + '/job/jobslist', employerIds, { headers: headers })
	}

	getTermsAcceptanceStatus(employerData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/fetchtermsstatus', employerData, { headers: headers })
	}

	termsAcceptanceUpdate(termData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/updatetermsstatus', termData, { headers: headers })
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
		return this.http.post(this.baseUrl + '/job/changejobstatus', jobStatus, { headers: headers })
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

	selectApplication(ids): Observable<any> {
		// let jobStatus = jobStatus;
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/selectcandidate', ids, { headers: headers })
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

	postRegData(regData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this.baseUrl + '/register', regData, { headers: headers })
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

	getUserProfileDetails(): Observable<any> {
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

	uploadUserProfilePic(formData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
			})
		return this.http.post(this.baseUrl + '/updateprofileimage', formData, { headers: headers })
	}

	getCompanyDetails(employerId): Observable<any> {
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
}
