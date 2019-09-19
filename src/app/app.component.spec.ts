

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { SectionService } from './../../system/src/services/admin/section.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToArrayPipe } from './../../system/src/pipes/admin/toArray.pipe'
import { GetFilePipe } from './../../system/src/pipes/admin/getFile.pipe'
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { WebsocketService } from './../../system/src/services/admin/websocket.service';
import { ExportService } from './../../system/src/services/admin/export.service';


@Component({ selector: 'routerLink', template: '' })
class RouterLinkDirectiveStub { }
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        HttpClientModule,
        AgmCoreModule
      ],
      providers: [
        SectionService,
        AuthGuard,ExportService,
        WebsocketService
        
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        RouterOutletStubComponent,
        ToArrayPipe,
        GetFilePipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
