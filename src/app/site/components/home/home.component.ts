import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
declare var swal: any;
declare var $: any;


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users_count:any;
  dashboard_config:any;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private http: HttpClient) {
   
   }
  ngOnInit(){

  }
  



}