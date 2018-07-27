import { Component, OnInit,Input,Output,OnDestroy } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class MagpieProfileEditComponent implements OnInit {
   @Input()
    section_data: any;
    change_password_data: any= { new_password:'', confirm_password:'' };
    columns:any;
    file_inputs:any[];
    user_email_exist:any=false;
    profileEditForm: FormGroup;
    changePasswordForm :FormGroup;
    navigationSubscription:any;
    constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.profileEditForm = this.fb.group({});
          this.section_service.sectionConfig('/admin/users').subscribe(res => {
           
               var column_config  = JSON.parse(res[0].section_config).column;
               var column_validation = {}; 
               column_config.forEach(function(value, key) {
                   if(column_config[key]['field'] != 'roles_id'){
                    var req = column_config[key]['validations'][0]['required'] == 'true'?Validators.required:'';
                    column_validation[column_config[key]['field']] = ['', req ];
                   }
                  
                 
               });    

            
               this.profileEditForm = this.fb.group(column_validation);
              
           });
           this.changePasswordForm = this.fb.group({
            new_password: ['', Validators.required ],
            confirm_password: ['', Validators.required ]
          });
  
        }
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
    this.section_data[field] = files;

   
  }
  emailExist = (email)=>{
     this.section_service.checkEmailExist(email, localStorage.getItem("userDetails['users_id']")).subscribe(res=>{

      if( Object.keys(res).length >0)
       this.user_email_exist = true;
      else
       this.user_email_exist = false;


     });
  }

  accountUpdate = () =>{

  
     this.section_data['file_fields'] =  this.file_inputs;
     this.section_service.update(this.section_data,'/admin/users/');
     this.router.navigated = false;
     this.init();
     localStorage.setItem("userDetails['email']", this.section_data.email);
     localStorage.setItem("userDetails['name']", this.section_data.name);
    
   
      $.notify({
        title: "Update! ",
        message: "Account has been updated.",
        icon: 'fa fa-check' 
      },{
        type: "success"
      });
  
  
  }

  changePassword = () =>{
   
    this.section_service.changePassword( this.change_password_data ,'/admin/users/');
    this.router.navigated = false;
    this.router.navigate(['/admin/account']);
    this.init();
  
     $.notify({
       title: "Update! ",
       message: "Password has been changed.",
       icon: 'fa fa-check' 
     },{
       type: "success"
     });
 
  }

  init = () =>{

    var th = this.section_service;
    this.section_service.sectionConfig('/admin/users').subscribe(res => {
      var config_columns  = JSON.parse(res[0].section_config).column; 
      var th_files = [];
      config_columns.forEach(function (rowItem) { 
        if((rowItem.type == 'selectbox') && rowItem.source_type == 'dynamic'){
          th.customRoute('/admin/roles/',rowItem.source_from).subscribe(res1 => {

            rowItem.source = res1;
          });   
        }

        if(rowItem.type == 'image')
           th_files.push(rowItem.field);

       });
       this.file_inputs = th_files;

       th.getProfile(localStorage.getItem("userDetails['users_id']")).subscribe(res2 => {
         
        this.section_data = res2;
        this.columns = config_columns;

      });
    });
  }

  

}