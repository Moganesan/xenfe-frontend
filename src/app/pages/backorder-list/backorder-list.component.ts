import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {QuoteService} from '../../services/quote.service'


@Component({
  selector: 'app-backorder-list',
  templateUrl: './backorder-list.component.html',
  styleUrls: ['./backorder-list.component.scss']
})
export class BackorderListComponent implements OnInit {

  quote: any;

  constructor(
    private cd: ChangeDetectorRef,
    private quoteService: QuoteService
  ) { }

  ngOnInit(): void {

            //get all quotation
            this.quoteService.getAllBackorders().subscribe(quote => {
              //console.log()
            this.quote=quote;
              console.log(this.quote)
              this.cd.markForCheck();
            });
            
  }

}
