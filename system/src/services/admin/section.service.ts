import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import  { environment } from './../../../../src/environments/environment';
import 'rxjs/add/observable/of';



var server_url = environment.server_url;



@Injectable()
export class SectionService {
  result: any;
  constructor(private http: HttpClient) { }


  checkLogin(data) {
    const uri = server_url+'users/checkLogin';
    const obj = {
     email: data.email,
     password:data.password
   };
   return this
           .http
           .post(uri,obj)
           .map(res => {
             return res;
           });
 }


  sectionConfig = (current_route) =>{

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

  customRoute = (current_route,from) =>{


   let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];
    const uri = server_url+'magpie_custom/'+from;
    const obj = {"role_id":localStorage.getItem("userDetails['roles_id']")};
    return this.http.post(uri,obj,httpOptions)
       .map(res => {
              return res;
            });
  }

  adminCustomRoute = (current_route,from) =>{

    let httpOptions = {
       headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
     };
     var section = current_route.split('/')[2];
     const uri = server_url+'admin_custom/'+from;
     const obj = {"role_id":localStorage.getItem("userDetails['roles_id']")};
     return this.http.post(uri,obj,httpOptions)
        .map(res => {
               return res;
             });
   }


   add = (data,current_route) => {
    let httpOptions = {
     
      headers: new HttpHeaders({ 'Accept':'application/json','enctype': 'multipart/form-data', 'Authorization': localStorage.getItem('jwtToken') })
    };



    let formData = new FormData();
      Object.keys(data).forEach(k => {
          if( data.file_fields.indexOf(k) != -1){
            if((typeof data[k] == "object" )){
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

  search = (value,searchable_fields,order_by,sortable_field,relation,current_page,per_page,current_route) => {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];
    const uri = server_url+section+'/search';
    const obj = {'search':value,'searchable':searchable_fields,'sort_order':order_by,'sort_orderBy':sortable_field,'relation':relation,'current_page':current_page,'per_page':per_page,'role_id':localStorage.getItem("userDetails['roles_id']")};
    return this
            .http
            .post(uri,obj,httpOptions)
            .map(res => {
              return res;
            });
  }


  export  = (value,searchable_fields,order_by,sortable_field,relation,current_route,columns)=>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    var section = current_route.split('/')[2];
    const uri = server_url+section+'/export';
    const obj = {'search':value,'searchable':searchable_fields,'sort_order':order_by,'sort_orderBy':sortable_field,'relation':relation,'role_id':localStorage.getItem("userDetails['roles_id']"),'columns':columns};
    return this
            .http
            .post(uri,obj,httpOptions)
            .map(res => {
              return res;
            });
      
  }

 



   get = (current_page,per_page,sortable_field,order_by,current_route) =>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };

    var section = current_route.split('/')[2];
    const uri = server_url+section;
    const obj = {'current_page':current_page,'per_page':per_page,'sort_orderBy':sortable_field,sort_order:order_by,'role_id':localStorage.getItem("userDetails['roles_id']")};
    return this
            .http
            .post(uri,obj,httpOptions)
            .map(res => {
              return res;
            });
  }

  edit = (id,current_route) => {
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

  getProfile = (users_id)=>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    const uri = server_url+'users/profile-edit/' + users_id;
    return this
        .http
        .get(uri,httpOptions)
        .map(res => {
          return res;
        });
  }

  view = (id,current_route) =>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
      var section = current_route.split('/')[2];
    const uri = server_url+section+'/view/' + id;
    return this
            .http
            .get(uri,httpOptions)
            .map(res => {
              return res;
            });

  }


  getUserRole = (role_id) =>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
  
    const uri = server_url+'roles/getUserRole/' +parseInt(role_id);
    return this
            .http
            .get(uri,httpOptions)
            .map(res => {
              return res;
            });

  }



   update = (data,current_route) => {


   
    let httpOptions = {
     
      headers: new HttpHeaders({ 'Accept':'application/json','enctype': 'multipart/form-data', 'Authorization': localStorage.getItem('jwtToken') })
    };


     let formData = new FormData();
      Object.keys(data).forEach(k => {
          if( data.file_fields.indexOf(k) != -1){
           
           if((typeof data[k] == "object" )){
            
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

  changePassword = (data,current_route) => {


   
    let httpOptions = {
     
      headers: new HttpHeaders({ 'Accept':'application/json','enctype': 'multipart/form-data', 'Authorization': localStorage.getItem('jwtToken') })
    };

    const uri = server_url+'users/changePassword';
    const obj = data;
    this
      .http
      .post(uri, obj,httpOptions)
      .subscribe(res => console.log('Done'));
      
  }
   delete = (id,current_route) => {

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

  getImage = (id,current_route) =>{
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

    deleteFile = (id,column,rowId,current_route) => {
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


  getRolePermissionMenus = (section) =>{
      let httpOptions = {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
      };
      const uri = server_url+section+'/getRolePermissionMenus';
      const obj  ={'role_id':localStorage.getItem("userDetails['roles_id']")};
      return this
              .http
              .post(uri,obj,httpOptions)
              .map(res => {
              return res;
            });

  }

  getAllMenus = (section) =>{
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

getCurrentRolePermissionMenus = (roles,role_id)=>{

  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+roles+'/getCurrentRolePermissionMenus/'+role_id;
  return this
          .http
          .get(uri,httpOptions)
          .map(res => {
          return res;
        });

}

checkEmailExist = (email,users_id)=>{

  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  if(users_id == undefined)
   users_id = 0;
  const uri = server_url+'users/checkEmailExist/'+email+'/'+users_id;
  return this
          .http
          .get(uri,httpOptions)
          .map(res => {
          return res;
        });

}
getSettings=(current_route)=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  var section = current_route.split('/')[2];
  const uri = server_url+section+'/getSettings';
  return this
      .http
      .get(uri,httpOptions)
      .map(res => {
        return res;
      });
}

updateSettings=(data,current_route)=>{
  let httpOptions = {
   
    headers: new HttpHeaders({ 'Accept':'application/json','enctype': 'multipart/form-data', 'Authorization': localStorage.getItem('jwtToken') })
  };
 console.log( localStorage.getItem('jwtToken'));
  let formData = new FormData();
   Object.keys(data).forEach(k => {
     if( data.file_fields.indexOf(k) != -1){
      if((typeof data[k] == "object" )){
        for(let i =0; i < data[k].length; i++){
            
            formData.append(k, data[k][i], data[k][i]['name']);
         }
      }else
       formData.append(k, data[k]);
      }else{
     
      formData.append(k, data[k]);
     }
  });
  var section = current_route.split('/')[2];
  const obj = formData;
  const uri = server_url+section+'/updateSettings';
  
  return this
          .http
          .post(uri,obj,httpOptions)
          .map(res => {
            return res;
          });
}

getPackagesInstaller = ()=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'packages-installer/getPackagesInstaller';
  const obj = {};
  return this
          .http
          .post(uri,obj,httpOptions)
          .map(res => {
          return res;
        });

}
getOnePackagesInstaller = (package_name)=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'packages-installer/getOnePackagesInstaller';
  const obj = {'package_name':package_name};
  return this
          .http
          .post(uri,obj,httpOptions)
          .map(res => {
          return res;
        });

}

installPackage = (pkg)=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'packages-installer/installPackage';
  //.command_line_code
  const obj = pkg;
  return this
          .http
          .post(uri,obj,httpOptions)
          .map(res => {
          return res;
        });
}


installedPackages = ()=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'packages-installer/installedPackages';
  //.command_line_code
  const obj = {};
  return this
          .http
          .post(uri,obj,httpOptions)
          .map(res => {
          return res;
        });
}


searchPackagesInstaller = (searchkey)=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'packages-installer/searchPackagesInstaller';
  const obj = {'search_key':searchkey};
  return this
          .http
          .post(uri,obj,httpOptions)
          .map(res => {
          return res;
        });

}

getMenuNameFromUrl = (section,url)=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+section+'/getMenuNameFromUrl';
  let obj={ "url":url}
  return this
          .http
          .post(uri,obj,httpOptions)
          .map(res => {
          return res;
        });
 }


 updatePackageConfiguration = (packagedata)=>{
  let httpOptions = {
  headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'packages-installer/updatePackageConfiguration';
  const obj = packagedata;
  
  return this
    .http
    .post(uri,obj,httpOptions)
    .map(res => {
      return res;
    });
  }
  getPackageData = (package_name)=>{
  let httpOptions = {
  headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'packages-installer/getPackageData';
  
  const obj = {'package_name':package_name};
  
  return this
    .http
    .post(uri,obj,httpOptions)
    .map(res => {
      return res;
    });
  }

  getThemeColorSettings = ()=>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    const uri = server_url+'general-settings/getThemeColorSettings';
    
    const obj = {};
    
    return this
      .http
      .post(uri,obj)
      .map(res => {
        return res;
      });

}

getWebsiteNameSettings = ()=>{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  const uri = server_url+'general-settings/getWebsiteNameSettings';
  
  const obj = {};
  
  return this
    .http
    .post(uri,obj)
    .map(res => {
      return res;
    });

}

  getRowSettings = (settings_key)=>{
      let httpOptions = {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
      };
      const uri = server_url+'general-settings/getRowSettings';
      
      const obj = {'slug':settings_key};
      
      return this
        .http
        .post(uri,obj)
        .map(res => {
          return res;
        });

  }





}