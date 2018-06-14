import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from './../section.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Pipe({
  name: 'getFile'
})


export class GetFilePipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private service: SectionService) {
  }


 transform(items: any): any {
   if (items == '') return [];
   if(items !== undefined)
   return this.service.getImage(items,this.router.url).map(result => {
	   
	  return 'http://localhost/mean/'+result[0].files_path;
	 });
  

   
 }
}