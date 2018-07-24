import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from '../../services/admin/section.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import  { environment } from './../../../../src/environments/environment';
@Pipe({
  name: 'getFile'
})


export class GetFilePipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private service: SectionService) {
  }

  transform(items: any,type:any): any {
    if (items == '') return [];
      if(items !== undefined){
        if(type=='id'){
          return this.service.getImage(items,this.router.url).map(result => {
            return environment.upload_url+'uploads/'+result[0].files_name;
          });
          
        }else if(type=='image'){
          return environment.upload_url+'uploads/'+items;
        
        }
      }
    }

}