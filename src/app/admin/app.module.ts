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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent

  ],
  imports: [
    MagpieModule,
    BrowserModule,
    RouterModule.forRoot(customRoutes,{
      onSameUrlNavigation: 'reload'
    }),
     HttpClientModule,
     ReactiveFormsModule
  ],
  providers: [DashboardService,SectionService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule  extends MagpieModule { }
