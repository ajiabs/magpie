import { Component, OnInit,Input,Output,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import {ImageValidator} from './../../../../../system/src/validators/image.validators';
import { WebsocketService } from './../../../../../system/src/services/admin/websocket.service';
import { LatLngLiteral } from '@agm/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Select2OptionData } from 'ng2-select2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from './../../../../../src/environments/environment';
declare var notifier: any;
declare var swal: any;
declare var $: any;



var loading_img_url = environment.loading_image;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class MagpieCreateComponent implements OnInit,OnDestroy {
  @Input()
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
    date_format:String="dd/mm/yyyy";
    navigationSubscription:any;
    lat: number = 51.678418;
    lng: number = 7.809007;
    geo_address = "";
    user_email_exist:any=false;
    map: any;
    button:any;
    paths: Array<LatLngLiteral> = [];
    cordArray=[];
    geofence=[];
    template: string ='<img class="custom-spinner-template" src="'+loading_img_url+'">';

  constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService,public ref:ChangeDetectorRef,public spinnerService: Ng4LoadingSpinnerService,public webSocketService: WebsocketService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.spinnerService.show();
        this.sectionForm = this.fb.group({});
        this.section_service.sectionConfig(this.router.url).subscribe(res => {
            var column_config  = JSON.parse(res[0].section_config).column;
            var column_validation = {}; 
            column_config.forEach(function(value, key) {
              
              var validation_array = []; 
              if(column_config[key]['type'] == 'email')
                validation_array.push(Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'));
              if(typeof column_config[key]['validations'][0]['min_length'] !== "undefined")
                validation_array.push(Validators.minLength(column_config[key]['validations'][0]['min_length']));
              if(typeof column_config[key]['validations'][0]['file_type'] !== "undefined")
                validation_array.push(ImageValidator.imageExtensionValidator(column_config[key]['validations'][0]['file_type']));
              if(typeof column_config[key]['validations'][0]['file_size'] !== "undefined")
                validation_array.push(ImageValidator.imageSizeValidator(column_config[key]['validations'][0]['file_size']));
              if( column_config[key]['validations'][0]['required'] == 'true')
                validation_array.push(Validators.required);
            
              if(typeof column_config[key]['validations'][0]['pattern'] !== "undefined")
                    validation_array.push(Validators.pattern(column_config[key]['validations'][0]['pattern']));
            
              column_validation[column_config[key]['field']] = ['', validation_array ];
              
            });   
    
            this.sectionForm = this.fb.group(column_validation);
    
        });
       
      }
    });

  }
ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }


ngOnInit(){
  
    this.init();
   

  }

  emailExist = (email)=>{
 
    this.section_service.checkEmailExist(email,this.section_data.users_id).subscribe(res=>{
     if( Object.keys(res).length >0)
      this.user_email_exist = true;
     else
      this.user_email_exist = false;


    });
 }
create = () => {
    this.spinnerService.show();
    this.section_data['file_fields'] =  this.file_inputs;
    this.section_service.add(this.section_data,this.router.url,(result) => {
      this.router.navigated = false;
      this.router.navigate(['admin/'+this.section_alias]);
      this.spinnerService.hide();
      new notifier({title: "Added! ", message: "New Record has been added.", icon: 'fa fa-check',type: "success"});
      this.webSocketService.createItem({module:this.section_alias,room:1});
    });
       
     
     
  


}

onMapChangeEvent(selectedData:any,field) {
 
  if(selectedData.data != undefined){
      this.lat = selectedData.data.geometry.location.lat;
      this.lng = selectedData.data.geometry.location.lng;
      this.geo_address = selectedData.data.formatted_address;
      this.section_data[field] = JSON.stringify({"lat":this.lat,"lng":this.lng,"address":this.geo_address});
      this.validation_fields_onload[field] = true;
    }else{
      this.section_data[field] = "";
  }
}



onTagsChange = (field,data)=>{

    if(data.value.length>0){
      this.section_data[field] =  JSON.stringify({"selected_values":data.value});
      this.validation_fields_onload[field] = true;
    }
    else
    this.section_data[field] = "";
 
}


  

  onFileChangeEvent  = (fileInput: any,field) => {
   
        var files = [];
        for ( var index=0; index<fileInput.target.files.length; index++ ) {

          files.push(fileInput.target.files[index]);
        }
        this.section_data[field] = files;
        this.ref.detectChanges();
     
  
  }


  onCheckboxChange = (field,value,checked) => {

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

   deletePoly() {
  
    this.paths = [];
    this.cordArray = [];
   }

   public drawPolygon(evt, field) {

    if (this.validation_fields_onload[field] != undefined) {
  
      let coord = [evt.coords.lat, evt.coords.lng];
      this.cordArray.push(coord);
  
  
      let clickCrd = {
        lat: evt.coords.lat,
        lng: evt.coords.lng
      };
      this.paths.push(clickCrd);
      let newArray = Array < LatLngLiteral > ();
  
      this.paths.forEach((item) => {
        newArray.push(item);
      });
  
      this.paths = newArray;
  
      if (this.section_data[field] == undefined) {
        let json_array = {};
        json_array['geofence'] = this.paths;
        this.section_data[field] = JSON.stringify(json_array);
      } else {
        let json_array = JSON.parse(this.section_data[field]);
        json_array['geofence'] = this.paths;
        this.section_data[field] = JSON.stringify(json_array);
      }
  
  
    } else {
      new notifier({title: "Warning! ", message: "Please select a location from map.", icon: 'fa fa-exclamation-triangle',type: "danger"});
    }
  }



 init = () =>{
    var th_service = this.section_service; 
    var th_router = this.router; 
 
        this.section_service.getCurrentRolePermissionMenus('roles',localStorage.getItem("userDetails['roles_id']")).subscribe(res1 => {
      
          var current_route = this.router.url.split('/')[2].split("-").join(" ");
          current_route = current_route.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });
        
          var current_module = JSON.parse(res1[0].permissions).sections.filter(itm => itm.name == current_route);	
          var menus_actions = [];
          current_module[0].actions.forEach(function (menuItem) {
            menus_actions.push(menuItem.label);
            menus_actions[menuItem['label']] = menuItem.perm == 'true'?true:false;
          });


            if(menus_actions['Create']){  
                this.section_service.sectionConfig(this.router.url).subscribe(res => {

                  this.section_service.getRolePermissionMenus('menus').subscribe(res1 => {
                          this.getAllMenus  = res1;
                          var column_config = JSON.parse(res[0].section_config).column;
                          var th_files = [];
                          var th =this;
                          column_config.forEach(function (rowItem) { 
                          
                            if((rowItem.type == 'tags' || rowItem.type == 'selectbox' || rowItem.type == 'checkbox' || rowItem.type == 'radio') && rowItem.source_type == 'dynamic'){
                               
                              
                              if(th_router.url.split('/')[2] == 'users' || th_router.url.split('/')[2] == 'roles' || th_router.url.split('/')[2] == 'menus' || th_router.url.split('/')[2] == 'sections')
                                th_service.customRoute(th_router.url,rowItem.source_from).subscribe(res => {
                                      rowItem.source = res;
                                });
                              else
                                th_service.adminCustomRoute(th_router.url,rowItem.source_from).subscribe(res => {
                                  rowItem.source = res;
                                });
                              
                      
                                if(rowItem.type == 'tags' || rowItem.type == 'custom' || rowItem.type == 'datepicker' ||  rowItem.type == 'map')
                                    th.validation_fields_onload[rowItem.field] = false;
                            
                            }
                            if(rowItem.type == 'file' || rowItem.type == 'image')
                                th_files.push(rowItem.field);
                        
                          });
                          this.columns = column_config;

                          

                          this.file_inputs = th_files;
                          this.title = res[0].section_name;
                          this.section_alias = res[0].section_alias;
                       
                          this.section_data = {};
                          this.spinnerService.hide();

                  });

              });

            }else
             this.router.navigate(['/admin/dashboard']);
            

          });

        this.options = {
          multiple: true
        }

    

};

}