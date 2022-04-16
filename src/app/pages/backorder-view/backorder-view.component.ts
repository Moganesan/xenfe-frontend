import { Component, OnInit } from '@angular/core';
import {QuoteService} from '../../services/quote.service';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import { quoteDetailModelServer} from '../../models/quote';
import { UserService } from "../../services/user.service";
@Component({
  selector: 'app-backorder-view',
  templateUrl: './backorder-view.component.html',
  styleUrls: ['./backorder-view.component.scss']
})
export class BackorderViewComponent implements OnInit {

  
    isIgst: boolean;
    adminStateId: number;
  
  
    id: any;
    quotationDetail: any;
    //ntb name total branch
    quotationNTB: any;
    bAddress: any;
    priceInclTax: any[] = [];
  
    constructor(
      private quoteService: QuoteService,
      private router:Router,
      private userService: UserService,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.userService.getAdminDetail().subscribe(data =>{
        this.adminStateId = data.state_id
        console.log('A SID', this.adminStateId)
      })
  
      this.isIgst = true
      if(this.adminStateId == this.quotationNTB?.state_id){
        this.isIgst = false
      }
      //get single quotation
      this.route.paramMap.pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      ).subscribe(courId => {
        this.id = courId;
  
        this.quoteService.GetSingleBackorder(this.id).subscribe(qtn => {
          this.quotationDetail = qtn;
          console.log('Q Detail',this.quotationDetail)
          //this.
  
          //this.quotationDetail[index].priceInclTax = (this.quotationDetail[index].price * 1 + this.quotationDetail[index].price * (this.quotationDetail[index].tax_rate / 100))
  
        });
  
        this.quoteService.getBillingAddressBackorder(this.id).subscribe(bads => {
          this.bAddress=bads;
          console.log('bill add',this.bAddress)
        });
  
        this.quoteService.getbackorderNTB1(this.id).subscribe(temps => {
          this.quotationNTB=temps;
          console.log('NTB',this.quotationNTB)
        });
      });
  
  
      setTimeout(() => {
        if(this.adminStateId == this.quotationNTB?.state_id){
          this.isIgst = false
        }
      }, 300);
    }
    taxCalculationLocal(index: number) {
      console.log('I m from tax calc loacl')
      console.log('5')
      //console.log('index', index, 'tax', this.quoteTempData.data[index].tax )
      this.quotationDetail[index].priceInclTax = (this.quotationDetail[index].price * 1 + this.quotationDetail[index].price * (this.quotationDetail[index].tax_rate / 100))
      // return this.priceInclTax[index]
    }
  
  
    CalculateLineTotal(index): number {
      let subTotal = 0;
  
      const p = this.quotationDetail[index];
      // @ts-ignore
      subTotal = p.quantity * p.price;
  
      return subTotal;
    }
  
    edit(){
  
    }
  
    addToQuote(){
  
    }
  
  }
  
  
