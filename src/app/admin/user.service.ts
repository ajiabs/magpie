import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  { environment } from 'environments/environment';


var server_url = environment.server_url;

@Injectable()
export class UserService {
  result: any;
  constructor(private http: HttpClient) {}

 


 checkLogin(email,password) {
     const uri = server_url+'users/checkLogin';
     const obj = {
      email: email,
      password:password
    };
    return this
            .http
            .post(uri,obj)
            .map(res => {
              return res;
            });
  }


}