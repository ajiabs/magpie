import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MagpieModule } from './../../../system/src/magpie.module';
import { MagpieLoginComponent } from './../../../system/src/components/admin/login/login.component';
import { MagpieIndexComponent } from './../../../system/src/components/admin/index/index.component';
import { MagpieCreateComponent } from './../../../system/src/components/admin/create/create.component';
import { MagpieEditComponent } from './../../../system/src/components/admin/edit/edit.component';
import { MagpieDashboardComponent } from './../../../system/src/components/admin/dashboard/dashboard.component';
import { MagpieProfileEditComponent } from './../../../system/src/components/admin/profile-edit/profile-edit.component';
import { MagpieViewComponent } from './../../../system/src/components/admin/view/view.component';
import { RolePermissionsDirective } from './../../../system/src/directives/admin/rolePermissions.directive';
import { ChartDirective } from './../../../system/src/directives/admin/chart.directive';
import { MenuToggleDirective } from './../../../system/src/directives/admin/menuToggle.directive';
import { DatepickerDirective } from './../../../system/src/directives/admin/datePicker.directive';
import { DashboardComponent } from './../../../src/app/admin/components/dashboard/dashboard.component';
import { FilterPipe} from './../../../system/src/pipes/admin/objectFilterByKeyValue.pipe';
import { KeyReturnPipe} from './../../../system/src/pipes/admin/objectReturnKey.pipe';
import { DynamicSource} from './../../../system/src/pipes/admin/dynamicSource.pipe';
import { InArrayCheckPipe} from './../../../system/src/pipes/admin/inArrayCheck.pipe';
import { ToArrayPipe} from './../../../system/src/pipes/admin/toArray.pipe';
import { GetFilePipe} from './../../../system/src/pipes/admin/getFile.pipe';
import { TagsDataPipe} from './../../../system/src/pipes/admin/tagsData.pipe';
import { ToObjectPipe} from './../../../system/src/pipes/admin/toObject.pipe';
import { GetMapDetailsPipe} from './../../../system/src/pipes/admin/getMapDetails.pipe';
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
    MagpieLoginComponent,
    MagpieIndexComponent,
    MagpieCreateComponent,
    MagpieDashboardComponent,
    MagpieEditComponent,
    MagpieViewComponent,
    MagpieProfileEditComponent,
    DashboardComponent,
    RolePermissionsDirective,
    ChartDirective,
    MenuToggleDirective,
    DatepickerDirective,
    FilterPipe,
    KeyReturnPipe,
    DynamicSource,
    InArrayCheckPipe,
    GetMapDetailsPipe,
    ToArrayPipe,
    GetFilePipe,
    TagsDataPipe,
    ToObjectPipe

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(customRoutes,{
      onSameUrlNavigation: 'reload'
    }),
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
