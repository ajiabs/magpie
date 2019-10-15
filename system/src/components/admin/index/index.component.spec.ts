import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagpieIndexComponent } from '././index.component';

describe('MagpieIndexComponent', () => {
  let component: MagpieIndexComponent;
  let fixture: ComponentFixture<MagpieIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagpieIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagpieIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
