import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagpieCreateComponent } from '././create.component';

describe('MagpieCreateComponent', () => {
  let component: MagpieCreateComponent;
  let fixture: ComponentFixture<MagpieCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagpieCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagpieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
