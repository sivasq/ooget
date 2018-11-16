import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public homePageUrl;
  
  //Error Message
  isAuthMsg: string;

  //busy Config
  busy: Subscription;

  adminPassResetForm: FormGroup;
  @ViewChild(FormGroupDirective) resetAdminPassResetForm;
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService,private fb: FormBuilder) {
    this.homePageUrl = config.homePageUrl;
    this.buildAdminPassResetForm();
  }

  // Build JobSeeker Auth Form
  buildAdminPassResetForm(): void {
    this.adminPassResetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]
    })
  }

  onAuthCheck() {
    if (!this.adminPassResetForm.valid) return false;
    this.isAuthMsg = "Sorry! Invalid Login Credentials";
    setTimeout(() => {
      this.isAuthMsg = '';
      this.resetAdminPassResetForm.resetForm();
    }, 3000);

    // this.busy = this._httpService.postLoginData(this.adminPassResetForm.value)
    //   .subscribe(
    //     response => {
    //       if (response.success) {
    //         this.resetAdminPassResetForm.resetForm();
    //         // Set local storages						            

    //       } else if (!response.success) {

    //         this.isAuthMsg = "Sorry! Invalid Login Credentials";
    //         setTimeout(() => {
    //           this.isAuthMsg = '';
    // 			this.resetEmployerPassResetForm.resetForm();
    //         }, 3000);
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //       this.isAuthMsg = "Server Errors Occured! Please Try Again";
    //       setTimeout(() => {
    //         this.isAuthMsg = '';
    //         this.resetEmployerAuthForm.resetForm();
    //       }, 3000);
    //     }
    //   );
  }

  ngOnInit() {
  }

}
