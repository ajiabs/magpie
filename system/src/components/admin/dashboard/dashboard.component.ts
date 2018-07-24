import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class MagpieDashboardComponent implements OnInit,OnDestroy {
  @Input()
    line:any="line";
    pie:any="pie";
    pie_data:any;
    line_data:any;
    title = "Dashboard";
    navigationSubscription:any
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

  ngOnInit() {
    this.pie_data =  [
      {
        value: "300",
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