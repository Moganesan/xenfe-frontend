import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersToPackComponent } from './orders-to-pack.component';

describe('OrdersToPackComponent', () => {
  let component: OrdersToPackComponent;
  let fixture: ComponentFixture<OrdersToPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersToPackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersToPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
