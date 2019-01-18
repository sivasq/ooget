import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {
	constructor(private httpCancelService: HttpCancelService) { }

	intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		return next.handle(req).takeUntil(this.httpCancelService.onCancelPendingRequests())
	}
}

@Injectable()
export class HttpCancelService {
	private cancelPendingRequests$ = new Subject<void>()

	constructor() { }

	/** Cancels all pending Http requests. */
	public cancelPendingRequests() {
		this.cancelPendingRequests$.next()
	}

	public onCancelPendingRequests() {
		return this.cancelPendingRequests$.asObservable()
	}

}

@Injectable()
export class ApiCallService {
	public baseUrl;

	constructor(private http: HttpClient, private config: ConfigService) {
		this.baseUrl = config.base_url;
	}

	getHomePageContents(): Observable<any> {
		let dummyData = '';
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})
		return this.http.post(this.baseUrl + '/fetchoogethome', dummyData, { headers: headers })
			.map(res => res)
	}

	getFeaturedEmployers(): Observable<any> {
		let dummyData = '';
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})
		return this.http.post(this.baseUrl + '/fetchfeaturedimages', dummyData, { headers: headers })
			.map(res => res)
	}

	getUserDetails(userId): Observable<any> {
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})

		return this.http.post(this.baseUrl + '/fetchemailwithidnoauth', userId, { headers: headers })
	}

	resetPassword(data): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this.baseUrl + '/changepasswordnoauth', data, { headers: headers })
	}

	checkEmail(email) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})
		return this.http.post<any>(this.baseUrl + '/uniquejobseeker', email, { headers: headers })
			.map(res => res)
	}

	checkMobile(mobile) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})
		return this.http.post<any>(this.baseUrl + '/uniquemobileno', mobile, { headers: headers })
			.map(res => res)
	}

	checkNricFin(nricfinno) {
		let dummyData = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			})
		return this.http.post<any>(this.baseUrl + '/uniquenricfinno', nricfinno, { headers: headers })
			.map(res => res)
	}

	postRegData(regData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this.baseUrl + '/register', regData, { headers: headers })
	}

	postLoginData(authData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this.baseUrl + '/login', authData, { headers: headers })
	}

	postFogotPasswordData(userData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this.baseUrl + '/forgetpassword', userData, { headers: headers })
	}

	getSingleEmployersJobsList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/jobslist', employerIds, { headers: headers })
	}

	getMatchedJobsList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/myjobs', employerIds, { headers: headers })
	}

	getAppliedJobsList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/fetchappliedjobs', employerIds, { headers: headers })
	}

	getMyJobOffersList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		// return this.http.post(this.baseUrl + '/job/fetchselectedjobs', employerIds, { headers: headers })
		return this.http.post(this.baseUrl + '/job/fetchofferedjobs', employerIds, { headers: headers })
	}

	getContractJobsList(): Observable<any> {
		let employerIds = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/contractslist', employerIds, { headers: headers })
	}

	getContractDetails(contractid): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/fetchparticularcontract', contractid, { headers: headers })
	}

	getContractTodayTimesheet(contractid): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/fetchpunchingtimesheet', contractid, { headers: headers })
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

	getProfileDetails(): Observable<any> {
		let jobSeekerId = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/fetchprofiledetails', jobSeekerId, { headers: headers })
	}

	jobSeekerIdProofUpdate(jobSeekerProfileData, userID): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'id': userID
			})
		return this.http.post(this.baseUrl + '/updateidproofnoauth', jobSeekerProfileData, { headers: headers })
	}

	jobSeekerProfileUpdate(jobSeekerProfileData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/updateprofiledetails', jobSeekerProfileData, { headers: headers })
	}

	jobseekerPasswordUpdate(jobSeekerPasswordData): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/changepassword', jobSeekerPasswordData, { headers: headers })
	}

	uploadProfileDocs(formData): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
			})
		return this.http.post(this.baseUrl + '/updateimageandproof', formData, { headers: headers })
	}

	// sendJobApplication(jobId): Observable<any> {
	// 	//var authDatas = JSON.stringify(authData);
	// 	let userToken = localStorage.getItem('ogToken');
	// 	let headers = new HttpHeaders(
	// 		{
	// 			'Content-Type': 'application/json',
	// 			'Access-Control-Allow-Origin': '*',
	// 			'token': userToken
	// 		})
	// 	return this.http.post(this.baseUrl + '/job/applytojob', jobId, { headers: headers })
	// }

	sendJobApplication(jobId): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/newapplytojob', jobId, { headers: headers })
	}

	acceptOffer(jobId): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/confirmjob', jobId, { headers: headers })
	}

	rejectOffer(jobId): Observable<any> {
		//var authDatas = JSON.stringify(authData);
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/job/rejectjob', jobId, { headers: headers })
	}

	punchIn(contractid): Observable<any> {
		var jobId = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/punchin', contractid, { headers: headers })
	}

	punchOut(contractid): Observable<any> {
		var jobId = '';
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/punchout', contractid, { headers: headers })
	}

	sendPunchLateReason(reason): Observable<any> {
		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
		return this.http.post(this.baseUrl + '/contract/updatelatereason', reason, { headers: headers })
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
}
