import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RolesViewComponent } from './view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectionService } from './../../../../../../system/src/services/admin/section.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilterPipe } from '../../../../../../system/src/pipes/admin/objectFilterByKeyValue.pipe'
import { ToArrayPipe } from '../../../../../../system/src/pipes/admin/toArray.pipe'
import { GetFilePipe } from '../../../../../../system/src/pipes/admin/getFile.pipe'
import { DynamicSource } from '../../../../../../system/src/pipes/admin/dynamicSource.pipe'
import { GetMapDetailsPipe } from '../../../../../../system/src/pipes/admin/getMapDetails.pipe'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { WebsocketService } from './../../../../../../system/src/services/admin/websocket.service';
import { ExportService } from './../../../../../../system/src/services/admin/export.service';


@Component({ selector: 'routerLink', template: '' })
class RouterLinkDirectiveStub { }
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }
describe('AppComponent', () => {
  let component: RolesViewComponent;
  let fixture: ComponentFixture<RolesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        SectionService,
        Ng4LoadingSpinnerService,
        WebsocketService,
        ExportService
        
      ],
      declarations: [
        RolesViewComponent,
        RouterLinkDirectiveStub,
        RouterOutletStubComponent,
        FilterPipe,
        ToArrayPipe,
        GetFilePipe,
        DynamicSource,
        GetMapDetailsPipe

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
