import { MagpieComponent } from './../../system/src/magpie.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SectionService } from './../../system/src/services/admin/section.service';
import { WebsocketService } from './../../system/src/services/admin/websocket.service';
import { Meta,Title } from '@angular/platform-browser';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
declare var getStarted:any;
declare var $: any;
declare var notifier: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent extends  MagpieComponent {
  admin_part:any=false;
  package_installer:any = false;
  menuRow:any;
  

  constructor(router: Router,route: ActivatedRoute, http: HttpClient,section_service: SectionService,authguard:AuthGuard,private meta: Meta,private titleService: Title,private webSocketService:WebsocketService) {
    super(route,router,http,section_service,authguard);
    this.webSocketService.createItemMessageReceived().subscribe(data => {
      new notifier({title: "Success! ", message: data.message, icon: 'fa fa-check',type: "success"});
    });
    this.webSocketService.updateItemMessageReceived().subscribe(data => {
        new notifier({title: "Success! ", message: data.message, icon: 'fa fa-check',type: "success"});
    });
    this.webSocketService.deleteItemMessageReceived().subscribe(data => {
     new notifier({title: "Success! ", message: data.message, icon: 'fa fa-check',type: "success"});
    });



  }
  ngOnInit() {
       
    // this.meta.addTags([
    //   {name: 'description', content: ''},
    //   {name: 'author', content: ''},
    //   {name: 'keywords', content: ''}
    //   ]);


    var th = this;
    var local_sessions_details=[];
    if(localStorage.getItem("current_segment") == 'admin'){

   
      if (typeof localStorage.getItem('jwtToken') != undefined && localStorage.getItem('jwtToken') != null ) {

      
       
        var session_data =[];
        session_data['jwtToken'] = sessionStorage.getItem("session_storage_user['jwtToken']")!=null?sessionStorage.getItem("session_storage_user['jwtToken']"):localStorage.getItem("jwtToken");
        session_data['todays_date'] =  sessionStorage.getItem("session_storage_user['todays_date']")!=null?sessionStorage.getItem("session_storage_user['todays_date']"):localStorage.getItem("todays_date");
        session_data['email'] =  sessionStorage.getItem("session_storage_user['email']")!=null?sessionStorage.getItem("session_storage_user['email']"):localStorage.getItem("userDetails['email']");
        session_data['name'] =  sessionStorage.getItem("session_storage_user['name']")!=null?sessionStorage.getItem("session_storage_user['name']"):localStorage.getItem("userDetails['name']");
        session_data['users_id'] =  sessionStorage.getItem("session_storage_user['users_id']")!=null?sessionStorage.getItem("session_storage_user['users_id']"):localStorage.getItem("userDetails['users_id']");
        session_data['roles_id'] =  sessionStorage.getItem("session_storage_user['roles_id']")!=null?sessionStorage.getItem("session_storage_user['roles_id']"):localStorage.getItem("userDetails['roles_id']");
        session_data['role_name'] =  sessionStorage.getItem("session_storage_user['role_name']")!=null?sessionStorage.getItem("session_storage_user['role_name']"):localStorage.getItem("userDetails['role_name']");
        session_data['image'] =  sessionStorage.getItem("session_storage_user['image']")!=null?sessionStorage.getItem("session_storage_user['image']"):localStorage.getItem("userDetails['image']");
        this.authguard.setSessions(session_data);

        if(localStorage.getItem('jwtToken') == null)
        {
          this.authguard.setSessions(session_data);
          this.router.navigate(['/admin/login']);
        }
        
        this.section_service.userDetailsFromToken((data) => {
          if(data['success']){
            if(data['result'].roles_id != localStorage.getItem("userDetails['roles_id']") || data['result'].users_id != localStorage.getItem("userDetails['users_id']") ){
              this.authguard.setSessions(session_data);
              this.router.navigate(['/admin/login']);
            }
          }
        });



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


        
      //Admin script
      this.admin_script_init();

      th.admin_part = true;
      th.section_service.getThemeColorSettings().subscribe(res=>{
          $("body").css({"--some-color-dark":this.colorLuminance(res[0].value, -0.3),"--some-color":this.colorLuminance(res[0].value, 0),"--some-hovercolor":this.colorLuminance(res[0].value, -0.2)});
  
        });
        th.section_service.getWebsiteNameSettings().subscribe(res=>{
          th.website_name = res[0].value;
          th.titleService.setTitle(this.website_name );
        
        });




        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd ) {
            if (typeof sessionStorage.getItem('jwtToken') != undefined && localStorage.getItem('jwtToken') != null) 
               this.authguard.setSessions(session_data);
               if(event.urlAfterRedirects == '/admin/dashboard'){
                  setTimeout(()=>{
                    new getStarted([
                      {
                        'element': "#profile-logo", 
                        'title': "Profile Info",
                        "description": "Profile Name,Role",
                        "position": "right"  
                      },
                      { 'element': "#Dashboard", 
                        'title': "Dashboard page",
                        "description": "Welcome to magpie",
                        "position": "right" }]);
                  },1000);

                }
          
           if(event.url.split('/')[1] == 'admin'){
              th.section_service.getAllModules().subscribe(res1=>{
                var current_modules = ['login','dashboard','reset-password','account','settings','package-installer','404','autologin'];
                if(typeof res1 == 'object'){
                    Object.keys(res1).forEach(key => {
                
                      current_modules.push(res1[key]['url'].split('/')[1]);
                    });
                  }
                if (current_modules.indexOf( event.url.split('/')[2]) < 0) {
                  this.router.navigate(['/admin/404']);
                }

              });
              
            }
  

           
             if(event.urlAfterRedirects == '/admin/login'){
              if (typeof localStorage.getItem('jwtToken') != undefined) 
                this.authguard.removeLocalStorageSessions();
                this.authguard.removeSessionStorageSessions();
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
                       th.titleService.setTitle(th.website_name + ' | ' + th.showNavDisplayTitle);
                       if(th.showNavDisplayTitle != 'Dashboard')
                         th.showNavTitle = this.menuRow.name;
                       else
                         th.showNavTitle = undefined;
                   }else{
                     
     
                     th.showNavDisplayTitle =  event.urlAfterRedirects.split('/')[2];
                     th.titleService.setTitle(th.website_name + ' | ' + th.showNavDisplayTitle.replace("-"," "));
                     th.showNavTitle = event.urlAfterRedirects.split('/')[2];
     
                    
                   }
     
                   });
                 }
     
             }


             
           }
         });

      
    }


  
  


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

