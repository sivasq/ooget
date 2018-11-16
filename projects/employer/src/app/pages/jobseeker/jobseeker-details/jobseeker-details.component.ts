import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { MenuPositionX, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobseeker-details',
  templateUrl: './jobseeker-details.component.html',
  styleUrls: ['./jobseeker-details.component.scss']
})
export class JobseekerDetailsComponent implements OnInit {

  busy: Subscription;
  
  @Input() xPosition: MenuPositionX

  public jobSeekerDetails: any = [];
  employerId;
  empJobId;
  jobseekerId;
  candidateSelectedForJob: any = [];

  isAlreadySelected: boolean;

  constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.employerId = this.route.snapshot.params['emp_id'];
    this.empJobId = this.route.snapshot.params['job_id'];
    this.jobseekerId = this.route.snapshot.params['js_id'];

    let jobseekerId = {
      jobseekerid: this.route.snapshot.params['js_id'],
      jobid: this.empJobId
    }
    this.getJobSeekerDetails(jobseekerId);
  }

  isInArray(array, word) {
    // console.log(array.indexOf(word));
    // console.log(array.includes(word));
    // console.log(array.indexOf(word) > -1);
    // console.log(array.indexOf(word.toLowerCase()) > -1);
    return array.includes(word);
  }

  getJobSeekerDetails(jobseekerId) {
    this.busy = this._httpService.getJobSeekerDetails(jobseekerId)
      .subscribe(
        response => {
          if (response.success) {
            this.jobSeekerDetails = response.jobseeker;
            this.candidateSelectedForJob = response.jobseeker.jobsselected;
            console.log(this.jobSeekerDetails);

            if (this.isInArray(this.candidateSelectedForJob, this.empJobId)) {
              this.isAlreadySelected = true;
            } else {
              this.isAlreadySelected = false;
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

  selectApplication() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      boxTitle: "Confirmation",
      confirmMsg: "<p>Are You Sure to Select This Candidate ?</p>",
      okButtonText: "Yes",
      noButtonText: "No",
      actionalign: "center"
    };
    let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogref.afterClosed().subscribe(
      data => {
        // this.confirmResponse(data)
        if (data == 'yes') {
          this.confirmSelectApplication();
        } else if (data == 'no') {
          console.log('no');
        }
      }
    );
  }

  confirmSelectApplication() {
    console.log({ jobid: this.empJobId, jobseekerid: this.jobseekerId });
    this.busy = this._httpService.selectApplication({ jobid: this.empJobId, jobseekerid: this.jobseekerId })
      .subscribe(
        response => {
          if (response.success) {
            this.isAlreadySelected = true;
            let snackBarRef = this.snackBar.open('The Candidate Selected For This Job.', 'Close', {
              duration: 5000,
            });
            snackBarRef.onAction().subscribe(() => {
              snackBarRef.dismiss();
              console.log('The snack-bar action was triggered!');
            });
          } else if (!response.success) {
            let snackBarRef = this.snackBar.open('The Candidate Already Selected For This Job.', 'Close', {
              duration: 5000,
            });

            snackBarRef.onAction().subscribe(() => {
              snackBarRef.dismiss();
              console.log('The snack-bar action was triggered!');
            });
            console.log(response);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() { }

}