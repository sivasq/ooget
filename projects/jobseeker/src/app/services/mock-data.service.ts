import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EmploymentType } from '../classes/EmploymentType';
import { EmploymentTypes } from '../mock-datas/EmploymentTypes';

import { WorkingEnvironment } from '../classes/workingEnvironment';
import { WorkingEnvironments } from '../mock-datas/WorkingEnvironments';

import { JobLocation, JobRegion } from '../classes/jobLocation';
import { JobLocations, JobRegions } from '../mock-datas/JobLocations';

import { Specialization } from '../classes/Specialization';
import { Specializations } from '../mock-datas/Specializations';
// import { FullTimeSpecializations } from '../mock-datas/fullTimeSpecializations';
// import { PartTimeSpecializations } from '../mock-datas/partTimeSpecializations';
import { BankDetail } from '../classes/bankDetail';
import { Race } from '../classes/race';
import { Nationality } from '../classes/Nationality';
import { BankDetails } from '../mock-datas/bankDetails';
import { Races } from '../mock-datas/race';
import { Nationalitys } from '../mock-datas/nationlitys';
import { Industry } from '../classes/industry';
import { Industries } from '../mock-datas/industries';
import { Countries } from '../mock-datas/countries';

@Injectable({
	providedIn: 'root'
})
export class MockDataService {

	constructor() { }

	getEmploymentTypes(): Observable<EmploymentType[]> {
		return of(EmploymentTypes);
	}

	getWorkingEnvironments(): Observable<WorkingEnvironment[]> {
		return of(WorkingEnvironments);
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

	getJobRegions(): Observable<JobRegion[]> {
		return of(JobRegions);
	}

	getJobLocations(): Observable<JobLocation[]> {
		return of(JobLocations);
	}

	getBankDetails(): Observable<BankDetail[]> {
		return of(BankDetails);
	}

	getRaces(): Observable<Race[]> {
		return of(Races);
	}

	getNationalitys(): Observable<Nationality[]> {
		return of(Nationalitys);
	}

	getIndustries(): Observable<Industry[]> {
		return of(Industries);
	}

	getCountries(): Observable<any[]> {
		return of(Countries);
	}
}
