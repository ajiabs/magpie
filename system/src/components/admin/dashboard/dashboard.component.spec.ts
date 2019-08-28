import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagpieDashboardComponent } from '././dashboard.component';

describe('MagpieDashboardComponent', () => {
  let component: MagpieDashboardComponent;
  let fixture: ComponentFixture<MagpieDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagpieDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagpieDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
