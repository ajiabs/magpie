import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../section.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,  FormBuilder,  Validators,FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: '././create.component.html',
  styleUrls: ['././create.component.css']
})
export class SectionCreateComponent implements OnInit {
  sectionForm: FormGroup;
  title:any;
  create_action:any;
  columns:any;
  section_alias:any;
  actions:any;
  section_data:any;
  custom:any[];
  file_inputs:any[];
  validation_fields_onload: Object = {};
  public options: Select2Options;
  getAllMenus:any;
  constructor(private route: ActivatedRoute, private router: Router,private service: SectionService, private fb: FormBuilder) {
    this.createForm();
   }
  createForm = () => {
    this.sectionForm = this.fb.group({});
    this.service.sectionConfig(this.router.url).subscribe(res => {
        var column_config  = JSON.parse(res[0].section_config).column;
        var column_validation = {}; 
        column_config.forEach(function(value, key) {
           
             var req = column_config[key]['validations'][0]['required'] == 'true'?Validators.required:'';
             column_validation[column_config[key]['field']] = ['', req ];
          
        });   


        this.sectionForm = this.fb.group(column_validation);



    });
  }

  checkboxChange = (field,value,checked) => {
   this.validation_fields_onload[field] = true;
    if(typeof this.section_data[field] !== 'undefined' && this.section_data[field] != ''){
         var obj = JSON.parse(this.section_data[field]);
         this.custom = Object.keys(obj).map(function(k) { return obj[k] })[0];
    }
    else
       this.custom = [];
   if(checked)
    {
        this.custom.push(value.toString());
        this.section_data[field] = JSON.stringify({"selected_values":this.custom});
    }else{
      
        this.custom.splice( this.custom.indexOf(value.toString()) , 1) ;
        if(this.custom.length>0)
         this.section_data[field] = JSON.stringify({"selected_values":this.custom});
        else
         this.section_data[field] = "";
     
    }

  }

  tagsChange = (field,data: {value: string[]})=>{
      if(data.value.length>0){
         this.section_data[field] =  JSON.stringify({"selected_values":data.value});
         this.validation_fields_onload[field] = true;
       }
      else
       this.section_data[field] = "";

  }




  add = () => {

      this.section_data['file_fields'] =  this.file_inputs;
      this.service.add(this.section_data,this.router.url);
      this.router.navigated = false;
      this.router.navigate(['admin/'+this.section_alias+'/index']);
      $.notify({
        title: "Added! ",
        message: "New Record has been added.",
        icon: 'fa fa-check' 
      },{
        type: "success"
      });
  }

  fileChangeEvent  = (fileInput: any,field) => {
    var files = [];
    for ( var index=0; index<fileInput.target.files.length; index++ ) {

      files.push(fileInput.target.files[index]);
    }
    this.section_data[field] = files;
   
}


  ngOnInit() {
    var th_service = this.service; 
    var th_router = this.router; 


  

   this.service.sectionConfig(this.router.url).subscribe(res => {

     this.service.getRolePermissionMenus('menus').subscribe(res1 => {
           this.getAllMenus  = res1;


            var column_config = JSON.parse(res[0].section_config).column;
            var th_files = [];
            var th =this;
            column_config.forEach(function (rowItem) { 
             
               if((rowItem.type == 'tags' || rowItem.type == 'selectbox' || rowItem.type == 'checkbox' || rowItem.type == 'radio') && rowItem.source_type == 'dynamic'){
                  th_service.customRoute(th_router.url,rowItem.source_from).subscribe(res => {
                        rowItem.source = res;
                  });
                  if(rowItem.type == 'tags' || rowItem.type == 'custom')
                      th.validation_fields_onload[rowItem.field] = false;
               
               }
               if(rowItem.type == 'file' || rowItem.type == 'image')
                  th_files.push(rowItem.field);
           
            });
             this.columns = column_config;

            

            this.file_inputs = th_files;
            this.title = res[0].section_name;
            this.section_alias = res[0].section_alias;
            this.actions =  JSON.parse(res[0].section_config).opertations;
            this.create_action = this.actions.indexOf('create') != -1?true:false;
      
            this.section_data = {};
            if(!this.create_action){
              this.router.navigate(['/admin/dashboard']);

            }



           
     });




      
    


    });



    this.options = {
      multiple: true
    }
  }






}
