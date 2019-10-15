import { Component, OnInit,Input,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { environment } from './../../../../../src/environments/environment';
import { AuthGuard } from './../../../../../system/src/services/admin/auth-guard.service';
import { WebsocketService } from './../../../../../system/src/services/admin/websocket.service';
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
    resetMail:any;
    userLoginForm: FormGroup;
    forgotPasswordForm :FormGroup;
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService,public webSocketService: WebsocketService,private authguard:AuthGuard) {
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

            var session_data =[];
            session_data['jwtToken'] = this.data.token;
            session_data['todays_date'] = this.data.todays_date;
            session_data['email'] =  this.data.result.email;
            session_data['name'] =  this.data.result.name;
            session_data['users_id'] =  this.data.result.users_id;
            session_data['roles_id'] =  this.data.result.roles_id;
            session_data['role_name'] =  this.data.result.role_name;
            session_data['image'] =  this.data.result.image;
            this.authguard.setSessions(session_data);
            this.webSocketService.joinRoom({room:1});
            window.location.href = "/admin/dashboard";
          }else
            this.login_error = this.data.msg;
         

        });
   
    }

    forgotPassword = (resetMail) => {
      this.section_service.forgotPassword(resetMail).subscribe(res => {
        if (res['success']) {
          this.forgotPasswordForm.reset();
          $.notify({
            title: "Success! ",
            message: res['msg'],
            icon: 'fa fa-check'
          }, {
            type: "success"
          });
          setTimeout(() => {
            window.location.href = environment.site_url + 'admin/login'
          }, 2000);
        } else {
          this.forgotPasswordForm.reset();
          $.notify({
            title: "Sorry! ",
            message: res['msg'],
            icon: 'fa fa-times'
          }, {
            type: "danger"
          });
        }
      });
    
    }



}