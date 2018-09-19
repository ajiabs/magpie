import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  { environment } from './../../../../src/environments/environment';
import 'rxjs/add/observable/of';

var server_url = environment.server_url;

@Injectable()
export class DashboardService {
  result: any;
  constructor(private http: HttpClient) { }

  getUsersCount = (current_route) =>{
    let httpOptions = {
       headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
     };
     const uri = server_url+'users/getUsersCount';
     return this.http.get(uri,httpOptions)
        .map(res => {
               return res;
             });
   }

}