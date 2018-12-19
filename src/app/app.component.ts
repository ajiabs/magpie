import { MagpieComponent } from './../../system/src/magpie.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SectionService } from './../../system/src/services/admin/section.service';
import { Meta,Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent extends  MagpieComponent {
  angular_part:any=false;
  package_installer:any = false;
  menuRow:any;

  constructor(router: Router,route: ActivatedRoute, http: HttpClient,section_service: SectionService,private meta: Meta,private titleService: Title) {
    super(route,router,http,section_service)


  }
  ngOnInit() {
       
    // this.meta.addTags([
    //   {name: 'description', content: ''},
    //   {name: 'author', content: ''},
    //   {name: 'keywords', content: ''}
    //   ]);

    var th = this;

    if (localStorage.getItem('jwtToken')) {

        th.showNav = true;
        th.login_name = localStorage.getItem("userDetails['name']");
        th.login_id = localStorage.getItem("userDetails['users_id']");
        th.login_image = localStorage.getItem("userDetails['image']");
      
        th.isLoggedIn().subscribe(res=>{
            th.roles_menu = res;
        });
    

        th.package_installer = localStorage.getItem("userDetails['roles_id']") == '1'?true:false;
        th.section_service.getUserRole(localStorage.getItem("userDetails['roles_id']")).subscribe(res => {
            th.login_role = res['name'];

        });

      } else 
      {
        th.showNav = false;
      }


    if(localStorage.getItem("current_segment") == 'admin'){

        
      //Admin script
      this.admin_script_init();

      th.angular_part = true;
      th.section_service.getThemeColorSettings().subscribe(res=>{
          $("body").css({"--some-color-dark":this.colorLuminance(res[0].value, -0.3),"--some-color":this.colorLuminance(res[0].value, 0),"--some-hovercolor":this.colorLuminance(res[0].value, -0.2)});
  
        });
        th.section_service.getWebsiteNameSettings().subscribe(res=>{
          th.website_name = res[0].value;
          th.titleService.setTitle(this.website_name );
        });
      
    }


    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd ) {
        if(event.urlAfterRedirects == '/admin/login'){
          this.showNav = false;
        }else{

          var newUrl = event.url.split("?");
          if (newUrl[0] == '/admin/reset-password') {
            this.showNav = false;
          } else {



              var url = event.urlAfterRedirects.split("/");
              var custom_url = url[1]+"/"+url[2];
            
              th.showNavMethod = event.urlAfterRedirects.split('/')[3] != undefined && event.urlAfterRedirects.split('/')[3].split('?')[0]?event.urlAfterRedirects.split('/')[3].split('?')[0]:event.urlAfterRedirects.split('/')[3];
              th.showBeadcrumb = true;

              th.getMenuNameFromUrl(custom_url).subscribe(res=>{

              if(res != null){
                  th.menuRow = res;
                  th.showNavDisplayTitle = this.menuRow.display_name;
                  th.showNavTitle = this.menuRow.name;
              }else{
                th.showNavDisplayTitle =  event.urlAfterRedirects.split('/')[2];
                th.showNavTitle = event.urlAfterRedirects.split('/')[2];
              }

              });
            }

        }
      }
    });
  


  }

  admin_script_init=()=>{
      setTimeout(function(){
        $('.login-content [data-toggle="flip"]').click(function() {
            $('.login-box').toggleClass('flipped');
            return false;
          });
      

          
    },1000)



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

