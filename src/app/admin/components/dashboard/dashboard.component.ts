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
  users_count:any;
  constructor(route: ActivatedRoute, router: Router, fb: FormBuilder, http: HttpClient,section_service:SectionService,private dashboard_service:DashboardService) {
    super(route,router,fb,http,section_service);
   }
  ngOnInit(){
    this.dashboard_service.getUsersCount(this.router.url).subscribe(res => {
      this.users_count = res;

    });

    this.pie_data =  [
      {
        value: "500",
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Complete"
      },
      {
        value: "50",
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "In-Progress"
      }
    ];

    this.line_data = {"labels":["January", "February", "March", "April", "May"],"data":["28", "48", "40", "19", "86"]};


  }
  



}