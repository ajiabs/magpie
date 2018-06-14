import { UserService } from './../../../user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: '././login.component.html',
  styleUrls: ['././login.component.css']
})
export class UserLoginComponent implements OnInit {

  users: any;
  title = "User Login";
  login_error:any;
  loginData = { username:'', password:'' };
   message = '';
   data: any;

 

  userLoginForm: FormGroup;
  forgotPasswordForm :FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,private userservice: UserService, private fb: FormBuilder) {
    this.createForm();
    
   }
  createForm() {
    this.userLoginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]

   });
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required ]});
  }
  checkLogin(email,password) {


      this.userservice.checkLogin(email,password).subscribe(res => 
       {
         this.data = res;
         localStorage.setItem('jwtToken', this.data.token);
         localStorage.setItem("userDetails['email']", this.data.result.email);
         localStorage.setItem("userDetails['name']", this.data.result.name);
         localStorage.setItem("userDetails['users_id']", this.data.result.users_id);
         window.location.href = "/admin/dashboard";
       }
      ,err => {
        this.login_error = err.error.msg;
      });
     
  }

 


  ngOnInit() {
  }




}