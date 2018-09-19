import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from '../../services/admin/section.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Pipe({
  name: 'toArray'
})


export class ToArrayPipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private service: SectionService) {
  }


 transform(items: any): any[] {

   if (items == "" || items == undefined) return [];
  
    var obj = JSON.parse(items);
    return Object.keys(obj).map(function(k) { return obj[k] })[0];

 }
}