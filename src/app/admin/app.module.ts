import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MagpieModule } from './../../../system/src/magpie.module';
import { DashboardComponent } from './../../../src/app/admin/components/dashboard/dashboard.component';
import { AuthGuard } from './../../../system/src/services/admin/auth-guard.service';
import { SectionService } from './../../../system/src/services/admin/section.service';
import { DashboardService } from './../../../src/app/admin/services/dashboard.service';
import { customRoutes } from './../admin/routerConfig';
import { Select2Module } from 'ng2-select2';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AgmCoreModule } from '@agm/core';
import { NgxEditorModule } from 'ngx-editor';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(customRoutes,{
      onSameUrlNavigation: 'reload'
    }),
     MagpieModule,
     HttpClientModule,
     ReactiveFormsModule,  
     Select2Module,
     Ng4GeoautocompleteModule.forRoot(),
     AgmCoreModule.forRoot({
       apiKey: 'AIzaSyDZ0qMJNqSxi8QJFuUDuPdE7Pwh3TPCjpo',
       libraries: ["places"]
     }),
     NgxEditorModule
     
  ],
  providers: [DashboardService,SectionService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule  extends MagpieModule { }
