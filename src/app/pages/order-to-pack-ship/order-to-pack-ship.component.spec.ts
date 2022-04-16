import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderToPackShipComponent } from './order-to-pack-ship.component';

describe('OrderToPackShipComponent', () => {
  let component: OrderToPackShipComponent;
  let fixture: ComponentFixture<OrderToPackShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderToPackShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderToPackShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
