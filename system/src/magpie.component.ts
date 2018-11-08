import { Component,Input,EventEmitter,Output } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SectionService } from './../../system/src/services/admin/section.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
@Component({
  selector: 'app-site',
  templateUrl: './magpie.component.html',
  styleUrls: ['./magpie.component.css']
})

export class MagpieComponent {
  @Input()
    title = '';
    showNav = true;
    showBeadcrumb = true;
    showNavTitle = "";
    showNavDisplayTitle="";
    showNavMethod = "";
    login_name = "";
    login_id = "";
    login_image = "";
    login_role = "";
    all_menus:any;
    roles_menu:any;
    website_name:any
   
  constructor(public route: ActivatedRoute, public router: Router,public http_client: HttpClient,public section_service: SectionService) {
  }
  ngOnInit() {
  }

   @Input()
    logout = () => {
      localStorage.removeItem('jwtToken');
      window.location.href = "/admin/login";
    }

    @Input()
      getMenuNameFromUrl=(url)=>{
        return new Observable((observer) => {
        this.section_service.getMenuNameFromUrl('menus',url).subscribe(res => {
          var menuRow = res;
          return  observer.next(menuRow);
        });
      });
      }

    @Input()
    isLoggedIn   = () =>{
    return new Observable((observer) => {
            this.section_service.getAllMenus('menus').subscribe(res => {
              this.section_service.getCurrentRolePermissionMenus('roles',localStorage.getItem("userDetails['roles_id']")).subscribe(res1 => {
                var current_roles_menus = JSON.parse(res1[0].permissions).sections;
                var menus = [];
                var all_menus = [];
                var k = 0;
                for (var i = 0; i < current_roles_menus.length; i++) {
                
                  var  module_actions = current_roles_menus[i].actions;
                  for(var j=0;j<module_actions.length;j++){
                    var  module = current_roles_menus[i];
                    if(current_roles_menus[i].actions[j].name == module.name.split(' ').join('-')+'-Index' && current_roles_menus[i].actions[j].perm == 'true'){
                      var module_key = Object.keys(res).find(x => res[x].name === module.name);
                    
                      menus[k] = res[module_key];
                      k++;
    
                    }
                  }
    
                }

                var tmp_main = [];
                var main_menu = [];
                var k = 0;

              
                var sortedMenus = Object.keys(menus).sort( function(keyA, keyB) {
                  if(typeof menus[keyB] != 'undefined')
                     return (menus[keyA].menu_order - menus[keyB].menu_order);
                });

               
              
                sortedMenus.forEach(function(element) {
                  var i = element;
                if(menus[i] != undefined){
                 
                    var parent_key = Object.keys(res).find(x => res[x].menus_id === Number.parseInt(menus[i].parent_id));
                    if(tmp_main.indexOf(res[parent_key].name) == -1){
                      tmp_main.push(res[parent_key].name);
                      main_menu.push({"name":res[parent_key].name,"icon":res[parent_key].icon,"sub":[menus[i]],"submenu":[menus[i].url.split('/')[1]]});
                      k++;
                    }
                    else{
    
                      var tmp_key = Object.keys(main_menu).find(x => main_menu[x].name === res[parent_key].name);
                      main_menu[tmp_key]['sub'].push(menus[i]);
                      main_menu[tmp_key]['submenu'].push(menus[i].url.split('/')[1]);
                    
                    }
                  }
                    
                });

                
                
            
                return observer.next(main_menu);
                  
              });

            });

      });
    }
}