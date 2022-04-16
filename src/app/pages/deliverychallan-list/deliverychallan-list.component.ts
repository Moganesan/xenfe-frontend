import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-deliverychallan-list',
  templateUrl: './deliverychallan-list.component.html',
  styleUrls: ['./deliverychallan-list.component.scss']
})
export class DeliverychallanListComponent implements OnInit {

  deliveryChallans: any 

  constructor(
    private quoteService: QuoteService
  ) { }

  ngOnInit(): void {

    this.quoteService.getAllDeliveryChallan().subscribe(data => {
      this.deliveryChallans = data
      console.log("data", data)
    })
  }

}
