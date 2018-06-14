import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionIndexComponent } from '././index.component';

describe('SectionIndexComponent', () => {
  let component: SectionIndexComponent;
  let fixture: ComponentFixture<SectionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
