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
		return this.http.post(this.baseUrl + '/job/viewparticularjob', jobIds, { headers: headers })
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
		return this.http.post(this.baseUrl + '/job/viewparticularjobseeker', jobseekerId, { headers: headers })
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

}
