import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'inArrayCheck'
})


export class InArrayCheckPipe implements PipeTransform {
 transform(items: string, value: string): boolean {
 if (items == "" || items == undefined) return false;
    var obj = JSON.parse(items);
    var newArr =  Object.keys(obj).map(function(k) { return obj[k] })[0];
    return newArr.indexOf(value.toString()) != -1?true:false;;
 }
}