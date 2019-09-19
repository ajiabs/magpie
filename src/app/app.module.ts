import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes,PreloadAllModules } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MagpieModule } from './../../system/src/magpie.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './../../src/app/admin/components/dashboard/dashboard.component';
import { UsersIndexComponent } from './../../src/app/admin/components/users/index/index.component';
import { RolesViewComponent } from './admin/components/roles/view/view.component';
import { HomeComponent } from './../../src/app/site/components/home/home.component';
import { DashboardService } from './../../src/app/admin/services/dashboard.service';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { ExportService } from './../../system/src/services/admin/export.service';
import { SectionService } from './../../system/src/services/admin/section.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TagInputModule } from 'ngx-chips';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersIndexComponent,
    RolesViewComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes,{
      onSameUrlNavigation: 'reload',
      enableTracing: false ,
      preloadingStrategy: PreloadAllModules
      }), MagpieModule,HttpClientModule, ReactiveFormsModule,Ng4LoadingSpinnerModule.forRoot(),TagInputModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBcigPmyW-A993UDs9v6iejN4FB-h0Pi3k',
        libraries: ["places"]
      }),
  ],
  providers: [DashboardService,AuthGuard,SectionService,ExportService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule  { }
