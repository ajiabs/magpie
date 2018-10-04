import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MagpieModule } from './../../system/src/magpie.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './../../src/app/admin/components/dashboard/dashboard.component';
import { DashboardService } from './../../src/app/admin/services/dashboard.service';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { SectionService } from './../../system/src/services/admin/section.service';


const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes), MagpieModule,HttpClientModule, ReactiveFormsModule
  ],
  providers: [DashboardService,AuthGuard,SectionService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule  { }