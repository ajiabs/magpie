import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
     date1:any;
     date2:any;

    constructor(private router: Router) { }
 
    canActivate =(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=> {

         this.date1 = new Date(Date.now()).getTime();
         this.date2 = new Date(localStorage.getItem('todays_date')).getTime();
         if(Math.round((this.date1-this.date2)/60000) >1440){
            this.removeLocalStorageSessions();
            this.removeSessionStorageSessions();
            this.router.navigate(['/admin/login']);
            return false;
         }


         if (typeof localStorage.getItem("jwtToken") != undefined  && localStorage.getItem("jwtToken") != null && localStorage.getItem('jwtToken')) {
            if(state.url == '/admin')
            this.router.navigate(['/admin/dashboard']);
            return true;
         }
         this.removeLocalStorageSessions();
         this.removeSessionStorageSessions();
         this.router.navigate(['/admin/login']);
         return false;
    }

    setSessions=(data)=>{

        localStorage.setItem('jwtToken',data['jwtToken'] );
        localStorage.setItem('todays_date',data['todays_date'] );
        localStorage.setItem("userDetails['email']", data['email']);
        localStorage.setItem("userDetails['name']",data['name'] );
        localStorage.setItem("userDetails['users_id']",data['users_id'] );
        localStorage.setItem("userDetails['roles_id']", data['roles_id']);
        localStorage.setItem("userDetails['role_name']", data['role_name']);
        localStorage.setItem("userDetails['image']", data['image']);
     
        if(typeof localStorage.getItem("autologin") != undefined  && localStorage.getItem("autologin") != null){
          var autologin = [];
          autologin = JSON.parse(localStorage.getItem("autologin"));
          if(autologin.indexOf(parseInt(data['users_id'])) == -1)
             autologin.push(data['users_id']);
          localStorage.setItem("autologin", JSON.stringify(autologin));
        }else{
        
             var autologin = [];
             autologin.push(parseInt(data['users_id']));
             localStorage.setItem("autologin", JSON.stringify(autologin));   
        }
  
        sessionStorage.setItem("session_storage_user['jwtToken']",localStorage.getItem("jwtToken"));
        sessionStorage.setItem("session_storage_user['todays_date']", localStorage.getItem("todays_date"));
        sessionStorage.setItem("session_storage_user['email']", localStorage.getItem("userDetails['email']"));
        sessionStorage.setItem("session_storage_user['name']", localStorage.getItem("userDetails['name']"));
        sessionStorage.setItem("session_storage_user['users_id']", localStorage.getItem("userDetails['users_id']"));
        sessionStorage.setItem("session_storage_user['roles_id']", localStorage.getItem("userDetails['roles_id']"));
        sessionStorage.setItem("session_storage_user['role_name']", localStorage.getItem("userDetails['role_name']"));
        sessionStorage.setItem("session_storage_user['image']", localStorage.getItem("userDetails['image']"));


    }
    removeLocalStorageSessions=()=>{

        localStorage.removeItem('jwtToken');
        localStorage.removeItem('todays_date');
        localStorage.removeItem("userDetails['email']");
        localStorage.removeItem("userDetails['name']");
        localStorage.removeItem("userDetails['users_id']");
        localStorage.removeItem("userDetails['roles_id']");
        localStorage.removeItem("userDetails['role_name']");
        localStorage.removeItem("userDetails['image']");
        localStorage.removeItem("autologin");

    }
    removeSessionStorageSessions=()=>{

        sessionStorage.removeItem("session_storage_user['jwtToken']");
        sessionStorage.removeItem("session_storage_user['todays_date']");
        sessionStorage.removeItem("session_storage_user['email']");
        sessionStorage.removeItem("session_storage_user['name']");
        sessionStorage.removeItem("session_storage_user['users_id']");
        sessionStorage.removeItem("session_storage_user['roles_id']");
        sessionStorage.removeItem("session_storage_user['role_name']");
        sessionStorage.removeItem("session_storage_user['image']");
        
    }

    

}