import { Component, OnInit,Input,Output,OnDestroy } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { ExportService } from './../../../../../system/src/services/admin/export.service';
import { WebsocketService } from './../../../../../system/src/services/admin/websocket.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from './../../../../../src/environments/environment';
declare var notifier: any;
declare var swal: any;
declare var $: any;



var loading_img_url = environment.loading_image;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class MagpieIndexComponent implements OnInit,OnDestroy {
  @Input()
    section_data: any="";
    columns:any="";
    list_columns:any;
    full_columns:any;
    title:any;
    actions:any;
    section_alias:any;
    edit_action:any;
    create_action:any;
    view_action:any;
    delete_action:any;
    search_action:any;
    import_action:any;
    export_action:any;
    searchable_fields:any;
    column_order:any;
    column_index:any;
    column_relation:any;
    order_field:any;
    order_fieldBy:any;
    search_word:any;
    current_page:any;
    per_page:any;
    pages:any;
    current:any;
    paginate_array:any;
    start_no:any;
    end_no:any;
    paginate_showBlocks:any;
    paginate_total:any;
    paginate_from:any;
    paginate_to:any;
    paginate:any;
    navigationSubscription:any;
    file_import:any;
    file_import_button:boolean=true;
    file_import_type:boolean=false;
    multiple_delete:boolean=false;
    multiple_delete_button:boolean=false;
    checkboxSelectAll:boolean=false;
    checkBoxArr:any=[];
    selectedRows:number=0;
    ij=1;
    template: string ='<img class="custom-spinner-template" src="'+loading_img_url+'">';
  constructor(public route: ActivatedRoute,public router: Router, public fb: FormBuilder,public http: HttpClient,public section_service:SectionService,public spinnerService: Ng4LoadingSpinnerService,public webSocketService: WebsocketService,public exportService: ExportService) {

    this.webSocketService.createItemMessageReceived().subscribe(data => {
      this.index();
    });
    this.webSocketService.updateItemMessageReceived().subscribe(data => {
      this.index();
    });
    this.webSocketService.deleteItemMessageReceived().subscribe(data => {
      this.index();
    });
 

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.spinnerService.show();
        this.index();
       

      }
    });

    

  }


  ngOnDestroy() {
     if (this.navigationSubscription) {  
        this.navigationSubscription.unsubscribe();
     }
   }


  ngOnInit(){
   
    this.webSocketService.joinRoom({room:1});
   
  }

  export= (type)=>{


      var export_csv_data = true;
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

        if(menus_actions['Export']){ 
          this.section_service.sectionConfig(this.router.url).subscribe(res => {
            const columns_array = JSON.parse(res[0].section_config).column;

                this.route.params.subscribe(params => {
                  this.section_service.export(this.search_word,this.searchable_fields, this.order_fieldBy,this.order_field,this.column_relation,this.router.url,columns_array).subscribe(result => {
                  
        
                  if (type == 'csv') {
                    var options = {
                      useBom: true,
                      noDownload: false,
                      showLabels: true,
                      headers: result['columns'],
    
                    };
                    this.exportService.export_csv(result['data'], current_route, options);
                  }
                  else if (type == 'pdf') {
                    var rows = [];
                    Object.keys(result['data']).forEach(element => {
                      var temp = [];
                      Object.keys(result['data'][element]).forEach(item => {
                        temp.push(result['data'][element][item]);
                      });
                      rows.push(temp);
                    });
                    var content = {
                      head: [result['columns']],
                      body: rows
                    }
                    this.exportService.export_pdf(content, '', current_route);
                  }
                  else if (type == 'xlsx') {
               
                    this.exportService.export_xlsx(result['data'],'simple');
                  }
                  
                  
                  
                  });

                });
          });
        }  
        else
          this.router.navigate(['/admin/dashboard']);
    
      });
    
      
      

  }

  onImportEvent  = (fileInput: any) => {
    this.file_import = fileInput.target.files[0];

    if(this.file_import.type != 'text/csv')
    {
      this.file_import_type = true;
      this.file_import_button = true;
    }else
    {
      this.file_import_type = false;
      this.file_import_button = false;

    } 

}

singleRowDelete=(event, id)=> {

    if (event.target.checked) {
      this.selectedRows++;
  
      if (this.section_data.length == this.selectedRows) {
        this.checkboxSelectAll = true;
      }
  
      this.checkBoxArr.push(id);
  
    } else {
      this.checkboxSelectAll = false;
      var index = this.checkBoxArr.indexOf(id);
      if (index > -1) {
        this.checkBoxArr.splice(index, 1);
      }
      this.selectedRows--;
    }
  
    if (this.selectedRows >= 1) {
      this.multiple_delete_button = true;
    } else {
      this.multiple_delete_button = false;
    }
}


multipleRowsDelete=(event, id)=> {
  this.checkboxSelectAll = true;
  this.selectedRows = this.section_data.length;
  
  if (event.target.checked) {
    for (var i = 0; i < this.section_data.length; i++) {
      this.checkBoxArr[i] = this.section_data[i]._id;
  
    }
    this.multiple_delete_button = true;
  } else {
    this.checkBoxArr = [];
    this.multiple_delete_button = false;
    this.selectedRows = 0;
    this.checkboxSelectAll = false;
  }


}



bulkDelete =()=>{

  var th = this;

  swal({
     title: "Are you sure?",
     text: "You will not be able to recover this data!",
     type: "warning",
     showCancelButton: true,
     confirmButtonText: "Yes, delete it!",
     cancelButtonText: "No",
     closeOnConfirm: false,
     closeOnCancel: false
   }, function(isConfirm) {
     if (isConfirm) {
       if(th.delete_action){
         th.section_service.bulkDelete(th.checkBoxArr,th.router.url).subscribe(res => {
           

           th.index();
         });
         swal.close();
        
         new notifier({title: "Update! ", message: "Record has been deleted.", icon: 'fa fa-check',type: "success"});
         this.webSocketService.deleteItem({module:this.section_alias,room:1});   
       }
      
     } else {
      swal.close();
 
     }
   });

  
}

  import_csv = ()=>{


      var import_csv_data = true;
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

        if(menus_actions['Import']){ 
          this.section_service.sectionConfig(this.router.url).subscribe(res => {
                const columns_array = JSON.stringify(JSON.parse(res[0].section_config).column);
                const import_unique_field = JSON.stringify(JSON.parse(res[0].section_config).import_unique_field);

                this.route.params.subscribe(params => {
                this.section_service.import(this.file_import,columns_array,import_unique_field,this.router.url).subscribe(result => {
                  if(import_csv_data){
                      this.index();
                      new notifier({title: "Imported! ", message: "Csv has been successfully imported.", icon: 'fa fa-check',type: "success"});
                      this.webSocketService.createItem({module:this.section_alias,room:1});
                      import_csv_data = false;
                    }
                  
                  });

                });
          });
        }  
        else
          this.router.navigate(['/admin/dashboard']);
    
      });              
  }

  onSortClick = (sortable,field,i) =>{
        

          this.current_page = 1;
          var order_by = 'asc';
          if(i == this.column_index){
                this.column_order  = !this.column_order;
                var order_by = $("#columnOrder"+i).hasClass('sorting_asc')?'desc':'asc';
          }
          else
            this.column_order = true;
          this.column_index  = i;
          if(sortable == 'true')
          {
            this.spinnerService.show();
            this.order_field=field;
            this.order_fieldBy=order_by;

            this.route.params.subscribe(params => {
                this.section_service.search(this.search_word,this.searchable_fields,order_by,field,this.column_relation,this.current_page,this.per_page,this.router.url).subscribe(result => {

                    this.section_data = result['data'];
                    this.pages = result['pages'];
                    this.current = result['current'];
                    this.paginate_total  = result['tot'];
                    this.paginate_from = result['from'];
                    this.paginate_to = result['to'];

                    var temp_paginate_array = [];
                    var max = this.paginate_showBlocks;
                    var min = max-1;
                    this.start_no =  1 > max ? 1 - min : 1;
                    this.end_no   =  1 + min;
                    for (var i = this.start_no; i <= (1 + min) && i <= this.pages; i++) {
                          temp_paginate_array.push(i);
                      }
                    this.paginate_array = temp_paginate_array;
                    this.spinnerService.hide();
                   


                  
                });
              });

          }


  }

  
  onPaginateClick = (page) =>{
   
      this.spinnerService.show();
      this.route.params.subscribe(params => {
        this.section_service.search(this.search_word,this.searchable_fields,this.order_fieldBy,this.order_field,this.column_relation,page,this.per_page,this.router.url).subscribe(result => {
              this.section_data = result['data'];
              this.pages = result['pages'];
              this.current = result['current'];
              this.paginate_total  = result['tot'];
              this.paginate_from = result['from'];
              this.paginate_to = result['to'];

              var temp_paginate_array = [];
              var max = this.paginate_showBlocks;
              var min = max-1;
              this.start_no =  this.current > max ? this.current - min : 1;
              this.end_no   =  this.current + min;
              for (var i = this.start_no; i <= (this.current + min) && i <= this.pages; i++) {
                  temp_paginate_array.push(i);
              }
            this.paginate_array = temp_paginate_array;
            this.spinnerService.hide();
            
        });
      });


}

    onSearchChange  = (value) =>{
      this.current_page = 1;
      this.search_word = value;
      this.spinnerService.show();
 
          this.route.params.subscribe(params => {
            this.section_service.search(value,this.searchable_fields,'asc',this.columns[0].field,this.column_relation,this.current_page,this.per_page,this.router.url).subscribe(result => {
                  this.section_data = result['data'];
                  this.pages = result['pages'];
                  this.current = result['current'];
                  this.paginate_total  = result['tot'];
                  this.paginate_from = result['from'];
                  this.paginate_to = result['to'];
      
                
      
                    var temp_paginate_array = [];
                    var max = this.paginate_showBlocks;
                    var min = max-1;
                    this.start_no =  1 > max ? 1 - min : 1;
                    this.end_no   =  1 + min;
                    for (var i = this.start_no; i <= (1 + min) && i <= this.pages; i++) {
                        temp_paginate_array.push(i);
                    }
                  this.paginate_array = temp_paginate_array;
                  this.spinnerService.hide();
                
      
                
              });
          });

    


    }

    onClickChangeStatus =(id,value,field,source)=>{

      var  change_status = true;
      this.route.params.subscribe(params => {
        this.section_service.changeStatus(this.router.url,id,value,field,source).subscribe(result => {
          if(change_status){
            new notifier({title: "Update! ", message: "Status has been changed  successfully.", icon: 'fa fa-check',type: "success"});
            this.webSocketService.changeItemStatus({module:this.section_alias,room:1});
            this.index();
            change_status=false;
          }

        });
      });


    }


 

    index = () =>{
      var th_service = this.section_service; 
      var th_router = this.router; 
      var th_searchable = [];
      var th_column_relations = [];
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

        if(menus_actions['Index']){ 
          this.section_service.sectionConfig(this.router.url).subscribe(res => {
            this.columns = JSON.parse(res[0].section_config).column;
            this.columns.forEach(function (rowItem) { 
              
                if((rowItem.type == 'tags' || rowItem.type == 'selectbox' || rowItem.type == 'checkbox' || rowItem.type == 'radio') && rowItem.source_type == 'dynamic'){
                
                  if(th_router.url.split('/')[2] == 'users' || th_router.url.split('/')[2] == 'roles' || th_router.url.split('/')[2] == 'menus' || th_router.url.split('/')[2] == 'sections')
                    th_service.customRoute(th_router.url,rowItem.source_from).subscribe(res => {
                          rowItem.source = res;
                    });
                  else
                    th_service.adminCustomRoute(th_router.url,rowItem.source_from).subscribe(res => {
                      rowItem.source = res;
                    });

                    
                    if(rowItem.relation != '')
                    th_column_relations.push(rowItem.relation);

                }
                if(rowItem.searchable =='true')
                  th_searchable.push(rowItem.field);
            
              });

            this.title = res[0].section_name;
            this.section_alias = res[0].section_alias;
            this.edit_action = menus_actions['Edit'];
            this.create_action = menus_actions['Create'];
            this.delete_action = menus_actions['Delete'];
            this.view_action = menus_actions['View'];
            this.import_action = menus_actions['Import'];
            this.export_action = menus_actions['Export'];
            this.search_action = th_searchable.length>0?true:false;
            this.search_word = "";
            if(th_searchable.length>0)
              $("#search_word").val("");

            this.searchable_fields = JSON.stringify(th_searchable);
            this.column_order  = true;
            this.column_index =-1;
            this.column_relation = JSON.stringify(th_column_relations);
            this.current_page = 1;
            this.paginate = JSON.parse(res[0].section_config).pagination == 'true'?true:false;
            this.multiple_delete = (typeof JSON.parse(res[0].section_config).multiple_delete != 'undefined') && JSON.parse(res[0].section_config).multiple_delete == 'true' ?true:false;
            this.pages = 0;
            this.current = 1;
            var per_pagecount = parseInt(JSON.parse(res[0].section_config).per_pagecount);
            this.per_page = this.paginate?per_pagecount:9999999;
            this.paginate_showBlocks = 4;
            this.paginate_total = 1;
            this.paginate_from = 1;
            this.paginate_to = 1;
            this.order_field= this.section_alias+"_id";
            this.order_fieldBy='desc';


            this.section_service.get(this.current_page,this.per_page,this.order_field,this.order_fieldBy,this.router.url).subscribe(result => {
              
              this.section_data = result['data'];
                  this.pages = result['pages'];
                  this.current = result['current'];
                  this.paginate_total  = result['tot'];
                  this.paginate_from = result['from'];
                  this.paginate_to = result['to'];

                  var temp_paginate_array = [];
                  var max = this.paginate_showBlocks;
                  var min = max-1;
                  this.start_no =  1 > max ? 1 - min : 1;
                  this.end_no   =  1 + min;
                  for (var i = this.start_no; i <= (1 + min) && i <= this.pages; i++) {
                        temp_paginate_array.push(i);
                    }
                  this.paginate_array = temp_paginate_array;
                  this.spinnerService.hide();


              });
        


          

          });
          
        }
        else
          this.router.navigate(['/admin/dashboard']);
      
      
      
      });
  

    }

   
    onDeleteClick = (id) => {
      var th = this;

      swal({
         title: "Are you sure?",
         text: "You will not be able to recover this data!",
         type: "warning",
         showCancelButton: true,
         confirmButtonText: "Yes, delete it!",
         cancelButtonText: "No",
         closeOnConfirm: false,
         closeOnCancel: false
       }, function(isConfirm) {
         if (isConfirm) {
           if(th.delete_action){
             th.section_service.delete(id,th.router.url).subscribe(res => {
               

               th.index();
             });
             swal.close();
             new notifier({title: "Success! ", message: "Record has been deleted.", icon: 'fa fa-check',type: "success"});
             this.webSocketService.deleteItem({module:this.section_alias,room:1});
           }
          
         } else {
          swal.close();
     
         }
       });
          
     }


}