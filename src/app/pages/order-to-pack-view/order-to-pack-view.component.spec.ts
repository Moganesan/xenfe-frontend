import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderToPackViewComponent } from './order-to-pack-view.component';

describe('OrderToPackViewComponent', () => {
  let component: OrderToPackViewComponent;
  let fixture: ComponentFixture<OrderToPackViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderToPackViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderToPackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
