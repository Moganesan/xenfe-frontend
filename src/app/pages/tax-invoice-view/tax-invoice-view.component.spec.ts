import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxInvoiceViewComponent } from './tax-invoice-view.component';

describe('TaxInvoiceViewComponent', () => {
  let component: TaxInvoiceViewComponent;
  let fixture: ComponentFixture<TaxInvoiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxInvoiceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
