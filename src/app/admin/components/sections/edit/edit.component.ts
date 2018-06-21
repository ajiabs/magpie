
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from './../../../section.service';
import { FormGroup,  FormBuilder,  Validators,FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
declare var $: any;


@Component({
  selector: 'app-edit',
  templateUrl: '././edit.component.html',
  styleUrls: ['././edit.component.css']
})
export class SectionEditComponent implements OnInit {

  section_data: any;
  columns:any;
  section_alias:any;
  title:any;
  sectionForm: FormGroup;
  edit_action:any;
  actions:any;
  column_config:any;
  custom:any[];
  file_inputs:any[];
  tagsElement: any;
  public options: Select2Options;
  getAllMenus:any;
  constructor(private route: ActivatedRoute, private router: Router, private service: SectionService, private fb: FormBuilder) {
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
        if(this.custom.length>0){
        
         this.section_data[field] =  JSON.stringify({"selected_values":this.custom});
        
       
         }
        else
         this.section_data[field] = "";

     
    }

  }

  tagsChange = (field,data: {value: string[]})=>{
      if(data.value.length>0)
       this.section_data[field] =  JSON.stringify({"selected_values":data.value});
      else
       this.section_data[field] = "";

  }



  update = () =>{
  
   
  this.route.params.subscribe(params => {

   this.section_data['file_fields'] =  this.file_inputs;
   this.service.update(this.section_data,this.router.url);
   this.router.navigated = false;
   this.router.navigate(['admin/'+this.section_alias]);


    $.notify({
      title: "Update! ",
      message: "Record has been updated.",
      icon: 'fa fa-check' 
    },{
      type: "success"
    });

  });
}

deleteFile = (id,column)=>{
  this.route.params.subscribe(params => {

   var th = this;
   this.service.deleteFile(id,column, this.section_data._id,this.router.url).subscribe(res => {

      th.service.edit(params['id'],th.router.url).subscribe(res => {
            var dt  = res;
                    
            th.section_data = dt;
            
          });


   });
    $.notify({
      title: "Deleted! ",
      message: "File has been unlinked.",
      icon: 'fa fa-check' 
    },{
      type: "success"
    });

  });

}

fileChangeEvent = (fileInput: any,field) =>{
    var files = [];
    for ( var index=0; index<fileInput.target.files.length; index++ ) {

      files.push(fileInput.target.files[index]);
    }
    this.section_data[field] = files;

   
}





  ngOnInit() {
    var th_service = this.service; 
    var th_router = this.router; 

    this.route.params.subscribe(params => {
    
      
      this.service.sectionConfig(this.router.url).subscribe(res => {


        this.service.getRolePermissionMenus('menus').subscribe(res1 => {
           
            var config_columns  = JSON.parse(res[0].section_config).column; 
            var th_tags = [];
            var th_files = [];

            config_columns.forEach(function (rowItem) { 
            
              if((rowItem.type == 'tags' || rowItem.type == 'selectbox' || rowItem.type == 'checkbox' || rowItem.type == 'radio') && rowItem.source_type == 'dynamic'){
                  th_service.customRoute(th_router.url,rowItem.source_from).subscribe(res => {

                      if(rowItem.type == 'tags'){

                          var data_tags = [];
                          for(var k in res){
                            data_tags.push({'id':res[k].value,'text':res[k].label});
                          }
                          th_tags.push(rowItem.field);
                          rowItem.source = data_tags;
                      }
                      
                      else
                      rowItem.source = res;
                  });
              }


            
                if(rowItem.type == 'file' || rowItem.type == 'image')
                  th_files.push(rowItem.field);
          
            });

            this.file_inputs = th_files;
            this.title = res[0].section_name;
            this.section_alias = res[0].section_alias;
            this.actions =  JSON.parse(res[0].section_config).opertations;
            this.edit_action = this.actions.indexOf('edit') != -1?true:false;
            if(this.edit_action){
              this.section_data = this.service.edit(params['id'],this.router.url).subscribe(res => {
                var dt  = res;
                for(var k in th_tags){
                    var obj = JSON.parse(dt[th_tags[k]]);
                    dt[th_tags[k]+'_tags'] = Object.keys(obj).map(function(k) { return obj[k] })[0];
                  
                }
                this.section_data = dt;
                this.columns = config_columns;
                this.getAllMenus  = res1;
              

                
                
              });

            }
          });




      });


    });


  

    this.options = {
      multiple: true
    }


  }


 
}