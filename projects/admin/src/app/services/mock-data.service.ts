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
import { Specializations } from '../mock-datas/Specializations';

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

	getSpecializations(): Observable<Specialization[]> {
		return of(Specializations);
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
}
