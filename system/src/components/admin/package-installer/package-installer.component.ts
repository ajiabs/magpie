import { Component, OnInit,Input,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { environment } from './../../../../../src/environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;
declare var notifier: any;


var loading_img_url = environment.loading_image;
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
    installing:any={};
    data: any;
    result_data:any;
    localPackages:any;
    installedPackages:any;
    package_url:any=environment.package_url;
    packageInstallerForm: FormGroup;
    template: string ='<img class="custom-spinner-template" src="'+loading_img_url+'">';
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService,public spinnerService: Ng4LoadingSpinnerService) {
     
    }

  ngOnInit(){
   this.getInstallerPackage();
 
    
  }

  getInstallerPackage =()=>{
    this.spinnerService.show();
    if(localStorage.getItem("userDetails['roles_id']") == '1'){
      this.section_service.getPackagesInstaller().subscribe(res => {
        var th = this;
        th.section_service.installedPackages().subscribe(pkgs => {
            var packages = [];
            if(pkgs  != null){
              Object.keys(pkgs).forEach(key => {
             
                  packages.push(pkgs[key]['package_name']);
                  
              });
            
            }
          
           
            Object.values(res).forEach(element => {
              th.installing[element.package_name]  = false;
            });

            
          
          
            th.installedPackages = Object.values(res).filter(({package_name}) => packages.includes(package_name));
            th.localPackages = packages;
            th.packagesData = res;
            this.spinnerService.hide();
        });
      });
    }else
      this.router.navigate(['/admin/dashboard']);
  }

  installPackage = (pkg)=>{
     this.installing[pkg.package_name]  = true;
    if(localStorage.getItem("userDetails['roles_id']") == '1'){
      this.section_service.installPackage(pkg).subscribe(res => {

        new notifier({title:"Success! ", message:  pkg.package_name+" plugin has been installed.", icon: 'fa fa-check',type: "success"});

        this.getInstallerPackage();
        
      });
    }else
      this.router.navigate(['/admin/dashboard']);

  }


  onSearchChange = (value)=>{
    this.spinnerService.show();
    if(localStorage.getItem("userDetails['roles_id']") == '1'){
      this.section_service.searchPackagesInstaller(value).subscribe(res => {
        this.packagesData = res;
        this.spinnerService.hide();
      });
    }else
      this.router.navigate(['/admin/dashboard']);


  }



}