import { Component, OnInit, Input, Output, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { environment } from './../../../../../src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css']
})
export class MagpiePageNotFoundComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router, public fb: FormBuilder, public http: HttpClient, public section_service: SectionService) {

  }

  ngOnInit() {

  }


}
