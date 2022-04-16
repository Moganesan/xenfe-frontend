
  import { Component, OnInit } from '@angular/core';
  import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-create-discount-group',
  templateUrl: './create-discount-group.component.html',
  styleUrls: ['./create-discount-group.component.scss']
})
export class CreateDiscountGroupComponent implements OnInit {

  
    name: any;
    value: any;
    allDiscountGroups : any
  
    constructor( public quoteService : QuoteService) { }
  
    ngOnInit(): void {
      this.quoteService.getAllDiscountGroups().subscribe(data => {
        this.allDiscountGroups = data
        console.log('all discount', this.allDiscountGroups)
      })
  
    }
    save(){
      console.log('Group Discount', this.name)
      console.log('Group Discount', this.value)
      this.quoteService.createDiscountGroup(this.name, this.value)
  
    }
  
  }
