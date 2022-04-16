import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {QuoteService} from '../../services/quote.service';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import { quoteDetailModelServer} from '../../models/quote';
import { UserService } from "../../services/user.service";
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-order-to-pack-ship',
  templateUrl: './order-to-pack-ship.component.html',
  styleUrls: ['./order-to-pack-ship.component.scss']
})
export class OrderToPackShipComponent implements OnInit {
  private serverURL = environment.serverURL;


  
    isIgst: boolean;
    adminStateId: number;
  
  
    id: any;
    quotationDetail: any;
    back: any;
    //ntb name total branch
    quotationNTB: any;
    bAddress: any;
    priceInclTax: any[] = [];
    toShip: any[] = [];
    unShipped: any[] = [];
    totalShipQuantity: number;
    totalPrice: number;
    checkValue: boolean;
    balanceQuantity: number;
  
    maxValue: number;
  
    constructor(
      //private confirmationDialogService: ConfirmationDialogService,
      private quoteService: QuoteService,
      private router:Router,
      private userService: UserService,
      private route: ActivatedRoute,
      private httpClient: HttpClient,
      private cd: ChangeDetectorRef,

  
    ) { }
  
    ngOnInit(): void {
      this.totalShipQuantity = 0
      this.userService.getAdminDetail().subscribe(data =>{
        this.adminStateId = data.state_id
        console.log('A SID', this.adminStateId)
      })
      this.isIgst = true
      //this.maxValue = 0
  
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
  
        this.quoteService.GetSingleOrderToPack(this.id).subscribe(qtn => {
          this.quotationDetail = qtn;
          //this.unShipped = this.quotationDetail
          console.log('unshipped', this.unShipped)
          console.log('Q Detail',this.quotationDetail)
  
          this.quotationDetail.forEach((e, index) => {
            const { quantity, Quantity } = e;
            this.quotationDetail[index].BQ = this.quotationDetail[index].balance_quantity
            this.cd.markForCheck();
            this.quotationDetail[index].Q = this.quotationDetail[index].Quantity
            this.quotationDetail[index].pack_quantity = 0
            this.quotationDetail[index].SQ = this.quotationDetail[index].shipped_quantity
            this.quotationDetail[index].checkValue = false
  
          if(this.quotationDetail[index].BQ <= this.quotationDetail[index].Quantity){
            this.quotationDetail[index].maxValue = this.quotationDetail[index].BQ
          }else{
            this.quotationDetail[index].maxValue = this.quotationDetail[index].Quantity
          }
        });
          console.log('max value', this.quotationDetail)
          //this.
          let length = this.quotationDetail.length
          let i;
          for(i=0; i<length;i++){
  
          }
          //this.unShipped = this.quotationDetail
          console.log('unshipped', this.unShipped)
          // this.quotationDetail.forEach(element => {
          //  let i = 0;
          //  this.quotationDetail[i].BQ = this.quotationDetail[i].balance_quantity
          // });
          //this.quotationDetail[index].priceInclTax = (this.quotationDetail[index].price * 1 + this.quotationDetail[index].price * (this.quotationDetail[index].tax_rate / 100))
  
        })
  
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
  
  
    reloadComponent() {
      console.log('I m from reaload comp')
  
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
      this.quoteService.resetServerData()
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
  
    filter(){
  
      console.log('back in filter', this.back)
        //let length = this.back.length
        let i = 0;
        this.balanceQuantity = 0
  
        this.back.forEach((e, index) => {
          this.back[index].SQ = this.back[index].shipped_quantity + this.back[index].pack_quantity
          this.balanceQuantity += this.back[index].BQ
          const { pack_quantity, checkValue} = e;
          if( pack_quantity == 0 && checkValue == false){
                //this.back.splice(i, 1);
                this.unShipped.push(
                  this.back[index]
                  )
              }else{
                this.toShip.push(
                  this.back[index]
                )
              }
  
        });
        // for(i=0; i<length; i++){
        //   console.log('ship q check', this.back[i].shipped_quantity )
        //   if( this.back[i].shipped_quantity == 0){
        //     this.back.splice(i, 1);
  
        //   }
        // }
      }
  
    check(i){
      console.log('check value', this.quotationDetail[i].checkValue)
      console.log(this.quotationDetail)
    }
  
    packedQuantityChange(i){
      if(this.quotationDetail[i].pack_quantity > this.quotationDetail[i].balance_quantity || this.quotationDetail[i].pack_quantity > this.quotationDetail[i].Quantity ){
        alert("Pack Quantity should not be more than ordered quantity or available Quantity")
            setTimeout(() => {
              // this.quotationDetail[i].BQ = this.quotationDetail[i].balance_quantity - this.quotationDetail[i].pack_quantity
              // this.cd.markForCheck();

              // this.quotationDetail[i].Q = this.quotationDetail[i].Quantity - this.quotationDetail[i].pack_quantity
              // this.cd.markForCheck();


              if(this.quotationDetail[i].balance_quantity <= this.quotationDetail[i].Quantity){
                this.quotationDetail[i].pack_quantity = this.quotationDetail[i].balance_quantity
                console.log('my test 1',this.quotationDetail[i].pack_quantity,  this.quotationDetail[i].balance_quantity)
                this.cd.markForCheck();

              }else{
                this.quotationDetail[i].pack_quantity = this.quotationDetail[i].Quantity
                console.log('my test 2',this.quotationDetail[i].pack_quantity,  this.quotationDetail[i].Quantity)
                this.cd.markForCheck();


              }
              this.quotationDetail[i].BQ = this.quotationDetail[i].balance_quantity - this.quotationDetail[i].pack_quantity
              this.quotationDetail[i].Q = this.quotationDetail[i].Quantity - this.quotationDetail[i].pack_quantity
              this.cd.markForCheck();


            }, 10);
            this.cd.markForCheck();

      }else{
        this.quotationDetail[i].BQ = this.quotationDetail[i].balance_quantity - this.quotationDetail[i].pack_quantity
        this.quotationDetail[i].Q = this.quotationDetail[i].Quantity - this.quotationDetail[i].pack_quantity
        this.cd.markForCheck();

      }
  
      let length = this.quotationDetail.length
      let j:any;
      this.totalShipQuantity = 0
      this.totalPrice = 0
      setTimeout(() => {
      for(j=0; j<length;j++){
        console.log('test 1', this.quotationDetail[j])
        console.log('test 2', this.quotationDetail[j].pack_quantity)
        this.totalShipQuantity +=  this.quotationDetail[j].pack_quantity
        //this.totalPrice = this.totalPrice + (this.quotationDetail[j].line_discount_price * this.quotationDetail[j].pack_quantity)
        console.log('test 3', this.quotationDetail[j].line_discount_price)
        console.log('test 4', this.quotationDetail[j].pack_quantity)
        let y: number;
        y = this.quotationDetail[j].line_discount_price * this.quotationDetail[j].pack_quantity
        this.totalPrice += y
        console.log('y', y)
        console.log('test 5', this.quotationDetail[j])
        this.cd.markForCheck();

  
        console.log('test total', this.totalPrice)
      }
      this.cd.markForCheck();

    }, 20);
  
      console.log('tot ship quantity', this.totalShipQuantity)
  
  
      //if(this.quotationDetail[i].BQ > 0)
      //this.toShip[]
  
      //this.quotationDetail[i].balance_quantity = this.quotationDetail[i].balance_quantity - this.quotationDetail[i].shipped_quantity
      this.cd.markForCheck();

    }

    select(){
      
    }
  
    ship(){
      if(this.totalShipQuantity == 0){
        return alert("No items added")
      }
      if (confirm('Are you sure you want to save this thing into the database?')) {
        // Save it!
        console.log('Thing was saved to the database.');
        console.log('QD to back', this.quotationDetail)
        this.back = this.quotationDetail
  
        // let length = this.back.length
        // let i;
        // for(i=0; i>length; ++i){
        //   console.log('ship q check', this.back[i].shipped_quantity )
        //   if( this.back[i].shipped_quantity == 0){
        //     this.back.splice(i, 1);
  
        //   }
        // }
        this.filter()
  
  
        console.log('back test', this.back)
  
        this.httpClient.post(`${this.serverURL}/quote/deliveryChalan`, {
          DC: this.toShip, totalShipQuantity : this.totalShipQuantity, billId : this.bAddress.id, shipId: this.quotationNTB.id, backOrderId: this.id, customer_id: this.quotationNTB.customer_id, total_price: this.totalPrice, balanceQuantity: this.balanceQuantity
        }).subscribe(() => {
          console.log(Response)
        })
  
  
        setTimeout(() => {
          this.reloadComponent()
        }, 500);
  
  
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }
  
      console.log('QD to back', this.back)
  
  
  
      // let length = this.quotationDetail.length
      // this.toShip = []
      // this.unShipped = []
      // let i;
      //for all order detail
  //     for(i=0; i<=length;i++){
  //       // this.quotationDetail[i].BQ = this.quotationDetail[i].balance_quantity
  
  //       // if there is item in ship quantity
  //       console.log('QD Sid', this.quotationDetail[i].shipped_quantity)
  //       if (this.quotationDetail[i].shipped_quantity > 0){
  
  //         // if there is no item in ship
  //         if (this.toShip[0] == undefined) {
  //           console.log('this qd', this.quotationDetail[i])
  //           this.toShip[0] = this.quotationDetail[i];
  //       }else{
  
  //         const index = this.toShip.findIndex(p => p.product_id === this.quotationDetail[i].product_id);  // -1 or a positive value
  
  //         // if that item already in the ship list  =>  index is positive value
  //         if (index !== -1) {
  //           this.toShip[index] = this.quotationDetail[i].BQ
  
  //       }else{
  //         this.toShip.push({
  //           TSI: this.quotationDetail[i]
  //       })
  //     }
  //   }
  //   }else{
  //             // if there is no item in ship
  //             if (this.unShipped[0] === undefined) {
  //               this.unShipped[0] = this.quotationDetail[i];
  //           }else{
  
  //             const index = this.unShipped.findIndex(p => p.product_id === this.quotationDetail[i].product_id);  // -1 or a positive value
  
  //             // if that item already in the ship list  =>  index is positive value
  //             if (index !== -1) {
  //               this.unShipped[index] = this.quotationDetail[i].BQ
  
  //           }else{
  //             this.unShipped.push({
  //               TSI: this.quotationDetail[i]
  //           })
  //         }
  //       }
  //   }
  // }
  
  console.log('to ship', this.toShip)
  console.log('un ship', this.unShipped)
  
  }
  
    // public openConfirmationDialog() {
    //   this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    //   .then((confirmed) => console.log('User confirmed:', confirmed))
    //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    // }
  
  }
