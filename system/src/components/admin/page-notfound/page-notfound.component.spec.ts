import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagpiePageNotFoundComponent } from './page-notfound.component';

describe('MagpiePageNotFoundComponent', () => {
  let component: MagpiePageNotFoundComponent;
  let fixture: ComponentFixture<MagpiePageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagpiePageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagpiePageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
