import { Component, OnInit,Input,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var notifier: any;
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
    packagesData:any =[];
    packageConfigData:any;
    package_form_data:any={};
    message = '';
    data: any;
    result_data:any;
    packageInstallerForm: FormGroup;
    configuration_keys:any;
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService) {
      this.packageInstallerForm = this.fb.group({});
    }

  ngOnInit(){

      if(localStorage.getItem("userDetails['roles_id']") == '1'){
        var th = this;
        this.route.params.subscribe(params => {
          th.title = params['pacakge'];
          th.section_service.getOnePackagesInstaller(params['pacakge']).subscribe(res => {
            th.packagesData = res;
            var column_validation={};
            var keys = JSON.parse(res['configuration_keys']);
            var resultArray = Object.keys(keys).map(function(value){
            let configurations = keys[value];
            column_validation[configurations] = ['', Validators.required ];
            return configurations;
            });
            this.packageInstallerForm = this.fb.group(column_validation);
            this.configuration_keys = resultArray;

          

          
          });

          th.section_service.getPackageData(params['pacakge']).subscribe(res => {
            this.packageConfigData = res;
            var package_config = JSON.parse(this.packageConfigData.package_config);
            Object.keys(package_config).map(function(value){
              th.package_form_data[value] = package_config[value];
            });
          });



        });

      
      }else
        this.router.navigate(['/admin/dashboard']);
  

    
  }

  configureUpdate =()=>{

      if(localStorage.getItem("userDetails['roles_id']") == '1'){
        this.packageConfigData.package_config = JSON.stringify(this.package_form_data);
          this.section_service.updatePackageConfiguration( this.packageConfigData).subscribe(res => {
            this.packagesData = res;
            new notifier({title: "Update! ", message: "Configuration has been updated.", icon: 'fa fa-check',type: "success"});


        });

      }else
        this.router.navigate(['/admin/dashboard']);
     
    }



}