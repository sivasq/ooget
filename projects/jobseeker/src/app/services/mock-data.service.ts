import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EmploymentType } from '../classes/EmploymentType';
import { EmploymentTypes } from '../mock-datas/EmploymentTypes';

import { WorkingEnvironment } from '../classes/WorkingEnvironment';
import { WorkingEnvironments } from '../mock-datas/WorkingEnvironments';

import { JobLocation } from '../classes/jobLocation';
import { JobLocations } from '../mock-datas/JobLocations';

import { Specialization } from '../classes/Specialization';
import { FullTimeSpecializations } from '../mock-datas/fullTimeSpecializations';
import { PartTimeSpecializations } from '../mock-datas/partTimeSpecializations';
import { BankDetail } from '../classes/bankDetail';
import { Race } from '../classes/race';
import { Nationality } from '../classes/Nationality';
import { BankDetails } from '../mock-datas/bankDetails';
import { Races } from '../mock-datas/race';
import { Nationalitys } from '../mock-datas/nationlitys';

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

	getFullTimeSpecializations(): Observable<Specialization[]> {
		return of(FullTimeSpecializations);
	}

	getPartTimeSpecializations(): Observable<Specialization[]> {
		return of(PartTimeSpecializations);
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
}
