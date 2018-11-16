import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';

@Component({
	selector: 'app-faq-manage',
	templateUrl: './faq-manage.component.html',
	styleUrls: ['./faq-manage.component.scss']
})
export class FaqManageComponent implements OnInit {

	process = 'add';

	faqAddTitle = 'Add FAQ';
	faqEditTitle = 'Edit FAQ';
	faqListTitle = 'List of FAQ\'s';
	displayMode = "default";

	faqList: any[] = [];

	faqDetails: any;

	public busy: Subscription;

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar) {
		this.getAllFaqItems();
	}

	onChangeEditMode(event) {
		console.log(event);
		this.faqDetails = event;
		this.process = 'edit';
	}

	onFAQUpdateCancel(event) {
		this.process = 'add';
	}

	onNewFaqItem(faqItem) {
		console.log(faqItem);
		this._httpService.faqAdd(faqItem)
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Show Success Snackbar
						
						let snackBarRef = this.snackBar.open('FAQ Added Successfully.', 'Close', {
							duration: 5000,
						});
						// Snackbar action
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
						this.getAllFaqItems();
						// Response is failed
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	getAllFaqItems() {
		console.log();
		this._httpService.getAllFaqItems()
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Show Success Snackbar
						this.faqList = response.faqs;
						// Response is failed
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	onUpdateFaqItem(faqItem) {
		console.log(faqItem);
		this.process = 'add';
		this._httpService.faqUpdate(faqItem)
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Show Success Snackbar
						let snackBarRef = this.snackBar.open('FAQ Updated Successfully.', 'Close', {
							duration: 5000,
						});
						// Snackbar action
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
						this.getAllFaqItems();
						// Response is failed
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	onDeleteFaqItem(faqId) {
		console.log(faqId);
		this._httpService.faqDelete({ 'faqid': faqId })
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Show Success Snackbar
						let snackBarRef = this.snackBar.open('FAQ Deleted Successfully.', 'Close', {
							duration: 5000,
						});
						// Snackbar action
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
						this.getAllFaqItems();
						// Response is failed
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
		console.log("demo")
	}
}