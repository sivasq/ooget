import { Component, OnInit, Input } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';
import { MenuPositionX, MatSnackBar } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { ConfigService } from '../../../services/config.service';

@Component({
	selector: 'app-employers-list',
	templateUrl: './employers-list.component.html',
	styleUrls: ['./employers-list.component.scss']
})
export class EmployersListComponent implements OnInit {

	public imgBaseUrl;

	//Mat Menu Configuration
	@Input() xPosition: MenuPositionX
	@Input() overlapTrigger: boolean

	public pageSizeOptions = [3, 6, 12, 24, 48, 96];

	// Tab1 Pagination config
	public tab1PaginateConfig: PaginationInstance = {
		id: 'tab1',
		itemsPerPage: 6,
		currentPage: 1
	};
	public tab1search;
	public tab1Filter: string = '';
	public tab1PaginateControlMaxSize: number = 5;
	public tab1PaginateControlAutoHide: boolean = true;

	//set employers availability
	public isEmployerAvailable: boolean = false;;
	public employerCount: Number;

	//set employers Array
	public employers_list: any[];

	//busy Config
	busy: Subscription;

	constructor(private urlconfig: ConfigService, private _httpService: ApiCallService, public snackBar: MatSnackBar) {
		this.imgBaseUrl = urlconfig.img_base_url;
	}

	// Toggle Employer Status Active/Inactive
	changeEmployerStatus(event,companyId) {
		// console.log(event.checked);
		// console.log(companyId);
		this.busy = this._httpService.changeEmployerStatus({ companyid: companyId, activestatus: event.checked })
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response);
						if (event.checked == true)
						{
							let snackBarRef = this.snackBar.open('Employer Activated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						}else if (event.checked == false) {
							let snackBarRef = this.snackBar.open('Employer Deactivated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						}

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Get All Employers
	getAllEmployers() {
		this.busy = this._httpService.getAllEmployers()
			.subscribe(
				response => {
					if (response.success) {
						console.log(response.employers);
						if ((response.employers).length > 0) {
							this.isEmployerAvailable = true;
							this.employerCount = (response.employers).length;
							this.employers_list = response.employers;
						} else {
							this.isEmployerAvailable = false;
						}
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	ngOnInit() {
		this.getAllEmployers();
	}
}
