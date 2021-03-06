import { Injectable } from '@angular/core';
import { Industry } from '../classes/Industry';
import { Industries } from '../mock-datas/industries';

import { EmploymentType } from '../classes/EmploymentType';
import { EmploymentTypes } from '../mock-datas/EmploymentTypes';

import { WorkingEnvironment } from '../classes/WorkingEnvironment';
import { WorkingEnvironments } from '../mock-datas/WorkingEnvironments';

import { JobLocation, JobRegion } from '../classes/jobLocation';
import { JobLocations, JobRegions } from '../mock-datas/JobLocations';

import { Specialization } from '../classes/Specialization';
// import { FullTimeSpecializations } from '../mock-datas/fullTimeSpecializations';
// import { PartTimeSpecializations } from '../mock-datas/partTimeSpecializations';

import { graceperiods, overtimeroundings } from '../mock-datas/simpleDatas';

import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { UserRole } from '../classes/userRole';
import { UserRoles } from '../mock-datas/userRoles';
import { Specializations } from '../mock-datas/specializations';
import { BankDetail } from '../classes/bankDetail';
import { BankDetails } from '../mock-datas/bankDetails';

@Injectable({
	providedIn: 'root'
})
export class MockDataService {

	constructor() { }

	// getIndustries(): Industry[] {
	// 	return Industries;
	// }

	getBankDetails(): Observable<BankDetail[]> {
		return of(BankDetails);
	}

	getIndustries(): Observable<Industry[]> {
		return of(Industries);
	}

	getEmploymentTypes(): Observable<EmploymentType[]> {
		return of(EmploymentTypes);
	}

	getWorkingEnvironments(): Observable<WorkingEnvironment[]> {
		return of(WorkingEnvironments);
	}

	getJobRegions(): Observable<JobRegion[]> {
		return of(JobRegions);
	}

	getJobLocations(): Observable<JobLocation[]> {
		return of(JobLocations);
	}

	getSpecializations(): Observable<Specialization[]> {
		return of(Specializations);
	}

	// getFullTimeSpecializations(): Observable<Specialization[]> {
	// 	return of(FullTimeSpecializations);
	// }

	// getPartTimeSpecializations(): Observable<Specialization[]> {
	// 	return of(PartTimeSpecializations);
	// }

	getGracePeriods(): Observable<number[]> {
		return of(graceperiods);
	}

	getOverTimeRoundings(): Observable<number[]> {
		return of(overtimeroundings);
	}

	getPaxs(): Observable<number[]> {
		return of(_.range(50));
	}

	getUserRoles(): Observable<UserRole[]> {
		return of(UserRoles);
	}
}
