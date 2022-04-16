import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInvoiceViewComponent } from './cash-invoice-view.component';

describe('CashInvoiceViewComponent', () => {
  let component: CashInvoiceViewComponent;
  let fixture: ComponentFixture<CashInvoiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashInvoiceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
