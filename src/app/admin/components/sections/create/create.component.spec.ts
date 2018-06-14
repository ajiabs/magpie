import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCreateComponent } from '././create.component';

describe('SectionCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<SectionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
