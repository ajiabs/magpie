import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Input } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MagpieComponent } from './magpie.component';
import { MagpieLoginComponent } from './components/admin/login/login.component';
import { MagpieDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MagpieIndexComponent } from './components/admin/index/index.component';
import { MagpieCreateComponent } from './components/admin/create/create.component';
import { MagpieEditComponent } from './components/admin/edit/edit.component';
import { MagpieViewComponent } from './components/admin/view/view.component';
import { MagpieProfileEditComponent } from './components/admin/profile-edit/profile-edit.component';
import { MagpieSettingsComponent } from './components/admin/settings/settings.component';
import { MagpiePackageInstallerComponent } from './components/admin/package-installer/package-installer.component';
import { MagpiePackageInstallerDetailsComponent } from './components/admin/package-installer/package-installer-details.component';
import { MagpieResetPasswordComponent } from './components/admin/reset-password/reset-password.component';
import { magpieRoutes } from './../../system/src/routerConfig';
import { SectionService } from './../../system/src/services/admin/section.service';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { FilterPipe} from './../../system/src/pipes/admin/objectFilterByKeyValue.pipe';
import { KeyReturnPipe} from './../../system/src/pipes/admin/objectReturnKey.pipe';
import { DynamicSource} from './../../system/src/pipes/admin/dynamicSource.pipe';
import { InArrayCheckPipe} from './../../system/src/pipes/admin/inArrayCheck.pipe';
import { ToArrayPipe} from './../../system/src/pipes/admin/toArray.pipe';
import { GetFilePipe} from './../../system/src/pipes/admin/getFile.pipe';
import { TagsDataPipe} from './../../system/src/pipes/admin/tagsData.pipe';
import { ToObjectPipe} from './../../system/src/pipes/admin/toObject.pipe';
import { GetMapDetailsPipe} from './../../system/src/pipes/admin/getMapDetails.pipe';
import { ChartDirective } from './../../system/src/directives/admin/chart.directive';
import { RolePermissionsDirective } from './../../system/src/directives/admin/rolePermissions.directive';
import { MenuToggleDirective } from './../../system/src/directives/admin/menuToggle.directive';
import { DatepickerDirective } from './../../system/src/directives/admin/datePicker.directive';
import { Select2Module } from 'ng2-select2';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AgmCoreModule } from '@agm/core';
import { NgxEditorModule } from 'ngx-editor';
import { ColorPickerModule } from 'ngx-color-picker';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  declarations: [
    MagpieComponent,
    MagpieIndexComponent,
    MagpieLoginComponent,
    MagpieDashboardComponent,
    MagpieCreateComponent,
    MagpieEditComponent,
    MagpieViewComponent,
    MagpieProfileEditComponent,
    MagpieSettingsComponent,
    MagpiePackageInstallerComponent,
    MagpiePackageInstallerDetailsComponent,
    MagpieResetPasswordComponent,
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
    BrowserModule,HttpClientModule,
    RouterModule.forRoot(magpieRoutes,{
      onSameUrlNavigation: 'reload'
    }), 
    ReactiveFormsModule,
    Select2Module,
    Ng4GeoautocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZ0qMJNqSxi8QJFuUDuPdE7Pwh3TPCjpo',
      libraries: ["places"]
    }),
    NgxEditorModule,
    ColorPickerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  exports: [
    MagpieComponent,
    MagpieIndexComponent,
    MagpieLoginComponent,
    MagpieDashboardComponent,
    MagpieCreateComponent,
    MagpieEditComponent,
    MagpieViewComponent,
    MagpieProfileEditComponent,
    MagpieSettingsComponent,
    MagpiePackageInstallerComponent,
    MagpiePackageInstallerDetailsComponent,
    MagpieResetPasswordComponent,
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
    ToObjectPipe,
    RouterModule
  ],
  providers: [SectionService,AuthGuard],
  bootstrap: [MagpieComponent]
})
export class MagpieModule { }
