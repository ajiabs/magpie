import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('jwtToken')) {
            if(state.url == '/admin')
             this.router.navigate(['/admin/dashboard']);
            return true;
        }
 
        this.router.navigate(['/admin/login']);
        return false;
    }
}