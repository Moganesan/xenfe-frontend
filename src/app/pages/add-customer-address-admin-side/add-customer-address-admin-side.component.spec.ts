import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerAddressAdminSideComponent } from './add-customer-address-admin-side.component';

describe('AddCustomerAddressAdminSideComponent', () => {
  let component: AddCustomerAddressAdminSideComponent;
  let fixture: ComponentFixture<AddCustomerAddressAdminSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerAddressAdminSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerAddressAdminSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
