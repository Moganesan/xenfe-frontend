import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {QuoteService} from '../../services/quote.service'


@Component({
  selector: 'app-cash-invoice',
  templateUrl: './cash-invoice.component.html',
  styleUrls: ['./cash-invoice.component.scss']
})
export class CashInvoiceComponent implements OnInit {

  cashInvoice: any

  constructor(
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {

    this.quoteService.getAllCashInvoice().subscribe(cashInvoice => {
      //console.log()
    this.cashInvoice=cashInvoice;
      console.log(this.cashInvoice)
      this.cdr.detectChanges();

    });
  }

}
