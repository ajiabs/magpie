import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'keyReturn'
})


export class KeyReturnPipe implements PipeTransform {
 transform(items: any[], pos: string): any[] {
   if (!items) return [];
   return Object.keys(items)[pos];
 }
}