import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
var server_url = 'http://localhost:4000/admin/';

@Injectable()
export class UserService {
  result: any;
  constructor(private http: HttpClient) { }

 


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