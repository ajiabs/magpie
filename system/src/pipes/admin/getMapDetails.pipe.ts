import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from '../../services/admin/section.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import  { environment } from './../../../../src/environments/environment';
@Pipe({
  name: 'getMapDetails'
})


export class GetMapDetailsPipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private service: SectionService) {
  }

  transform(items: any,field:any): any {
    if (items == '') return [];
      if(items !== undefined){
        let data = JSON.parse(items);

        if(data[field] != undefined)
          return data[field];
        else
         return [];
        
      }
    }

}