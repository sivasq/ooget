import { Injectable, forwardRef, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line: import-blacklist
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ConfigService } from './config.service';

@Injectable()
export class HttpCancelService {
	private cancelPendingRequests$ = new Subject<void>();

	constructor() { }

	/** Cancels all pending Http requests. */
	public cancelPendingRequests() {
		this.cancelPendingRequests$.next();
	}

	public onCancelPendingRequests() {
		return this.cancelPendingRequests$.asObservable();
	}
}

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {
	constructor(@Inject(forwardRef(() => HttpCancelService)) private httpCancelService: HttpCancelService) { }

	intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		return next.handle(req).takeUntil(this.httpCancelService.onCancelPendingRequests());
	}
}

@Injectable()
export class InternetInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// check to see if there's internet
		if (!window.navigator.onLine) {
			// if there is no internet, throw a HttpErrorResponse error
			// since an error is thrown, the function will terminate here
			return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.' }));

		} else {
			// else return the normal request
			return next.handle(request);
		}

		// const authReq = request.clone({
		// 	headers: request.headers.set('Authorization', "testing")
		// });

		// // send cloned request with header to the next handler.
		// return next.handle(authReq);
	}
}

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

	// Check Email Exists
	checkUniqueEmail(email): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Jobseeker', 'CheckEmail');
		return this.http.post(this._baseUrl, email, { headers: headers, params: params });
	}

	// Register Jobseeker
	createJobseeker(jobseekerData): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Jobseeker', 'CreateJobseeker');
		return this.http.post(this._baseUrl, jobseekerData, { headers: headers, params: params });
	}

	// User Login Auth Check
	authLogin(authData): Observable<any> {
		const headers = this.createNonAuthorizationHeaderJson();
		const params = this.createUrlParams('Jobseeker', 'Login');
		return this.http.post(this._baseUrl, authData, { headers: headers, params: params });
	}

	// Get Current User Profile Details
	getProfileDetails(): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Jobseeker', 'GetJobseeker');
		return this.http.post(this._baseUrl, {}, { headers: headers, params: params });
	}

	// Update Current User Profile
	updateProfileDetails(ProfileData): Observable<any> {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Jobseeker', 'UpdateJobseeker');
		return this.http.post(this._baseUrl, ProfileData, { headers: headers, params: params });
	}














	getHomePageContents(): Observable<any> {
		const dummyData = '';
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			});
		return this.http.post(this._baseUrl + '/fetchoogethome', dummyData, { headers: headers })
			.map(res => res);
	}

	getFeaturedEmployers(): Observable<any> {
		const dummyData = '';
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			});
		return this.http.post(this._baseUrl + '/fetchfeaturedimages', dummyData, { headers: headers })
			.map(res => res);
	}

	getUserDetails(userId): Observable<any> {
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			});

		return this.http.post(this._baseUrl + '/fetchemailwithidnoauth', userId, { headers: headers });
	}

	resetPassword(data): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this._baseUrl + '/changepasswordnoauth', data, { headers: headers });
	}

	checkEmail(email) {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			});
		return this.http.post<any>(this._baseUrl + '/uniquejobseeker', email, { headers: headers })
			.map(res => res);
	}

	checkMobile(mobile) {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			});
		return this.http.post<any>(this._baseUrl + '/uniquemobileno', mobile, { headers: headers })
			.map(res => res);
	}

	checkNricFin(nricfinno) {
		const dummyData = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			});
		return this.http.post<any>(this._baseUrl + '/uniquenricfinno', nricfinno, { headers: headers })
			.map(res => res);
	}

	postRegData(regData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this._baseUrl + '/register', regData, { headers: headers });
	}

	postLoginData(authData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this._baseUrl + '/login', authData, { headers: headers });
	}

	postFogotPasswordData(userData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const headers = new HttpHeaders()
			.append('Content-Type', 'application/json')
			.append('Access-Control-Allow-Origin', '*');
		return this.http.post(this._baseUrl + '/forgetpassword', userData, { headers: headers });
	}

	getSingleEmployersJobsList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/jobslist', employerIds, { headers: headers });
	}

	getSavedJobsList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/fetchsavedjobs', employerIds, { headers: headers });
	}

	getMatchedJobsList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/myjobs', employerIds, { headers: headers });
	}

	getAppliedJobsList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/fetchappliedjobs', employerIds, { headers: headers });
	}

	getMyJobOffersList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		// return this.http.post(this._baseUrl + '/job/fetchselectedjobs', employerIds, { headers: headers })
		return this.http.post(this._baseUrl + '/job/fetchofferedjobs', employerIds, { headers: headers });
	}

	getContractJobsList(): Observable<any> {
		const employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/contractslist', employerIds, { headers: headers });
	}

	getContractDetails(contractid): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/fetchparticularcontract', contractid, { headers: headers });
	}

	getContractTodayTimesheet(contractid): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/fetchpunchingtimesheet', contractid, { headers: headers });
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



	jobSeekerIdProofUpdate(jobSeekerProfileData, userID): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'id': userID
			});
		return this.http.post(this._baseUrl + '/updateidproofnoauth', jobSeekerProfileData, { headers: headers });
	}



	jobseekerPasswordUpdate(jobSeekerPasswordData): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/changepassword', jobSeekerPasswordData, { headers: headers });
	}

	uploadProfileDocs(formData): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
			});
		return this.http.post(this._baseUrl + '/updateimageandproof', formData, { headers: headers });
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
	// 	return this.http.post(this._baseUrl + '/job/applytojob', jobId, { headers: headers })
	// }

	sendJobApplication(jobId): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/newapplytojob', jobId, { headers: headers });
	}

	acceptOffer(jobId): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/confirmjob', jobId, { headers: headers });
	}

	rejectOffer(jobId): Observable<any> {
		// var authDatas = JSON.stringify(authData);
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/rejectjob', jobId, { headers: headers });
	}

	punchIn(contractid): Observable<any> {
		let jobId = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/punchin', contractid, { headers: headers });
	}

	punchOut(contractid): Observable<any> {
		let jobId = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/punchout', contractid, { headers: headers });
	}

	sendPunchLateReason(reason): Observable<any> {
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/contract/updatelatereason', reason, { headers: headers });
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

	saveJob(ids): Observable<any> {
		// let employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/savejob', ids, { headers: headers });
	}

	unSaveJob(ids): Observable<any> {
		// let employerIds = '';
		const userToken = localStorage.getItem('ogToken');
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
		return this.http.post(this._baseUrl + '/job/unsavejob', ids, { headers: headers });
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
}
