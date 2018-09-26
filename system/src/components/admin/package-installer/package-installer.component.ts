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
  templateUrl: './package-installer.component.html',
  styleUrls: ['./package-installer.component.css']
})
export class MagpiePackageInstallerComponent implements OnInit {
  @Input()
    packages: any;
    title = "Packages";
    packages_error:any;
    packagesData:any;
    message = '';
    data: any;
    result_data:any;
    packageInstallerForm: FormGroup;
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService) {
     
    }

  ngOnInit(){

   if(localStorage.getItem("userDetails['roles_id']") == '1'){
      this.section_service.getPackagesInstaller().subscribe(res => {
        this.packagesData = res;
      });
    }else
      this.router.navigate(['/admin/dashboard']);
    
  }

  installPackage = (pkg)=>{

    if(localStorage.getItem("userDetails['roles_id']") == '1'){
      this.section_service.installPackage(pkg.command_line_code).subscribe(res => {
      //  this.packagesData = res;

      console.log(res);
      });
    }else
      this.router.navigate(['/admin/dashboard']);

  }


  onSearchChange = (value)=>{

    if(localStorage.getItem("userDetails['roles_id']") == '1'){
      this.section_service.searchPackagesInstaller(value).subscribe(res => {
        this.packagesData = res;
      });
    }else
      this.router.navigate(['/admin/dashboard']);


  }



}