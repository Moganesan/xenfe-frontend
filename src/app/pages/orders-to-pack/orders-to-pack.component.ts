import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {QuoteService} from '../../services/quote.service'
@Component({
  selector: 'app-orders-to-pack',
  templateUrl: './orders-to-pack.component.html',
  styleUrls: ['./orders-to-pack.component.scss']
})
export class OrdersToPackComponent implements OnInit {

  
    ordersToPack: any
    ordersToPackShortShipped: any
  
    constructor(
      private quoteService: QuoteService,
      private cd: ChangeDetectorRef,

    ) { }
  
    ngOnInit(): void {
              //get all orders to pack
              this.quoteService.getAllOrdersToPack().subscribe(ordersToPack => {
                //console.log()
              this.ordersToPack=ordersToPack;
                console.log(this.ordersToPack)
                this.cd.markForCheck();

              });
                          //get all orders to pack
                          this.quoteService.getAllOrdersToPackShortShipped().subscribe(ordersToPack => {
                            //console.log()
                          this.ordersToPackShortShipped=ordersToPack;
                            console.log(this.ordersToPackShortShipped)
                            this.cd.markForCheck();
                          });
    }
  
  }
  
