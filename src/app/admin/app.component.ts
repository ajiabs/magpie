import { MagpieComponent } from './../../../system/src/magpie.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SectionService } from './../../../system/src/services/admin/section.service';
import 'rxjs/add/operator/map';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-site',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends  MagpieComponent{

  constructor(router: Router,route: ActivatedRoute, http: HttpClient,section_service: SectionService,private meta: Meta) {super(route,router,http,section_service);
    this.meta.addTags([
      {name: 'description', content: ''},
      {name: 'author', content: ''},
      {name: 'keywords', content: ''}
    ]);
  }  

  ngOnInit() {

  

    if (localStorage.getItem('jwtToken')) {
      this.showNav = true;
      this.login_name = localStorage.getItem("userDetails['name']");
      this.login_id = localStorage.getItem("userDetails['users_id']");
      this.login_image = localStorage.getItem("userDetails['image']");
      
    
          this.isLoggedIn().subscribe(res=>{
             this.roles_menu = res;
          });

    } else 
    {
      this.showNav = false;
    }

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        if(event.url == '/admin/login'){
          this.showNav = false;
        }else{
           this.showNavTitle = event.url.split('/')[2];
           this.showNavMethod = event.url.split('/')[3];
           this.showBeadcrumb = true;
          //  if(event.url == '/admin/dashboard')
          //   this.showBeadcrumb = false;
          //  else
          //  {
          //     this.showBeadcrumb = true;
          //  }
        }
      }
    }); 

  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = "/admin/login";
  }


}