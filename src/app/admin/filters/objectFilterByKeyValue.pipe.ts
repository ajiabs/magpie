import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'columnFilter'
})


export class FilterPipe implements PipeTransform {
 transform(items: any[], field: string, value: string): any[] {
   if (!items) return [];
 
   return items.filter(function (item) {
   if(item['type'].toString() != 'file' && item['type'].toString() != 'image')
     return item[Object.keys(field)[0]] == field[Object.keys(field)[0]].toString() 
   });
 }
}