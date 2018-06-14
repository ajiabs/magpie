import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SectionService } from './../section.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Pipe({
  name: 'tagsData'
})


export class TagsDataPipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient, private service: SectionService) {
  }


 transform(items: any): any[] {

	if(items == '') return [];
	var data = [];
	for(var k in items){
	   data.push({'id':items[k].value,'text':items[k].label});
	}
		
    return data;
  

 }
}

