import { Component, OnInit, Input, Output, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { environment } from './../../../../../src/environments/environment';
declare var notifier: any;
declare var $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class MagpieResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  passwordInfo = { newPwd: '', confirmPwd: '' };
  token: any;
  login_error:any;


  constructor(public route: ActivatedRoute, public router: Router, public fb: FormBuilder, public http: HttpClient, public section_service: SectionService) {

    this.resetPasswordForm = this.fb.group({
      newPwd: ['', Validators.required],
      password: ['', Validators.required]
    }, {
        validator: this.MatchPassword
      });
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }


  MatchPassword(AC: AbstractControl) {
    let password = AC.get('newPwd').value;
    let confirmPassword = AC.get('password').value;
    if (password != confirmPassword) {
      AC.get('password').setErrors({ MatchPassword: true })
    } else {
      return null
    }
  }



  updatePassword = (passwordInfo) => {
    passwordInfo['token'] = this.token;
    this.section_service.resetPassword(passwordInfo).subscribe(res => {
      if (res['success']) {
        this.resetPasswordForm.reset() ;
        new notifier({title: "Success! ", message: res['msg'], icon: 'fa fa-check',type: "success"});
        setTimeout(() => {
              window.location.href = environment.site_url + 'admin/login'
            }, 2000);
      }
      else {
        this.resetPasswordForm.reset() ;
        new notifier({title: "Sorry! ", message: res['msg'], icon: 'fa fa-times',type: "danger"});
        setTimeout(() => {
          window.location.href = environment.site_url + 'admin/login'
        }, 2000);
      }
    });
  }
}
