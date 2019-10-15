import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagpieResetPasswordComponent } from './reset-password.component';

describe('MagpieResetPasswordComponent', () => {
  let component: MagpieResetPasswordComponent;
  let fixture: ComponentFixture<MagpieResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagpieResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagpieResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
