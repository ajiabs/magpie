import { Component, OnInit,Input,Output,OnDestroy } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class MagpieViewComponent implements OnInit,OnDestroy {
   @Input()
      section_data: any;
      columns:any;
      section_alias:any;
      title:any;
      sectionForm: FormGroup;
      actions:any;
      column_config:any;
      custom:any[];
      file_inputs:any[];
      tagsElement: any;
      public options: Select2Options;
      getAllMenus:any;
      navigationSubscription:any;
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
        
        }
      });
     
    }
  ngOnDestroy() {
      if (this.navigationSubscription) {  
         this.navigationSubscription.unsubscribe();
      }
    }

  ngOnInit(){
    this.init();
  }

  init = () =>{

    var th_service = this.section_service; 
    var th_router = this.router; 
    this.section_service.getCurrentRolePermissionMenus('roles',localStorage.getItem("userDetails['roles_id']")).subscribe(res1 => {
   
      var current_route = this.router.url.split('/')[2].split("-").join(" ");
      current_route = current_route.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
     
      var current_module = JSON.parse(res1[0].permissions).sections.filter(itm => itm.name == current_route);	
      var menus_actions = [];
      current_module[0].actions.forEach(function (menuItem) {
         menus_actions.push(menuItem.label);
         menus_actions[menuItem['label']] = menuItem.perm == 'true'?true:false;
      });
       if(menus_actions['View']){  
          this.route.params.subscribe(params => {
            this.section_service.sectionConfig(this.router.url).subscribe(res => {
              this.section_service.getRolePermissionMenus('menus').subscribe(res1 => {
                
                  var config_columns  = JSON.parse(res[0].section_config).column; 
            

                  config_columns.forEach(function (rowItem) { 
                  
                    if((rowItem.type == 'tags' || rowItem.type == 'selectbox' || rowItem.type == 'checkbox' || rowItem.type == 'radio') && rowItem.source_type == 'dynamic'){
                       
                      if(th_router.url.split('/')[2] == 'users' || th_router.url.split('/')[2] == 'roles' || th_router.url.split('/')[2] == 'menus' || th_router.url.split('/')[2] == 'sections')
                        th_service.customRoute(th_router.url,rowItem.source_from).subscribe(res => {
                              rowItem.source = res;
                        });
                      else
                        th_service.adminCustomRoute(th_router.url,rowItem.source_from).subscribe(res => {
                          rowItem.source = res;
                        });


                    }


                
                  });

                
                  this.title = res[0].section_name;
                  this.section_alias = res[0].section_alias;
                  this.actions =  JSON.parse(res[0].section_config).opertations;
                  
                    this.section_service.view(params['id'],this.router.url).subscribe(res => {
          
                      this.section_data = res;
                      this.columns = config_columns;
                      this.getAllMenus  = res1;

                    });

                
                });

            });


          });

        }else
         this.router.navigate(['/admin/dashboard']);


      });


  }




}