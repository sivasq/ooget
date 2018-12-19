import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDetailsComponent } from './edit-company-details.component';

describe('EditCompanyDetailsComponent', () => {
  let component: EditCompanyDetailsComponent;
  let fixture: ComponentFixture<EditCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
