import { Component, OnInit,Input,Output,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators,AbstractControl } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import {ImageValidator} from './../../../../../system/src/validators/image.validators'

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class MagpieSettingsComponent implements OnInit {
   @Input()
   
   
    columns:any;
    file_inputs:any[];
    settingsForm: FormGroup;
    settings_form_data:any;
 
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService,public ref:ChangeDetectorRef) {
      this.settingsForm = this.fb.group({});
      this.section_service.getSettings('/admin/general-settings').subscribe(res => {
       var  column_validation = {};
     
        Object(res).forEach(rowItem=>{
           var validation_array = []; 
           validation_array.push(Validators.required);
           if(rowItem.type == 'email')
            validation_array.push(Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'));
           if(rowItem.type == 'image'){
            validation_array.push(ImageValidator.imageExtensionValidator(["image/jpeg","image/jpg","image/png"]));
            validation_array.push(ImageValidator.imageSizeValidator(1));
           }
            column_validation[rowItem.slug] = ['', validation_array ];
          
        });
        this.settingsForm = this.fb.group(column_validation);
      });
     
    }

  ngOnInit(){
    this.init();

  }

  onFileChangeEvent = (fileInput: any,field) =>{
    var files = [];
    for ( var index=0; index<fileInput.target.files.length; index++ ) {

      files.push(fileInput.target.files[index]);
    }
    this.settings_form_data[field] = files;
   
    this.ref.detectChanges();
  }
 

  settingsUpdate = () =>{

     this.section_service.updateSettings(this.settings_form_data,'/admin/general-settings').subscribe(res=>{
     
      this.ngOnInit();
     });
     $.notify({
        title: "Update! ",
        message: "Settings has been updated.",
        icon: 'fa fa-check' 
      },{
        type: "success"
      });
  
  
  }

  
  init = () =>{
  
    var settings_data = {};
    var th_files = [];
    this.section_service.getSettings('/admin/general-settings').subscribe(res => {
       Object(res).forEach(rowItem=>{
         
        // column_validation[rowItem.slug] = ['', Validators.required ];
         var row_slug = rowItem.slug;
         if(rowItem.type == 'image')
           th_files.push(rowItem.slug);
        
         settings_data[row_slug] = rowItem.value;
         

       });
       this.settings_form_data =settings_data;
       this.settings_form_data['file_fields'] = th_files;
       this.columns=res;
    });

  }

  

}