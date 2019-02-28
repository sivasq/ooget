import { Injectable } from '@angular/core';
import { Industry } from '../classes/Industry';
import { Industries } from '../mock-datas/industries';

import { EmploymentType } from '../classes/EmploymentType';
import { EmploymentTypes } from '../mock-datas/EmploymentTypes';

import { WorkingEnvironment } from '../classes/WorkingEnvironment';
import { WorkingEnvironments } from '../mock-datas/WorkingEnvironments';

import { JobLocation } from '../classes/jobLocation';
import { JobLocations } from '../mock-datas/JobLocations';

import { Specialization } from '../classes/Specialization';
import { FullTimeSpecializations } from '../mock-datas/fullTimeSpecializations';
import { PartTimeSpecializations } from '../mock-datas/partTimeSpecializations';

import { UserRole } from '../classes/userRole';
import { UserRoles } from '../mock-datas/userRoles';

import { graceperiods, overtimeroundings } from '../mock-datas/simpleDatas';

import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root'
})
export class MockDataService {

	constructor() { }

	// getIndustries(): Industry[] {
	// 	return Industries;
	// }

	getIndustries(): Observable<Industry[]> {
		return of(Industries);
	}

	getEmploymentTypes(): Observable<EmploymentType[]> {
		return of(EmploymentTypes);
	}

	getWorkingEnvironments(): Observable<WorkingEnvironment[]> {
		return of(WorkingEnvironments);
	}

	getJobLocations(): Observable<JobLocation[]> {
		return of(JobLocations);
	}

	getFullTimeSpecializations(): Observable<Specialization[]> {
		return of(FullTimeSpecializations);
	}

	getPartTimeSpecializations(): Observable<Specialization[]> {
		return of(PartTimeSpecializations);
	}

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
