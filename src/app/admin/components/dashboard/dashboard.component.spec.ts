
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { KeysPipe } from './../../../../../system/src/pipes/admin/arrayKeys.pipe'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectionService } from './../../../../../system/src/services/admin/section.service';
import { DashboardService } from './../../../../../src/app/admin/services/dashboard.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({ selector: 'routerLink', template: '' })
class RouterLinkDirectiveStub { }
describe('AppComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        SectionService,
        DashboardService
      ],
      declarations: [
        DashboardComponent,
        RouterLinkDirectiveStub,
        KeysPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
