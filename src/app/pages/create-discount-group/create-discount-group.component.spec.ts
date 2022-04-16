import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscountGroupComponent } from './create-discount-group.component';

describe('CreateDiscountGroupComponent', () => {
  let component: CreateDiscountGroupComponent;
  let fixture: ComponentFixture<CreateDiscountGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiscountGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiscountGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
