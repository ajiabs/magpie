import { Component, OnInit,Input,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class MagpieLoginComponent implements OnInit {
  @Input()
    users: any;
    title = "User Login";
    login_error:any;
    loginData = { email:'', password:'' };
    message = '';
    data: any;
    result_data:any;
    userLoginForm: FormGroup;
    forgotPasswordForm :FormGroup;
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService) {
      this.userLoginForm = this.fb.group({
        email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ],
        password: ['', Validators.required ]
  
     });
      this.forgotPasswordForm = this.fb.group({
        email: ['', Validators.required ]});
     
    }

  ngOnInit(){
    
  }

    checkLogin = (data) =>{

        this.section_service.checkLogin(data).subscribe(res=>{

          this.data = res;
  
          if(this.data.success){
             localStorage.setItem('jwtToken', this.data.token);
             localStorage.setItem("userDetails['email']", this.data.result.email);
             localStorage.setItem("userDetails['name']", this.data.result.name);
             localStorage.setItem("userDetails['users_id']", this.data.result.users_id);
             localStorage.setItem("userDetails['roles_id']", this.data.result.roles_id);
             window.location.href = "/admin/dashboard";
          }else
            this.login_error = this.data.msg;
         

        });
   
    }



}