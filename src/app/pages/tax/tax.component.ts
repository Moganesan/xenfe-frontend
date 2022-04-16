import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

    name: any;
    value: any;
    allTaxes : any
  
    constructor( public quoteService : QuoteService) { }
  
    ngOnInit(): void {
      this.quoteService.getAllTaxes().subscribe(data => {
        this.allTaxes = data
        console.log('all taxes', this.allTaxes)
      })
  
    }
    save(){
      console.log('Group Discount', this.name)
      console.log('Group Discount', this.value)
      this.quoteService.createTax(this.name, this.value)
  
    }
  
  }
