import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  { environment } from 'environments/environment';


var server_url = environment.server_url;



@Injectable()
export class SectionService {
  result: any;
  constructor(private http: HttpClient) { }

  sectionConfig(current_route){
   let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];

    const uri = server_url+section+'/getConfig';
    return this.http.get(uri,httpOptions)
       .map(res => {
              return res;
            });
  }

  customRoute(current_route,from){


   let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];

    const uri = server_url+'custom/'+from;
    return this.http.get(uri,httpOptions)
       .map(res => {
              return res;
            });
  }



  add(data,current_route) {
    let httpOptions = {
     
      headers: new HttpHeaders({ 'Accept':'application/json','enctype': 'multipart/form-data', 'Authorization': localStorage.getItem('jwtToken') })
    };



    let formData = new FormData();
      Object.keys(data).forEach(k => {
          if( data.file_fields.indexOf(k) != -1){
           if((data[k][0] !== undefined )){
             for(let i =0; i < data[k].length; i++){
                  formData.append(k, data[k][i], data[k][i]['name']);
              }
           }
          }else
             formData.append(k, data[k]);
    });



    var section = current_route.split('/')[2];
    const uri = server_url+section+'/add';
    const obj = formData;
    this.http.post(uri, obj,httpOptions)
        .subscribe(res => console.log('Done'));
  }

  search(value,searchable_fields,order_by,sortable_field,relation,current_page,per_page,current_route){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];
    const uri = server_url+section+'/search';
    const obj = {'search':value,'searchable':searchable_fields,'sort_order':order_by,'sort_orderBy':sortable_field,'relation':relation,'current_page':current_page,'per_page':per_page};
    return this
            .http
            .post(uri,obj,httpOptions)
            .map(res => {
              return res;
            });
  }

 



   get(current_page,per_page,sortable_field,current_route) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];
    const uri = server_url+section;
    const obj = {'current_page':current_page,'per_page':per_page,'sort_orderBy':sortable_field};
    return this
            .http
            .post(uri,obj,httpOptions)
            .map(res => {
              return res;
            });
  }

  edit(id,current_route) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
      var section = current_route.split('/')[2];
    const uri = server_url+section+'/edit/' + id;
    return this
            .http
            .get(uri,httpOptions)
            .map(res => {
              return res;
            });
  }

   update(data,current_route) {


   
    let httpOptions = {
     
      headers: new HttpHeaders({ 'Accept':'application/json','enctype': 'multipart/form-data', 'Authorization': localStorage.getItem('jwtToken') })
    };


    let formData = new FormData();
      Object.keys(data).forEach(k => {
          if( data.file_fields.indexOf(k) != -1){
           if((data[k][0] !== undefined )){
             for(let i =0; i < data[k].length; i++){
                  formData.append(k, data[k][i], data[k][i]['name']);
              }
           }else
            formData.append(k, data[k]);
          }else
             formData.append(k, data[k]);
    });


    var section = current_route.split('/')[2];
    const uri = server_url+section+'/update/' + data._id;

    const obj = formData;
    this
      .http
      .post(uri, obj,httpOptions)
      .subscribe(res => console.log('Done'));
      
  }
   delete(id,current_route) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
      var section = current_route.split('/')[2];
    const uri = server_url+section+'/delete/' + id;

        return this
            .http
            .get(uri,httpOptions)
            .map(res => {
              return res;
            });
  }

  getImage(id,current_route){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];
    const uri = server_url+section+'/getImage/' + id;
    return this
            .http
            .get(uri,httpOptions)
            .map(res => {
              return res;
            });
      
  }

    deleteFile(id,column,rowId,current_route) {
      let httpOptions = {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
      };
      var section = current_route.split('/')[2];
      const uri = server_url+section+'/deleteFile/' + rowId;;
      const obj = {'file_id':id,'column':column};
      return this
              .http
              .post(uri,obj,httpOptions)
              .map(res => {
              return res;
            });

  }


  getAllMenus (section){
      let httpOptions = {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
      };
      const uri = server_url+section+'/getAllMenus';
      return this
              .http
              .get(uri,httpOptions)
              .map(res => {
              return res;
            });

  }



}