import { Component } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-site',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 
  constructor(private route: ActivatedRoute, private router: Router) {


  }
  ngOnInit() {

  }
}