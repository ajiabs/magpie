import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MagpieDashboardComponent } from './../../../../../system/src/components/admin/dashboard/dashboard.component';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { DashboardService } from './../../../../../src/app/admin/services/dashboard.service';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends  MagpieDashboardComponent {
  static_menus_count:any;
  static_users_count:any;
  dynamic_users_count:any;

  users_count:any;
  pie_data:any;
  dashboard_config:any;
  constructor(route: ActivatedRoute, router: Router, fb: FormBuilder, http: HttpClient,section_service:SectionService,private dashboard_service:DashboardService) {
    super(route,router,fb,http,section_service);
   }
  ngOnInit(){



  this.pie_data =  [
      {
        value: "45",
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Complete"
      },
      {
        value: "55",
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "In-Progress"
      }
    ];

    this.dashboard_service.getCountStaticMenus().subscribe(res => {
      this.static_menus_count = res;
    });
    this.dashboard_service.getCountStaticUsers().subscribe(res => {
      this.static_users_count = res;
    });
    this.dashboard_service.getCountDynamicUsers().subscribe(res => {
      this.dynamic_users_count = res;
    });


          this.dashboard_service.getDashboardConfig(localStorage.getItem("userDetails['roles_id']")).subscribe(res => {
        
            
          Object.keys(res).forEach((v)=>{
              res[v]['entity_config']  = JSON.parse(res[v]['entity_config']);
              if(res[v]['entity_config']['source_type'] == 'dynamic'){
                this.dashboard_service.dashboardCustomRoute(res[v]['entity_config']['routes'],res[v]['entity_config']['value']).subscribe(res1 => {
                    res[v]['entity_config']['value'] =  res1 ;

                });
              }
              res[v]['menus_actions'] = {};   
              if(res[v]['entity_type'] == 'list'){

                this.section_service.getCurrentRolePermissionMenus('roles',localStorage.getItem("userDetails['roles_id']")).subscribe(res1 => {
                    
                  var current_route = res[v]['entity_config']['routes'];
                  current_route = current_route.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                            return letter.toUpperCase();
                        });
                
                  var current_module = JSON.parse(res1[0].permissions).sections.filter(itm => itm.name == current_route);	
                  var menus_actions = [];
                  var i= 1;
                  current_module[0].actions.forEach(function (menuItem) {
                    menus_actions[menuItem['label']] = menuItem.perm == 'true'?true:false;
                  });
                res[v]['menus_actions'] = menus_actions;   
                });


              }

              if((parseInt(v) + 1) == Object.keys(res).length)
              {
                this.dashboard_config = res;
              }
          })

          
              
          
          });
  


    // this.dashboard_service.getUsersCount(this.router.url).subscribe(res => {
    //   this.users_count = res;
    // });

   

  //  this.line_data = {"labels":["January", "February", "March", "April", "May"],"data":["28", "48", "40", "19", "86"]};





  }
  



}