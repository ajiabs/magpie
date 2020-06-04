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


  getDashboardConfig = (role_id)=>{

      let httpOptions = {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
      };
      const uri = server_url+'dashboard-config/getDashboardConfig/'+role_id;
      return this.http.get(uri,httpOptions)
        .map(res => {
                return res;
              });

   
  }

  getCountStaticMenus = () => {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    const uri = server_url + 'section/getAllMenusCount';
    return this
      .http
      .get(uri, httpOptions)
      .map(res => {
        return res;
      });

  }

  getCountStaticUsers = () => {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    const uri = server_url + 'section/getCountStaticUsers';
    return this
      .http
      .get(uri, httpOptions)
      .map(res => {
        return res;
      });

  }

  getCountDynamicUsers = () => {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    const uri = server_url + 'section/getCountDynamicUsers';
    return this
      .http
      .get(uri, httpOptions)
      .map(res => {
        return res;
      });

  }

  dashboardCustomRoute = (current_route,fn)=>{

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    const uri = server_url+current_route+'/'+fn;
    return this.http.get(uri,httpOptions)
       .map(res => {
              return res;
            });

  }

}