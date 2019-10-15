import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { MagpieIndexComponent } from './../../../../../../system/src/components/admin/index/index.component';
import { SectionService } from './../../../../../../system/src/services/admin/section.service';
import { WebsocketService } from './../../../../../../system/src/services/admin/websocket.service';
import { ExportService } from './../../../../../../system/src/services/admin/export.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DashboardService } from './../../../../../../src/app/admin/services/dashboard.service';
import { environment } from './../../../../../../src/environments/environment';
declare var swal: any;
declare var $: any;


var server_url = environment.server_url;
@Component({
  selector: 'admin-users-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class UsersIndexComponent extends  MagpieIndexComponent {
  roles_array:any=['Developer'];
  login_as_action:boolean=false;
  constructor(route: ActivatedRoute, router: Router, fb: FormBuilder, http: HttpClient,section_service:SectionService,spinnerService: Ng4LoadingSpinnerService,webSocketService: WebsocketService,exportService:ExportService) {
    super(route,router,fb,http,section_service,spinnerService,webSocketService,exportService);
   }
  ngOnInit(){
    this.webSocketService.joinRoom({room:1});
    if(this.roles_array.indexOf(localStorage.getItem("userDetails['role_name']")) != -1)
      this.login_as_action = true;
    this.index();
  }

  onLoginAs=(id)=>{


    this.section_service.autoLoginAs(this.router.url,id,(res) => {
      if(res.success){

        console.log(res,"==============")
        window.open(server_url+"autologin/"+res.token+"/"+res.todays_date, "_blank");
    
      }
        
    });
       
  }
  



}