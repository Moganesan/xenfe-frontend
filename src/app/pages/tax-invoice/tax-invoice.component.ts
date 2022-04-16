import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {QuoteService} from '../../services/quote.service'

@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.scss']
})
export class TaxInvoiceComponent implements OnInit {

  taxInvoice: any

  constructor(
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    this.quoteService.getAllTaxInvoice().subscribe(taxInvoice => {
      //console.log()
    this.taxInvoice=taxInvoice;
      console.log(this.taxInvoice)
      this.cdr.detectChanges();

    });
  }

}
