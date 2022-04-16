import { UserService } from "../../services/user.service";
import { QuoteService } from "../../services/quote.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { Component, OnInit, ViewChild ,Input, NgZone ,ChangeDetectorRef} from '@angular/core';
import { QuoteTempModelServer, QuoteTempModelPublic, taxSummary } from '../../models/quote';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
//import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { identifierName } from '@angular/compiler';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {


  
    
  
    
    
      
      
      
        closeResult: string;
      
        /////////////////////////////
      
      
        name101: any;
        userSelection01: any;
        cust01: any;
        customer_details01: any[] = [];
        displayo1 : boolean
        userid01 : number;
      
      
            countries: [{id_country: any, name: any}];
            states: any [] = [];
      
            country_id : any;
      
          data = {Branch: '',
          Salution: '',
          FirstName : '',
          SecondName: '',
          CompanyName: '',
          GSTIN: '',
          AddressLine1: '',
          AddressLine2: '',
          City: '',
          Pincode: '',
          State: 336,
          Country: 110,
          Landline: '',
          Mobile: '',
          WhatsApp: '',
          customer_id: localStorage.getItem('userid1')
      }
      
      
      //////////////////////////
          adminStateId: number;
          isIgst: boolean;
      
          product_details : any[] = []
      
          summaryData: taxSummary = {
            uniqueTaxvalue : [],
            uniqueTaxId : [],
            totalValueOfUniqueTax : []
          }
          private quoteDataClient: QuoteTempModelPublic = {
            total: 0,
            prodData: [{
              inquote: 0,
              id: 0,
              price: 0,
              igst: 0,
              cgst:0,
              sgst: 0,
              taxRate: 0,
              discount: 0,
              lineTotal: 0,
              tax_id: 0
            }]
          };
      
          display : boolean
          display1 : boolean
          SummaryValue: any[] = [];
      
                private serverURL = environment.serverURL;

          private serverUrl = `${this.serverURL}/tempUpload`;

          @ViewChild('quantity') quantityInput: any;
          templeteDesc: any;
          templeteName: any;
          product: any;
          initialProducts: any;
          name1: any;   //note name n caps
          productSelection: any;
          quantity: number;
          productId: any;
          userid: any;
          quoteTempData: QuoteTempModelServer;
      
          inDisplay: [{
            priceInclTax: number,
            discount: any,
            price: number,
            discountPrice: any,
            cgst: number,
            sgst: any,
            tax: any,
            lineTotal: any
          }]
          lineTotal: any[] = []
          lineDiscountPrice: any
          summaryTaxDiv : number[] = []
          summaryCGSTDiv : number[] = []
          summarySGSTDiv : number[] = []
          summaryTaxLineTotal : number[] = []
      
      
          //taxSummary: any[]
      
          taxSummSore: any
      
      
          quoteTempTotal: number;
          subTotal: number;
          productDetail: any;
          dataToBack: any;
          customer_details: any[] = [];
          name: any;
          Sname: any;
          userSelection: any;
          SuserSelection: any;
          cust: any;
          Scust: any;
          custId: any;
          address: any[]=[];
          @Input() selectedAddress: any;
          selectedSAddress: any;
          Saddress: any[]=[];
          custDet: any;
          custMobile: any;
          discountAmt: any;
          disPercent: any;
          discountInput: any[] = []
          discGrp: any;
      
      
          // Tax dependancies
      
          Amount: number;
          taxAmount: number;
          taxRate: number;
          finalAmt: number;
          amtWtax: number;
          isChecked: boolean;
          isDiscountChecked: boolean;
          discountRate: number;
          finalAmount: number;
          finalAmtWT: number;
          taxAmtAfterDiscount: number;
          amtWTAfterDiscount: number;
          amountForCalc: number;
          Quantity: number;
          finalAmtWTaq: number;
          taxAmountaq: number;
          finalAmtaq: number;
          CGST: number;
          SGST: number;
          taxAmountsgst: number;
          taxAmountcgst: number;
          finalAmtWTcgst: number;
          finalAmtWTsgst: number;
          taxAmountaqCGST: number;
          taxAmountaqSGST: number;
          finalAmtWTCS: number;
          isChecked1: boolean;
          lineTax: number;
          finalTax: number;
          tax: any[] = [];
          totalCgst: number;
          totalSgst: number;
          totalIgst: number;
          subtotalWithoutTax: number;
      
      
      
      
          constructor(
            private cdr: ChangeDetectorRef,
            private zone:NgZone,
        private modalService: NgbModal,
            private userService: UserService,
            public quoteService: QuoteService,
            private router: Router,
      
            private productService: ProductService,
            private httpClient: HttpClient,
            //private spinner: NgxSpinnerService,
          ) { }
    
    
          ngAfterContentChecked() {
            this.cdr.detectChanges();
        }
    
    
      
          ngOnInit(): void {
      
      
      
            this.userService.getAllCustDetail().subscribe(custD => {
              this.customer_details01 = custD.customers_Details;
            })
      
      
            this.userService.getAllCountry().subscribe(data => {
              this.countries = data.countries;
              console.log('countries', this.countries)
            })
      
            this.userService.getAllStates(this.data.Country).subscribe(data => {
              this.states = data.states
              //console.log(this.states)
            })
      
      
      
      
      
            this.isIgst = true
      
            this.userService.getAdminDetail().subscribe(data =>{
              this.adminStateId = data.state_id
              console.log('A SID', this.adminStateId)
            })
            this.totalCgst = 0
            this.totalSgst = 0
            this.totalIgst = 0
            this.subTotal = 0
            this.display = false;
            console.log('I m from ngOninit')
            //this.userSelection = this.selectedAddress
            //this.this.quoteTempData.data[index].tax = 0;
            this.discountRate = 0;
            this.amountForCalc = 0;
            this.Quantity = 1;
      
            this.userService.getAllCustDetail().subscribe(custD => {
              this.customer_details = custD.customers_Details;
            })
            this.quantity = 1;
            this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
            this.quoteService.quoteTempData$.subscribe((data: QuoteTempModelServer) => this.quoteTempData = data);
            this.productService.getAllProducts().subscribe(prods => {
              this.initialProducts = prods.products;
            });
            this.userid = localStorage.getItem('userid1');
          }
      
          checkBoxOnSelect(){
      
            this.quoteTempData.data.forEach((value, i) => {
              this.calculateLineDiscountPrice(i)
              this.discountOnChange(i)
              //this.totalCgst += cgst;
            });
      
          }
      
          // callAll(i) {
          //   this.quoteService.CalculateQuoteSubTotal(i);
          //   this.quoteService.CalculateQuoteTotal();
          //   this.calculateLineDiscountPrice(i);
          //   this.taxCalculationLocal(i);
          //   this.calculateTax(i)
          //   this.quoteService.CalculateTempTotal();
          //   this.calculateLineTax(i)
          // }
      
      
      
          taxCalculation(amount: number, index: number) {
            console.log("test", index)
            console.log('I m from taxCalculation',this.quoteTempData.data[index].tax )
            console.log('tax', this.quoteTempData.data[index].tax)
      
            return (amount * (this.quoteTempData.data[index].tax / 100))
          }
      
          addAddress(){
            this.quoteService.getAddressById(this.custDet.customer_id).subscribe(ads => {
              this.address = ads;
              this.Saddress = ads;
      
              //this.userSelection = ads;
              console.log('ADS',ads)
            });
          }
      
      
          taxCalculationLocal(index: number) {
            console.log('I m from tax calc loacl')
            console.log('5')
            //console.log('index', index, 'tax', this.quoteTempData.data[index].tax )
            this.quoteTempData.data[index].priceInclTax = (this.quoteTempData.data[index].product.price * 1 + this.quoteTempData.data[index].product.price * (this.quoteTempData.data[index].tax / 100))
            return this.quoteTempData.data[index].priceInclTax
          }
      
          taxCalculationReverse(amount: number, index: number) {
            console.log('I m from tax calc rev')
      
            return (amount / (1 + (this.quoteTempData.data[index].tax / 100)))
          }
      
          calculateTax(i: any) {
            console.log('I m from calc tax')
      
      
            this.quoteService.CalculateQuoteTotal();
      
            if (this.isChecked1 == true) {
              //console.log('checked',this.isChecked )
              this.amountForCalc = this.Amount - this.discountRate
              this.CGST = this.quoteTempData.data[i].cgst_rate;
              console.log('cgst', this.CGST)
              this.SGST = this.quoteTempData.data[i].sgst_rate;
              //console.log('amt f c', this.amountForCalc)
      
              this.finalAmtWT = this.taxCalculationReverse(this.amountForCalc, this.quoteTempData.data[i].tax)
      
              this.finalAmtWTCS = (this.finalAmtWT * (this.CGST / 100))
              console.log('cgst, sgst', this.finalAmtWTCS)
              //rev to forward
              this.finalAmtWTcgst = this.taxCalculationReverse(this.amountForCalc, this.CGST)
              console.log('final amount with tax(cgst)', this.finalAmtWTcgst)
              this.finalAmtWTsgst = this.taxCalculationReverse(this.amountForCalc, this.SGST)
              //console.log('tax', this.finalAmtWT)
              //this.finalAmtWT = (this.Amount * (this.quoteTempData.data[i].tax / 100))
      
      
              this.taxAmount = this.amountForCalc - this.finalAmtWT
              this.finalAmt = this.amountForCalc
      
              this.taxAmountcgst = this.amountForCalc - this.finalAmtWTcgst
      
              this.taxAmountsgst = this.amountForCalc - this.finalAmtWTsgst
      
            } else {
              this.amountForCalc = this.quoteTempData.data[i].product.price
              //this.amountForCalc = this.Amount - this.discountRate
              //this.quoteTempData.data[i].tax
              this.taxAmount = (this.amountForCalc * (this.quoteTempData.data[i].tax / 100));
              this.CGST = this.quoteTempData.data[i].cgst_rate
              this.SGST = this.quoteTempData.data[i].sgst_rate
              this.finalAmtWTCS = (this.amountForCalc * (this.CGST / 100))
              this.taxAmountcgst = (this.amountForCalc * (this.CGST / 100));
              this.taxAmountsgst = (this.amountForCalc * (this.SGST / 100));
              this.finalAmt = this.amountForCalc * 1 + this.taxAmount * 1
              this.finalAmtWT = this.amountForCalc
            }
      
            this.finalAmtWTaq = this.Quantity * this.finalAmtWT
            this.taxAmountaq = this.Quantity * this.taxAmount
            this.finalAmtaq = this.Quantity * this.finalAmt
            this.taxAmountaqCGST = this.Quantity * this.finalAmtWTCS
            this.taxAmountaqSGST = this.Quantity * this.finalAmtWTCS
      
          }
      
      
          discountOnChange(i: any) {
            // if(this.quoteTempData.data[i].numInQuote < 1){
            //   this.quoteTempData.data[i].numInQuote = 1
            // }
            console.log('I m from disc on change.......', this.quoteTempData.data[i].tax)
            this.taxCalculationLocal(i)
            this.calculateLineDiscountPrice(i)
            //this.quoteService.CalculateQuoteSubTotal(i);
            this.quoteTempData.data[i].linetotal = this.quoteService.CalculateQuoteSubTotal(i)
            console.log('testing', this.quoteTempData.data[i].linetotal , this.quoteService.CalculateQuoteSubTotal(i))
      
            //this.lineTotal = this.quoteService.CalculateQuoteSubTotal(i)
            this.calculateLineTax(i)
      
            console.log('f1')
      
            this.quoteService.CalculateQuoteTotal();
            console.log('f2')
        // -------------------------------------------------------------------------------------------------------------------------------------------------
           // this.calculateLineDiscountPrice(i);
        // 1-------------------------------------------------------------------------------------------------------------------------------------------------
      
            //this.taxCalculationLocal(i);
            this.calculateTax(i)
            console.log('f4')
      
            this.quoteService.CalculateTempTotal().subscribe(data => {console.log('test daradadada', data),
            this.subtotalWithoutTax=this.quoteTempTotal - this.totalIgst
          });
            console.log('f5')
            this.summary()
      
            //this.calculateLineTax(i)
      
            // setTimeout(() => {
            //   this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
            // }, 1000);
            //this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
            //this.ngOnInit
            //console.log('tot', this.quoteTempTotal)
            // setTimeout(() => {
            //   this.subtotalWithoutTax=this.quoteTempTotal - this.totalIgst
            // }, 500);
          }
      
      
          search() {
            console.log('I m from search')
      
            this.name == "";
            this.productSelection = "";
            if (this.name == "") {
              //this.ngOnInit();
            } else {
              this.product = this.initialProducts.filter(res => {
                return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
              })
            }
            setTimeout(() => {
              this.productSelection = this.product[0].id
              console.log('auto select check',this.productSelection )
      //       this.cdr.detectChanges();
            this.cdr.markForCheck();
            }, 100);
          }
      
          addFunction() {
            this.display1 = true;
            if (this.productSelection == "") {
              alert("Please Choose a Product")
            } else {
              this.quoteService.AddProductToTempQuote(this.productSelection, this.quantity);
            }
            setTimeout(() => {
      
              let length = this.quoteTempData.data.length - 1
              this.taxCalculationLocal(length)
              this.quoteService.getTaxRate(this.quoteTempData.data[length].tax_id).subscribe(data => {
                this.quoteTempData.data[length].tax = data.tax_rate
              })
              this.quoteService.getTaxRule(this.quoteTempData.data[length].tax_id).subscribe(data => {
                this.quoteTempData.data[length].cgst_rate = data[0].tax_rate
                this.quoteTempData.data[length].sgst_rate = data[1].tax_rate
                this.quoteTempData.data[length].igst_rate = data[2].tax_rate
              })
              console.log('value',this.taxCalculationLocal(length) )
              this.quoteTempData.data[length].priceInclTax = this.taxCalculationLocal(length)
              this.quoteTempData.data[length].lineDiscountPrice = this.quoteTempData.data[length].priceInclTax
              console.log(length)
              // console.log(this.quoteTempData.data[length].product.price)
              // console.log(this.quoteTempData.data[length].lineDiscountPrice)
              this.quoteTempData.data[length].linetotal = this.quoteTempData.data[length].lineDiscountPrice * this.quoteTempData.data[length].numInQuote
              this.discountOnChange(length)
            }, 1000);
            setTimeout(() => {
              let length = this.quoteTempData.data.length - 1
              this.discountOnChange(length)
              this.summary()
            }, 2000);
            // setTimeout(() => {
            //   this.subtotalWithoutTax=this.quoteTempTotal - this.totalIgst
            // }, 2500);
          }
      
          deleteProduct(i: number) {
            console.log('I m from del product')
      
            this.quoteService.deleteProduct(i);
      
          }
      
          OnSelect(id: any) {  //note o caps
            console.log('I m from On select')
      
            this.productId = id;
            this.quantity = 1;
          }
      
          test(){
            for (let i = 0; i < this.quoteTempData.data.length; i++) {
              this.product_details[i] = this.quoteTempData.data[i].product
              console.log(this.quoteTempData.data[i].product)
      
            }
            console.log(this.productDetail)
          }
      
          save2() {
            console.log('I m from save 2')
            // this.quoteTempData.data.forEach(p => {
            //   const { cgst } = p;
            //   const { sgst } = p;
            //   let i = 0
      
            // });
      
            // for (let i = 0; i < this.quoteTempData.data.length; i++) {
            //   this.product_details[i] = this.quoteTempData.data[i].product
            //   console.log(this.productDetail)
            // }
            // this.product_details = this.quoteTempData.data
      
      
      
                //this.resetServerData();
                this.httpClient.post(`${this.serverURL}/quote/newPosOrder`, {
                  cust_id:this.custDet.customer_id,shippingId: this.selectedAddress.id, billingId: this.selectedSAddress.id, total: this.quoteTempTotal, totalCgst: this.totalCgst, totalSgst: this.totalSgst, totalIgst: this.totalIgst, subTotal: this.subtotalWithoutTax, taxSummary: this.taxSummSore,
                  product: this.quoteTempData.data
                }).subscribe(() =>{
                  console.log(Response)
                })
      
      
      
                // setTimeout(() => {
                //   this.router.navigate(['/quotation-list'])
                // }, 100);
      
            // this.quoteService.createQuote(this.custDet.customer_id, this.selectedAddress.id, this.selectedSAddress.id, this.quoteTempTotal);
            // this.dataToBack = {
            //   custId: this.custDet.customer_id,
            //   shippingId: this.selectedAddress.id,
            //   billingId: this.selectedSAddress.id,
            //   total: this.quoteTempTotal,
            //   product: this.quoteTempData.data
            // };
          }
      
          search1() {
            console.log('I m from seach 1')
      
            this.name1 == "";
            this.userSelection = "";
            if (this.name1 == "") {
              this.ngOnInit();
            } else {
              this.cust = this.customer_details.filter(res => {
                return res.first_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.second_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.company_name?.toLocaleLowerCase().match(this.name1?.toLocaleLowerCase()) || res.mobile?.toString().toLocaleLowerCase().match(this.name1?.toLocaleLowerCase())
              })

              setTimeout(() => {
                this.userSelection = this.cust[0].customer_id
       //       this.cdr.detectChanges();
              this.cdr.markForCheck();
              }, 100);
            }
          }
      
          Ssearch() {
            console.log('I m from S search')
      
            this.Sname == "";
            this.SuserSelection = this.selectedAddress;
            if (this.Sname == "") {
              this.ngOnInit();
            } else {
              this.Scust = this.customer_details.filter(res => {
                return res.first_name?.toLocaleLowerCase().match(this.name?.toLocaleLowerCase()) || res.second_name?.toLocaleLowerCase().match(this.name?.toLocaleLowerCase()) || res.company_name?.toLocaleLowerCase().match(this.name?.toLocaleLowerCase()) || res.mobile?.toString().toLocaleLowerCase().match(this.name?.toLocaleLowerCase())
              })
            }
          }
      
          reloadComponent() {
            console.log('I m from reaload comp')
      
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
          }
      
          onSelect(id: any) {
            this.display = true
            console.log('I m from on select')
      
            this.quoteService.getAddressById(id).subscribe(ads => {
              this.address = ads;
              this.Saddress = ads;
              //this.userSelection = ads;
              console.log('ADS',ads)
           
      
            console.log('ADS',this.address)
      
      
            this.userService.getSingleCustDetail(id).subscribe(data => {
              this.custDet = data.customers_Details
              console.log('CD',this.custDet)
              let addressShipId = data.customers_Details.default_ship_address;
              let addressBillId = data.customers_Details.default_bill_address;
              console.log("A Id", addressShipId)
    
            
    
              if(addressShipId == null){
                this.selectedAddress = this.Saddress[0]
                console.log('I am working fine', this.selectedAddress, this.Saddress[0] )
    
              }else{
              this.quoteService.getAddressByAddId(addressShipId).subscribe(ads => {
                this.selectedAddress = ads;
                this.userSelection = this.selectedAddress
      
                this.selectedAddress.country = this.countries.filter(res => {
                  return res.id_country == this.selectedAddress.country_id
                })
                console.log('Address', this.selectedAddress)
              })
            }
    
    
            if(addressBillId == null){
              this.selectedSAddress = this.Saddress[0]
            }else{
              this.quoteService.getAddressByAddId(addressBillId).subscribe(ads => {
                this.selectedSAddress = ads;
                console.log('Address', this.selectedSAddress)
              })
            }
      
            //   setTimeout(() => {
            //     console.log('I am working fine')
            //   if(addressShipId == null){
            //     this.selectedAddress = this.Saddress[0]
            //     console.log('I am working fine', this.selectedAddress, this.Saddress[0] )
    
            //   }
            //   if(addressBillId == null){
            //     this.selectedSAddress = this.Saddress[0]
            //   }
      
      
            // }, 1000);
      
            })
          });
      
            this.custId = id;
      
            setTimeout(() => {
              console.log('cust det1', this.custDet, this.Saddress.length, this.adminStateId, this.selectedAddress, this.SummaryValue)
              console.log('selected ads', this.selectedAddress.state_id)
              console.log('length test', this.Saddress.length)
              console.log('ADS',this.address)
              if(this.adminStateId == this.selectedAddress.state_id){
                this.isIgst = false
              }
              // if(this.Saddress.length == 1 ){
              //   this.selectedAddress = this.Saddress[0]
              //   this.selectedSAddress = this.Saddress[0]
              //   //this.selectedAddress = this.Saddress[index]
              // }
      
              this.quoteService.getCustDG(this.custDet.disc_group_id).subscribe(data => {
                this.discGrp = data
              })
            }, 1000);
            setTimeout(() => {
              console.log('desc detoo', this.discGrp)
            }, 1000);
            this.cdr.detectChanges();
    
          }
      
          onSelectQ(index: any) {
            console.log('I m from select q')
      
            this.selectedAddress = this.Saddress[index]
      
          }
      
          onSelectS(index: any) {
            console.log('I m from select s')
      
            this.selectedSAddress = this.address[index]
          }
      
          calculateLineDiscountPrice(index: number) {
            console.log('I m from calc line disc')
      
      
            let price = 0
            if (this.isChecked != true) {
              price = (this.quoteTempData.data[index].product.price * 1 + this.quoteTempData.data[index].product.price * (this.quoteTempData.data[index].tax / 100))
            } else {
              price = this.quoteTempData.data[index].product.price
            }
            if (this.discGrp.discount_value != 0) {
              console.log('test', this.discGrp.discount_value)
              var dispercent = this.discGrp.discount_value
              var discountAmt = this.discGrp.discount_value
              var dispAmt: number = discountAmt
              discountAmt = price * (discountAmt / 100);
              this.quoteTempData.data[index].discount = dispercent
            } else {
              var discountAmt = this.quoteTempData.data[index].discount;
              if (discountAmt && discountAmt.includes('%')) {
                let disPercent: number = parseFloat(discountAmt.replace('%', ''));
                discountAmt = price * (disPercent / 100);
              }
            }
            //this.quoteTempData.data[index].discountPrice = this.calculateLineDiscountPrice(index)
            var x: number = (price - discountAmt);
            if (this.isChecked == true) {
      
              //x = x*1 + x*(this.quoteTempData.data[index].tax/100)
              this.quoteTempData.data[index].discountPrice = (price - discountAmt)
              //*1 + (price - discountAmt)*(this.quoteTempData.data[index].tax/100)
            } else {
              this.quoteTempData.data[index].discountPrice = (price - discountAmt);
              //this.quoteTempTotal = this.quoteTempTotal*1 + this.quoteTempTotal*(this.quoteTempData.data[index].tax/100)
            }
            this.ngOnInit
            setTimeout(() => {
              this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
            }, 1000);
            //this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
      
            this.quoteTempData.data[index].lineDiscountPrice = x
            //this.lineDiscountPrice = x
            return x
          }
      
          calculateLineTax(i: number) {
            console.log('I m from calc line tax')
      
            //this.calculateFinalTax()
            let amount = this.quoteService.CalculateQuoteSubTotal(i)
            let x = (amount / (1 + (this.quoteTempData.data[i].tax / 100)))
            Math.round(x * 100) / 100
            let bastAmt = x
            x = amount - x
      
            let amountWithoutTax = x
            // this.lineSgst = (bastAmt * ((this.quoteTempData.data[i].tax/2) / 100))
            // this.lineCgst = (bastAmt * (this.quoteTempData.data[i].tax/2 / 100))
      
            this.quoteTempData.data[i].cgst = (bastAmt * ((this.quoteTempData.data[i].cgst_rate) / 100))
            this.quoteTempData.data[i].sgst = (bastAmt * ((this.quoteTempData.data[i].sgst_rate) / 100))
            this.quoteTempData.data[i].igst = (bastAmt * ((this.quoteTempData.data[i].igst_rate) / 100))
      
            let total = 0
            let total1 = 0
            let total2 = 0
            //this.calculateLineTax(i)
            //console.log('array length',this.quoteTempData.data.length )
            this.quoteTempData.data.forEach(p => {
              const { cgst } = p;
              const { sgst } = p;
              const { igst } = p;
      
              //this.totalCgst += cgst;
              total += cgst;
              total1 += sgst;
              total2 += igst;
      
            });
            this.totalCgst = total;
            this.totalSgst = total1;
            this.totalIgst = total2;
      
            let CSgst = (this.quoteTempData.data[i].tax / 100) / 2
            //this.finalCSgst = (amount / (1 + (CSgst / 100)))
            return x
          }
      
          calculateFinalTax() {
            console.log('I m from calc final tax')
      
            //this.totalCgst =
            let total = 0
            //this.calculateLineTax(i)
            //console.log('array length',this.quoteTempData.data.length )
            this.quoteTempData.data.forEach(p => {
              const { cgst } = p;
              const { sgst } = p;
              //this.totalCgst += cgst;
              total += cgst;
            });
            // total cgst and sgst in total
            this.totalCgst = total;
            //this.totalSgst += sgst;
            console.log('total tax', this.totalCgst)
            //this.subtotalWithoutTax =
          }
      
      
          functionSummary(value : number, i: number){
      
            let j;
            let lineLength = this.quoteTempData.data.length
      
      
            for (j = 0; j < lineLength; ++j){       // table line cycle
              console.log('tax', this.quoteTempData.data[j].tax)
               if(value == this.quoteTempData.data[j].tax){     //  if value matches
                console.log('matches')
                console.log('tax add', this.quoteTempData.data[j].igst)
                console.log('smry tx', this.summaryTaxDiv)
                console.log('index', j)
                 this.summaryTaxDiv[i] = this.summaryTaxDiv[i] + this.quoteTempData.data[j].igst // add if matches
                 this.summaryCGSTDiv[i] = this.summaryCGSTDiv[i] + this.quoteTempData.data[j].cgst // add if matches
                 this.summarySGSTDiv[i] = this.summarySGSTDiv[i] + this.quoteTempData.data[j].sgst // add if matches
                 this.summaryTaxLineTotal[i] = this.summaryTaxLineTotal[i] + this.quoteTempData.data[j].linetotal - this.quoteTempData.data[j].igst
      
                 console.log('summary test',this.summaryTaxDiv);
      
               }
            }
          }
      
          summary(){
      
            this.summaryTaxDiv = [];
            this.summaryCGSTDiv = [];
            this.summarySGSTDiv = [];
            this.summaryTaxLineTotal = [];
      
            this.summaryData.uniqueTaxvalue = [];
      
            function onlyUnique(value, index, self) {
              return self.indexOf(value) === index;
            }
            //this.taxSummary.uniqueTaxvalue = [];
      
            let arrayLength = this.quoteTempData.data.length
            let i;
            var a = [];
            var b = [];
      
      
            for (i = 0; i < arrayLength; ++i)
            {
              a.push(this.quoteTempData.data[i].tax);
              b.push(this.quoteTempData.data[i].tax_id);
      
            }
      
            // usage example:
            var unique = a.filter(onlyUnique);
            var unique1 = a.filter(onlyUnique);
      
      
            //this.taxSummary.uniqueTaxvalue = a.filter(onlyUnique);
            this.summaryData.uniqueTaxvalue = a.filter(onlyUnique);
            this.summaryData.uniqueTaxId = b.filter(onlyUnique);
      
      
      
            console.log(unique);
            console.log('unique', this.summaryData.uniqueTaxvalue);
            console.log('unique tax id', this.summaryData.uniqueTaxId);
      
            this.SummaryValue = unique
      
      
            console.log('Summary value',this.SummaryValue);
      
      
            let j;
            let lineLength = this.quoteTempData.data.length
            console.log('line length',lineLength);
      
            let summaryLength = this.SummaryValue.length
            console.log('summaryLength',summaryLength);
      
            let l;
            for(l = 0; l < summaryLength; ++l){
              //this.taxSummary[l].totalValueOfUniqueTax = 0
              this.summaryData.totalValueOfUniqueTax[l] = 0
              this.summaryTaxDiv[l] = 0
              this.summaryCGSTDiv[l] = 0
              this.summarySGSTDiv[l] = 0
              this.summaryTaxLineTotal[l] = 0
      
            }
      
            let k;
            for (k = 0; k < summaryLength; ++k)      // summary length cycle
            // console.log('summary all 0',this.summaryTaxDiv);
      
            {
      
              console.log( this.SummaryValue[k])
              // let checkValue = this.SummaryValue[k]   // summary index value
              // console.log('check value',checkValue)
              // console.log('check value',this.SummaryValue[k])
      
              this.functionSummary(this.SummaryValue[k], k)
              console.log('final', this.summaryTaxDiv)
              console.log('final', this.summaryData.uniqueTaxvalue)
      
              let z;
      
              this.taxSummSore = [{
                uniq: 0,
                igst: 0,
                cgst: 0,
                sgst: 0,
      
              }]
      
              for (z = 0; z < summaryLength; ++z)
              {
                this.taxSummSore[z] = {
                  uniq: this.summaryData.uniqueTaxvalue[z],
                  uniqId: this.summaryData.uniqueTaxId[z],
                  igst:  this.summaryTaxDiv[z],
                  sgst:  this.summarySGSTDiv[z],
                  cgst:  this.summaryCGSTDiv[z],
                  subTotal: this.summaryTaxLineTotal[z]
                }
              }
      
              // this.taxSummSore = [{
              //   uniq: this.summaryTaxDiv,
              //   taxTot: this.summaryData.uniqueTaxvalue
              // }]
              console.log('sum test', this.taxSummSore)
            }
          }
      
      
      
      
      
          open(content) {
      
            localStorage.setItem('newAddressCustId', this.custId);
      
      
            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
              this.closeResult = `Closed with: ${result}`;
      
            }, (reason) => {
      
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
            });
      
          }
      
          private getDismissReason(reason: any): string {
      
            if (reason === ModalDismissReasons.ESC) {
      
              return 'by pressing ESC';
      
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      
              return 'by clicking on a backdrop';
      
            } else {
      
              return  `with: ${reason}`;
      
            }
      
          }
      
      
      
      
      
      
      
        }
      
      
    
