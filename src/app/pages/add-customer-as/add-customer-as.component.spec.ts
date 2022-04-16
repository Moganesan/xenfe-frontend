import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerAsComponent } from './add-customer-as.component';

describe('AddCustomerAsComponent', () => {
  let component: AddCustomerAsComponent;
  let fixture: ComponentFixture<AddCustomerAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerAsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
