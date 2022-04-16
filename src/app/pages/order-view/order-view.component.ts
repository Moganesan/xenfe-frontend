import { Component, OnInit } from '@angular/core';
import {QuoteService} from '../../services/quote.service';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import { quoteDetailModelServer} from '../../models/quote';
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  
    isIgst: boolean;
    adminStateId: number;
    
    countries: [{id_country: any, name: any}];
    countriesAdd: any[] = [];
    states: any [] = [];

    Bcountries: [{id_country: any, name: any}];
    BcountriesAdd: any[] = [];
    Bstates: any [] = [];

    state: any;
    country: any;

    Bstate: any;
    Bcountry: any;


    countryName: any;
    stateName: any;

    BcountryName: any;
    BstateName: any;


  
  
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


      this.userService.getAllCountry().subscribe(data => {
        this.countries = data.countries;
        this.countriesAdd = data.countries;
        console.log('countries', this.countries)


      


  
      this.isIgst = true

      //get single quotation
      this.route.paramMap.pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      ).subscribe(courId => {
        this.id = courId;
  
        this.quoteService.GetSingleProductorder(this.id).subscribe(qtn => {
          this.quotationDetail = qtn;
          console.log('Q Detail',this.quotationDetail)
          //this.
  
          //this.quotationDetail[index].priceInclTax = (this.quotationDetail[index].price * 1 + this.quotationDetail[index].price * (this.quotationDetail[index].tax_rate / 100))
  
        });
  
        this.quoteService.getBillingAddressProductorder(this.id).subscribe(bads => {
          this.bAddress=bads;
          console.log('bill add',this.bAddress)


          this.userService.getAllStates(this.bAddress.country_id).subscribe(data => {
            this.Bstates = data.states
            console.log('states',this.Bstates)
            this.Bstate = this.Bstates.filter(res => {
              return res.id_state == this.bAddress.state_id
            })
            console.log('state', this.Bstate)
            this.BstateName = this.Bstate[0].name
          })


          this.Bcountry = this.countries.filter(res => {
            return res.id_country == this.bAddress.country_id
          })

          this.BcountryName = this.Bcountry[0].name



        });

      })
  
        this.quoteService.getproductorderNTB1(this.id).subscribe(temps => {
          this.quotationNTB=temps;
          console.log('NTB',this.quotationNTB)

          console.log('is igst123',this.adminStateId, this.quotationNTB?.state_id)

          if(this.adminStateId == this.quotationNTB?.state_id){
            this.isIgst = false
            console.log('is igst',this.isIgst)
          }

          console.log('is igst',this.isIgst)



          this.userService.getAllStates(this.quotationNTB.country_id).subscribe(data => {
            this.states = data.states
            console.log('states',this.states)
            this.state = this.states.filter(res => {
              return res.id_state == this.quotationNTB.state_id
            })
            console.log('state', this.state)
            this.stateName = this.state[0].name
          })



          this.country = this.countries.filter(res => {
            return res.id_country == this.quotationNTB.country_id
          })

          this.countryName = this.country[0].name

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
  
  
  