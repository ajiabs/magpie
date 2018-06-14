import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: '././dashboard.component.html',
  styleUrls: ['././dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = "Dashboard";
   constructor(private route: ActivatedRoute, private router: Router) {   }
  ngOnInit() {
  }

 




}