import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes,PreloadAllModules } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MagpieModule } from './../../system/src/magpie.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './../../src/app/admin/components/dashboard/dashboard.component';
import { UsersIndexComponent } from './../../src/app/admin/components/users/index.component';
import { HomeComponent } from './../../src/app/site/components/home/home.component';
import { DashboardService } from './../../src/app/admin/services/dashboard.service';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { SectionService } from './../../system/src/services/admin/section.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TagInputModule } from 'ngx-chips';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersIndexComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes,{
      onSameUrlNavigation: 'reload',
      enableTracing: false ,
      preloadingStrategy: PreloadAllModules
      }), MagpieModule,HttpClientModule, ReactiveFormsModule,Ng4LoadingSpinnerModule.forRoot(),TagInputModule
  ],
  providers: [DashboardService,AuthGuard,SectionService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule  { }
