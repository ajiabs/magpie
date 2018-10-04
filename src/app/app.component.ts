import { MagpieComponent } from './../../system/src/magpie.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SectionService } from './../../system/src/services/admin/section.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent extends  MagpieComponent {
  angular_part:any=false;
  package_installer:any = false;
  menuRow:any;
  constructor(router: Router,route: ActivatedRoute, http: HttpClient,section_service: SectionService,private meta: Meta) {
    super(route,router,http,section_service)

  }
  ngOnInit() {
    this.section_service.getRowSettings("admin_theme_color").subscribe(res=>{
      console.log(res);
      $("body").css({"--some-color-dark":this.colorLuminance(res[0].value, -0.3),"--some-color":this.colorLuminance(res[0].value, 0),"--some-hovercolor":this.colorLuminance(res[0].value, -0.2)});

    });

    if(window.location.pathname.split('/')[1] == 'admin')
     this.angular_part = true;
       

    if (localStorage.getItem('jwtToken')) {
      this.showNav = true;
      this.login_name = localStorage.getItem("userDetails['name']");
      this.login_id = localStorage.getItem("userDetails['users_id']");
      this.login_image = localStorage.getItem("userDetails['image']");
    
      this.isLoggedIn().subscribe(res=>{
          this.roles_menu = res;
      });
      this.package_installer = localStorage.getItem("userDetails['roles_id']") == '1'?true:false;
      this.section_service.getUserRole(localStorage.getItem("userDetails['roles_id']")).subscribe(res => {
          this.login_role = res['name'];

          
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


          var url = event.url.split("/");
          var custom_url = url[1]+"/"+url[2];
        
          this.showNavMethod = event.url.split('/')[3];
          this.showBeadcrumb = true;

          this.getMenuNameFromUrl(custom_url).subscribe(res=>{

           if(res != null){
              this.menuRow = res;
              this.showNavDisplayTitle = this.menuRow.display_name;
              this.showNavTitle = this.menuRow.name;
           }else{
            this.showNavDisplayTitle =  event.url.split('/')[2];
            this.showNavTitle = event.url.split('/')[2];
           }

          });

        }
      }
    }); 

  }

  colorLuminance=(hex, lum) =>{

   
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
  
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
  
    return rgb;
  }


}

