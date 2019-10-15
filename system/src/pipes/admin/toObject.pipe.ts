import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from '../../services/admin/section.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Pipe({
  name: 'toObject'
})


export class ToObjectPipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private service: SectionService) {
  }


 transform(items: any): any[] {
   if (items == "" || items == undefined) return [];
  
    return JSON.parse(items);
   

 }
}