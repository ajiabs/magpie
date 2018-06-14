import { Component } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '';
  showNav = true;
  showBeadcrumb = true;
  showNavTitle = "";
  showNavMethod = "";
  login_name = "";
  login_id = "";
  constructor(private route: ActivatedRoute, private router: Router) {


  }
  ngOnInit() {
  this.isLoggedIn();
 

  }
    isLoggedIn() {

      if (localStorage.getItem('jwtToken')) {
        this.showNav = true;
        this.login_name = localStorage.getItem("userDetails['name']");
        this.login_id = localStorage.getItem("userDetails['users_id']")

      } else {
        this.showNav = false;
      }

       this.router.events.subscribe(event => {

          if (event instanceof NavigationEnd ) {
            if(event.url == '/admin/login'){
              this.showNav = false;
            }else{
               this.showNavTitle = event.url.split('/')[2];
               this.showNavMethod = event.url.split('/')[3];
               if(event.url == '/admin/dashboard')
                this.showBeadcrumb = false;
               else
               {
                  this.showBeadcrumb = true;
               }
            }
          }
        }); 

      
    }


  logout() {
    localStorage.removeItem('jwtToken');
    // this.router.navigate(['login']);
     window.location.href = "/admin/login";
  }

  
 
}