import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { QuoteService } from "../../services/quote.service";
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-unbilled-products',
  templateUrl: './unbilled-products.component.html',
  styleUrls: ['./unbilled-products.component.scss']
})
export class UnbilledProductsComponent implements OnInit {

  
    private dcdiddataserver: dcdids = {
      data: []
    };
  
    dcdiddataserver1: any[] = []
    dcdidQ : any
  
    id: any;
    dcProductList: any;
    customer_data: any;
    total: any;
    dcdIdToPos: any[] = [];
    dcdidData$ = new BehaviorSubject<dcdids>(this.dcdiddataserver);
  
  
    constructor(
      private userService: UserService,
      private quoteService: QuoteService,
      private route: ActivatedRoute
  
    ) { }
  
    ngOnInit(): void {
      this.total = 0
      this.route.paramMap.pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      ).subscribe(tempId => {
        this.id = tempId;
  
        this.userService.getAllUnBilledWithCustId(this.id).subscribe(D => {this.dcProductList = D.data, console.log('test1', D), this.customer_data = D.cusD, console.log('test',  this.dcProductList, this.customer_data),
        this.dcProductList.forEach(e => {
          e.check = false
        });
        console.log('final', this.dcProductList)
      })
      });
  
    }
  
    change(){
      console.log(this.dcProductList)
      let total = 0;
      this.dcdiddataserver.data = []
      this.dcdiddataserver1 = []
      this.dcdidQ = []
      this.dcProductList.forEach(e => {
        if(e.check == true){
          total += e.line_total
          console.log('dcdid', e.dcd_id)
          //e.dcd_id.push(this.dcdiddataserver.data)
  
          this.dcdiddataserver.data.push(e.dcd_id)
          this.dcdiddataserver1.push(e.dcd_id)
          this.dcdidQ.push(e)
          // this.QuoteDataClient.prodData.push({
          //   inquote: 1,
          //   id: prod.id,
          //   discount: 0
  
          // });
  
  
  
          //this.dcdidData$.next({...e.dcd_id});
          console.log('check val', this.dcdiddataserver.data )
          console.log('check val1', this.dcdiddataserver1 )
  
  
  localStorage.setItem("names", JSON.stringify(this.dcdiddataserver1));
  localStorage.setItem("dcdidQ", JSON.stringify(this.dcdidQ));
  localStorage.setItem("custData", JSON.stringify(this.customer_data));
  console.log("customer", this.customer_data)

  
  
  //...
  var storedNames = JSON.parse(localStorage.getItem("names"));
  console.log('local check', storedNames)
  
        }
      });
      this.total = total
      this.quoteService.addUnbilledInBehaviourSubject(this.dcdiddataserver.data)
      this.dcdidData$.next({...this.dcdiddataserver});
      console.log('c', this.total, this.dcdidData$)
    }
  
  }
  
  
  export interface dcdids {
    data : any[]
  }
  
