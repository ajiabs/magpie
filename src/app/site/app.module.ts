import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
//import { appRoutes } from './routerConfig';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
const appRoutes: Routes = [];
@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppSiteModule { }
