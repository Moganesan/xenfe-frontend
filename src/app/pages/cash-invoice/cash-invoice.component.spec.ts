import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInvoiceComponent } from './cash-invoice.component';

describe('CashInvoiceComponent', () => {
  let component: CashInvoiceComponent;
  let fixture: ComponentFixture<CashInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
