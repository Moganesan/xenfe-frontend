import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {QuoteService} from '../../services/quote.service'
@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {
  
    quote: any;
  
    constructor(
      private cdr: ChangeDetectorRef,
     private quoteService: QuoteService
    ) { }
  
    ngOnInit(): void {
      //get all quotation
      this.quoteService.GetAllQuotation().subscribe(quote => {
        //console.log()
      this.quote=quote;
        console.log(this.quote)
        this.cdr.detectChanges();

      });
    }
  
  }
  
