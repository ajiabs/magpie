import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
     date1:any;
     date2:any;

    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

         this.date1 = new Date(Date.now()).getTime();
         this.date2 = new Date(localStorage.getItem('todays_date')).getTime();
         if(Math.round((this.date1-this.date2)/60000) >17280){
            localStorage.removeItem('jwtToken');
            this.router.navigate(['/admin/login']);
            return false;
         }


         if (localStorage.getItem('jwtToken')) {
            if(state.url == '/admin')
            this.router.navigate(['/admin/dashboard']);
            return true;
         }
         localStorage.removeItem('jwtToken');
         this.router.navigate(['/admin/login']);
         return false;
    }
}