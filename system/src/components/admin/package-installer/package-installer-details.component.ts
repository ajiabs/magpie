import { Component, OnInit,Input,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-package-installer',
  templateUrl: './package-installer-details.component.html',
  styleUrls: ['./package-installer.component.css']
})
export class MagpiePackageInstallerDetailsComponent implements OnInit {
  @Input()
    packages: any;
    title = "";
    packages_error:any;
    packagesData = { search:'' };
    message = '';
    data: any;
    result_data:any;
    packageInstallerForm: FormGroup;
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService) {
    //   this.packageInstallerForm = this.fb.group({
    //     email: ['', [Validators.required]]
  
    //  });
     
     
    }

  ngOnInit(){
    this.route.params.subscribe(params => {
     this.title = params['pacakge'];
    });
    
  }

    // checkLogin = (data) =>{

    //     this.section_service.checkLogin(data).subscribe(res=>{

    //       this.data = res;
  
    //       if(this.data.success){
    //          localStorage.setItem('jwtToken', this.data.token);
    //          localStorage.setItem("userDetails['email']", this.data.result.email);
    //          localStorage.setItem("userDetails['name']", this.data.result.name);
    //          localStorage.setItem("userDetails['users_id']", this.data.result.users_id);
    //          localStorage.setItem("userDetails['roles_id']", this.data.result.roles_id);
    //          localStorage.setItem("userDetails['image']", this.data.result.image);
    //          window.location.href = "/admin/dashboard";
    //       }else
    //         this.login_error = this.data.msg;
         

    //     });
   
    // }



}