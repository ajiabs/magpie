import { SectionService } from './../../../section.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'app-index',
  templateUrl: '././index.component.html',
  styleUrls: ['././index.component.css']
})
export class SectionIndexComponent implements OnInit {

  section_data: any;
  columns:any;
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
  end_no;any;
  paginate_showBlocks:any;
  paginate_total:any;
  paginate_from:any;
  paginate_to:any;
  paginate:any;
  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private service: SectionService) {

   route.params.subscribe(val => {
      
       this.get();
    });
  }

  ngOnInit() {

    //this.get();
  }

  get = () =>  {

    var th_service = this.service; 
    var th_router = this.router; 
    var th_searchable = [];
    var th_column_relations = [];
   
    this.service.sectionConfig(this.router.url).subscribe(res => {
      this.columns = JSON.parse(res[0].section_config).column;
      this.columns.forEach(function (rowItem) { 
         
           if((rowItem.type == 'tags' || rowItem.type == 'selectbox' || rowItem.type == 'checkbox' || rowItem.type == 'radio') && rowItem.source_type == 'dynamic'){
              th_service.customRoute(th_router.url,rowItem.source_from).subscribe(res => {
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
      this.actions =  JSON.parse(res[0].section_config).opertations;
      this.edit_action = this.actions.indexOf('edit') != -1?true:false;
      this.create_action = this.actions.indexOf('create') != -1?true:false;
      this.view_action = this.actions.indexOf('view') !== -1?true:false;
      this.delete_action = this.actions.indexOf('delete') != -1?true:false;
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
      this.pages = 0;
      this.current = 1;
      var per_pagecount = parseInt(JSON.parse(res[0].section_config).per_pagecount);
      this.per_page = this.paginate?per_pagecount:9999999;
      this.paginate_showBlocks = 5;
      this.paginate_total = 1;
      this.paginate_from = 1;
      this.paginate_to = 1;

      this.order_field= this.columns[0].field;
      this.order_fieldBy='asc';
     
     if(this.view_action){
        this.service.get(this.current_page,this.per_page,this.order_field,this.router.url).subscribe(result => {
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


        });
      }

     
     
    });
  }

  onSearchChange  = (value) =>{
   this.current_page = 1;
   this.search_word = value;

   this.route.params.subscribe(params => {
      this.service.search(value,this.searchable_fields,'asc',this.columns[0].field,this.column_relation,this.current_page,this.per_page,this.router.url).subscribe(result => {
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

         
        });
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

      this.order_field=field;
      this.order_fieldBy=order_by;

       this.route.params.subscribe(params => {
          this.service.search(this.search_word,this.searchable_fields,order_by,field,this.column_relation,this.current_page,this.per_page,this.router.url).subscribe(result => {

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



             
          });
        });

     }
  }

  onPaginateClick = (page) =>{

       this.route.params.subscribe(params => {
          this.service.search(this.search_word,this.searchable_fields,this.order_fieldBy,this.order_field,this.column_relation,page,this.per_page,this.router.url).subscribe(result => {
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
              
          });
        });

  }

  delete = (id) => {
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
              th.service.delete(id,th.router.url).subscribe(res => {
                console.log('Deleted');

                th.get();
              });
               swal("Deleted!", "Record has been deleted.", "success");
        
              
            }
           
          } else {
            swal("Cancelled", "", "error");
          }
        });


  }
}