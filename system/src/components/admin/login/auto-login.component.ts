import { Component, OnInit,Input,Output,OnDestroy } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { environment } from './../../../../../src/environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthGuard } from './../../../../../system/src/services/admin/auth-guard.service';
import { WebsocketService } from './../../../../../system/src/services/admin/websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;

var loading_img_url = environment.loading_image;
var server_url = environment.server_url;
@Component({
  selector: 'app-auto-login',
  templateUrl: './auto-login.component.html',
  styleUrls: ['./auto-login.component.css']
})
export class MagpieAutoLoginComponent implements OnInit,OnDestroy {
    navigationSubscription:any;
    template: string ='<img class="custom-spinner-template" src="'+loading_img_url+'">';
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService,public spinnerService: Ng4LoadingSpinnerService,public webSocketService: WebsocketService,private authguard:AuthGuard) {
   
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.spinnerService.show();
         
        }
      });
    }
  ngOnDestroy() {
    if (this.navigationSubscription) {  
        this.navigationSubscription.unsubscribe();
    }
  }
 
  ngOnInit(){
    this.redirectToSessionUser();
    //this.spinnerService.hide();
  }

    redirectToSessionUser = () =>{

      this.spinnerService.show();
          this.route.params.subscribe(params => {
          this.section_service.decodeToken(this.router.url,(res) => {
            var session_data =[];
            session_data['jwtToken'] = res.jwt_token;
            session_data['todays_date'] = res.todays_date;
            session_data['email'] =  res.data.email;
            session_data['name'] =  res.data.name;
            session_data['users_id'] =  res.data.users_id;
            session_data['roles_id'] =  res.data.roles_id;
            session_data['role_name'] =  res.data.role_name;
            session_data['image'] =  res.data.image;
            this.webSocketService.joinRoom({room:1});
            this.authguard.setSessions(session_data);
            window.location.href = server_url+'dashboard';



          });

      });

  
   
    }




}