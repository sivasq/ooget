import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest,	HttpEventType, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { ApiCallService } from '../../../services/api-call.service';
import { ConfigService } from '../../../services/config.service';

@Component({
	selector: 'app-featured-employers',
	templateUrl: './featured-employers.component.html',
	styleUrls: ['./featured-employers.component.scss'],
	animations: [
		trigger('fadeInOut', [
			state('in', style({ opacity: 100 })),
			transition('* => void', [
				animate(300, style({ opacity: 0 }))
			])
		])
	]
})
export class FeaturedEmployersComponent implements OnInit {

	/** Link text */
	@Input() text = 'Upload Featured Employer';
	/** Name used in form which will be sent in HTTP request. */
	@Input() param = 'featuredimage';
	/** Target URL for file uploading. */
	// @Input() target = 'http://104.197.80.225:3010/ooget/admin/addfeaturedimage';
	// @Input() target = 'http://api.ooget.com.sg/ooget/admin/addfeaturedimage';
	@Input() target;
	/** File extension that accepted, same as 'accept' of <input type="file" />.
		By the default, it's set to 'image/*'. */
	@Input() accept = 'image/*';
	/** Allow you to add handler after its completion. Bubble up response text from remote. */

	@Output() complete = new EventEmitter<string>();

	public files: Array<FileUploadModel> = [];

	constructor(private _http: HttpClient, private urlconfig: ConfigService) {
		this.target = urlconfig.base_url +'/addfeaturedimage';
	}

	ngOnInit() {
	}

	onClick() {
		const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

		fileUpload.onchange = () => {
			for (let index = 0; index < fileUpload.files.length; index++) {
				const file = fileUpload.files[index];
				this.files.push({
					data: file,
					state: 'in',
					inProgress: false,
					progress: 0,
					canRetry: false,
					canCancel: true
				});
			}
			this.uploadFiles();
		};

		fileUpload.click();
	}

	cancelFile(file: FileUploadModel) {
		file.sub.unsubscribe();
		this.removeFileFromArray(file);
	}

	retryFile(file: FileUploadModel) {
		this.uploadFile(file);
		file.canRetry = false;
	}

	private uploadFile(file: FileUploadModel) {
		const fd = new FormData();
		fd.append(this.param, file.data);

		let userToken = localStorage.getItem('ogToken');
		let headers = new HttpHeaders(
			{
				'Access-Control-Allow-Origin': '*',
				'token': userToken,
			})

		const req = new HttpRequest('POST', this.target, fd, {
			headers: headers,
			reportProgress: true
		});

		file.inProgress = true;
		file.sub = this._http.request(req).pipe(
			map(event => {
				switch (event.type) {
					case HttpEventType.UploadProgress:
						file.progress = Math.round(event.loaded * 100 / event.total);
						break;
					case HttpEventType.Response:
						return event;
				}
			}),
			tap(message => { }),
			last(),
			catchError((error: HttpErrorResponse) => {
				file.inProgress = false;
				file.canRetry = true;
				return of(`${file.data.name} upload failed.`);
			})
		).subscribe(
			(event: any) => {
				if (typeof (event) === 'object') {
					this.removeFileFromArray(file);
					this.complete.emit(event.body);
				}
			}
		);
	}

	private uploadFiles() {
		const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
		fileUpload.value = '';

		this.files.forEach(file => {
			this.uploadFile(file);
		});
	}

	private removeFileFromArray(file: FileUploadModel) {
		const index = this.files.indexOf(file);
		if (index > -1) {
			this.files.splice(index, 1);
		}
	}
}

export class FileUploadModel {
	data: File;
	state: string;
	inProgress: boolean;
	progress: number;
	canRetry: boolean;
	canCancel: boolean;
	sub?: Subscription;
}