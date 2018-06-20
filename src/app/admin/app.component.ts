import { Component } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { SectionService } from './section.service';
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
  all_menus:any;
  roles_menu:any;
  constructor(private route: ActivatedRoute, private router: Router,private service: SectionService) {


  }
  ngOnInit() {
  this.isLoggedIn();
 

  }
    isLoggedIn = () => {
     

      if (localStorage.getItem('jwtToken')) {
        this.showNav = true;
        this.login_name = localStorage.getItem("userDetails['name']");
        this.login_id = localStorage.getItem("userDetails['users_id']");
      

      } else {
        this.showNav = false;
      }


      this.service.getAllMenus('menus').subscribe(res => {

        this.service.getCurrentRolePermissionMenus('roles',localStorage.getItem("userDetails['roles_id']")).subscribe(res1 => {
              var current_roles_menus = JSON.parse(res1[0].permissions).sections;
              var menus = [];
              var all_menus = [];
              var k = 0;
              for (var i = 0; i < current_roles_menus.length; i++) {
                var  module_actions = current_roles_menus[i].actions;
                for(var j=0;j<module_actions.length;j++){
                   var  module = current_roles_menus[i];
                   if(current_roles_menus[i].actions[j].name == module.name+'-Index' && current_roles_menus[i].actions[j].perm == 'true'){
                    var module_key = Object.keys(res).find(x => res[x].name === module.name);
                   
                    menus[k] = res[module_key];
                    k++;

                   }
                }

              }
              var tmp_main = [];
              var main_menu = [];
              var k = 0;
              for(var i =0;i<menus.length;i++){

                var parent_key = Object.keys(res).find(x => res[x].menus_id === Number.parseInt(menus[i].parent_id));
                if(tmp_main.indexOf(res[parent_key].name) == -1){
                  tmp_main.push(res[parent_key].name);
                  main_menu.push({"name":res[parent_key].name,"icon":res[parent_key].icon,"sub":[menus[i]]});
                  k++;
                }
                else{

                   var tmp_key = Object.keys(main_menu).find(x => main_menu[x].name === res[parent_key].name);
                   main_menu[tmp_key]['sub'].push(menus[i]);
                
                }
                  
              }
              
             this.roles_menu = main_menu;
            
       
            
        });

      });
     

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


  logout = () => {
    localStorage.removeItem('jwtToken');
    // this.router.navigate(['login']);
     window.location.href = "/admin/login";
  }

  
 
}