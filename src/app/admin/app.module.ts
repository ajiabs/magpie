import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/users/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SectionIndexComponent } from './components/sections/index/index.component';
import { SectionCreateComponent } from './components/sections/create/create.component';
import { SectionEditComponent } from './components/sections/edit/edit.component';
import { UserService } from './user.service';
import { SectionService } from './section.service';
import { AuthGuard } from './auth-guard.service';
import { FilterPipe} from './filters/objectFilterByKeyValue.pipe';
import { KeyReturnPipe} from './filters/objectReturnKey.pipe';
import { DynamicSource} from './filters/dynamicSource.pipe';
import { InArrayCheckPipe} from './filters/inArrayCheck.pipe';
import { ToArrayPipe} from './filters/toArray.pipe';
import { GetFilePipe} from './filters/getFile.pipe';
import { TagsDataPipe} from './filters/tagsData.pipe';
import { ToObjectPipe} from './filters/toObject.pipe';
import { Select2Module } from 'ng2-select2';
import { RolePermissionsDirective } from './directives/rolePermissions.directive';
import { MenuToggleDirective } from './directives/menuToggle.directive';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    DashboardComponent,
    SectionIndexComponent,
    SectionCreateComponent,
    SectionEditComponent,
    FilterPipe,
    KeyReturnPipe,
    DynamicSource,
    InArrayCheckPipe,
    ToArrayPipe,
    GetFilePipe,
    TagsDataPipe,
    ToObjectPipe,
    RolePermissionsDirective,
    MenuToggleDirective

  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),HttpClientModule, ReactiveFormsModule, Select2Module
  ],
  providers: [UserService,AuthGuard,SectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
