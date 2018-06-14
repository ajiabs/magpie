import { Pipe, PipeTransform } from '@angular/core';
import { SectionService } from '../section.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Pipe({
  name: 'dynamicSource'
})


export class DynamicSource implements PipeTransform {
 constructor(private route: ActivatedRoute, private router: Router,private service: SectionService) {
   }
 transform(items:string,value: string, source:any[],field_type:string): string {
  
   var custom = [];
   var data = [];
   if(field_type == 'radio' || field_type == 'selectbox')
    data = value.toString().split(',');
   else{
     var obj = JSON.parse(value);
     data = Object.keys(obj).map(function(k) { return obj[k] })[0];
   }
  
    data.forEach(function (rowItem) { 
     var col = $.grep(source, function (source) { return source.value == rowItem });
     var label = col.length ? col[0].label : '';
     custom.push(label);
  
   });
   return custom.join(',');

   
 }
}