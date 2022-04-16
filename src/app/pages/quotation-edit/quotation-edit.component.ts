import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from "../../services/user.service";
import { QuoteService } from "../../services/quote.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";
import { QuoteTempModelServer, QuoteTempModelPublic, taxSummary } from '../../models/quote';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-quotation-edit',
  templateUrl: './quotation-edit.component.html',
  styleUrls: ['./quotation-edit.component.scss']
})
export class QuotationEditComponent implements OnInit {
  
    oneAddress: boolean
    discount: any;
  
  
    finalTotalWOtax: number;
    finalTotalWtax: number;
  
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
  
  
  
      id: number;
      quotationDetail: any;
      //ntb name total branch
      quotationNTB: any;
      bAddress: any;
      priceInclTax: any[] = [];
      adminStateId: number;
      isIgst: boolean;
  
      product_details: any[] = []
      totalWithoutDiscount: any;
  
  
      summaryData: taxSummary = {
        uniqueTaxvalue: [],
        uniqueTaxId: [],
        totalValueOfUniqueTax: []
      }
      private quoteDataClient: QuoteTempModelPublic = {
        total: 0,
        prodData: [{
          inquote: 0,
          id: 0,
          price: 0,
          igst: 0,
          cgst: 0,
          sgst: 0,
          taxRate: 0,
          discount: 0,
          lineTotal: 0,
          tax_id: 0
        }]
      };
  
      display: boolean
      display1: boolean
      SummaryValue: any[] = [];
  
      private serverURL = environment.serverURL;

      @ViewChild('quantity') quantityInput;
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
      allTaxes: any;
      allTaxRules: any;
      closeResult: string;
  
  
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
      summaryTaxDiv: number[] = []
      summaryCGSTDiv: number[] = []
      summarySGSTDiv: number[] = []
      summaryTaxLineTotal: number[] = []
  
      //taxSummary: any[]
  
      taxSummSore: any
      shippingUpdateButton: boolean
      billingUpdateButton: boolean
  
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
      address: any[] = [];
      selectedAddress: any;
      selectedSAddress: any;
      Saddress: any[] = [];
      custDet: any;
      custMobile: any;
      discountAmt: any;
      disPercent: any;
      discountInput: any[] = []
      discGrp: any;
      discGrpBoolean: boolean
  
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
        private route: ActivatedRoute,
        private userService: UserService,
        public quoteService: QuoteService,
        private router: Router,
        private productService: ProductService,
        private httpClient: HttpClient,
        private cd: ChangeDetectorRef,
        private modalService: NgbModal,
  
  
      ) { }
  
      ngOnInit(): void {
  
        this.discount = 0
        this.finalTotalWOtax = 0 
  
        this.userService.getAllCountry().subscribe(data => {
          this.countries = data.countries;
          this.countriesAdd = data.countries;
          console.log('countries', this.countries)
        })
  
        this.quoteService.resetServerData()
  
        this.shippingUpdateButton = true
        this.billingUpdateButton = true
  
        //get single quotation
        this.productService.getAllTaxes().subscribe((data) => this.allTaxes = data)
  
        this.productService.getAllTaxRules().subscribe((data) => this.allTaxRules = data)
  
  
        this.route.paramMap.pipe(
          map((param: ParamMap) => {
            // @ts-ignore
            return param.params.id;
          })
        ).subscribe(courId => {
          this.id = courId;
  
          this.quoteService.GetSingleQuotation1(this.id).subscribe(qtn => {
            this.quotationDetail = qtn;
            console.log('Q Detail', this.quotationDetail)

            this.quotationDetail.forEach(e => {
              const { product_id, quantity } = e;
              this.quoteService.AddProductToTempQuote(product_id, quantity);
            })  
            setTimeout(() => {
  
              let arraylength = this.quoteTempData.data.length
              console.log('checkiii length', arraylength)
  
  
              this.quoteTempData.data.forEach((e, index) =>
                {console.log('checkiii', index)
                this.quoteTempData.data[index].tax = this.quotationDetail[index].tax_rate
                this.quoteTempData.data[index].priceInclTax = this.quotationDetail[index].price_after_tax
                this.quoteTempData.data[index].discount = this.quotationDetail[index].discount
                this.quoteTempData.data[index].lineDiscountPrice = this.quotationDetail[index].line_discount_price
                
                this.quoteTempData.data[index].lineDiscountPriceExclTax = this.quotationDetail[index].line_discount_price_et
  
                this.quoteTempData.data[index].linetotal = this.quotationDetail[index].line_total
                this.quoteTempData.data[index].cgst = this.quotationDetail[index].cgst
                this.quoteTempData.data[index].sgst = this.quotationDetail[index].sgst
                this.quoteTempData.data[index].igst = this.quotationDetail[index].igst
                this.quoteTempData.data[index].isEdit = true
                this.quoteTempData.data[index].editSelect = false
                this.quoteTempData.data[index].exist = true
                this.quoteTempData.data[index].UpSave = true
                this.quoteTempData.data[index].QDId = this.quotationDetail[index].id
  
                console.log('errorr1 of 1', index)
  
                this.quoteService.getTaxRule(this.quoteTempData.data[index].tax_id).subscribe(data => {
                  console.log('errorr', this.quoteTempData)
                  console.log('errorr1', index)
                  console.log('errorr2', this.quoteTempData.data[index])
  
                  this.quoteTempData.data[index].cgst_rate = data[0].tax_rate
                  this.quoteTempData.data[index].sgst_rate = data[1].tax_rate
                  this.quoteTempData.data[index].igst_rate = data[2].tax_rate
                  //console.log('quote...[[]];;', this.quoteTempData.data[i].igst_rate = data[2].tax_rate)
                })
                //if(this.quoteTempData.data[i].tax_id == this.allTaxes.)
                // let result = this.allTaxRules.tax_rate_id.filter(id => this.allTaxRules.tax_rate_id = this.quoteTempData.data[i].tax_id);
                // //console.log('result', result)
                /////
                /////////
                // let length = this.allTaxRules.length
                // let j;
                // for(j = 0; j < length; ++j){
                //   if(this.quoteTempData.data[i].tax_id = this.allTaxRules[j].tax_rate_id){
  
                //   }
                // }
                /////////////////////////////
                this.quoteTempData.data[index].igst_rate = this.quotationDetail[index].igst
                this.quoteTempData.data[index].cgst_rate = this.quotationDetail[index].cgst
                this.quoteTempData.data[index].sgst_rate = this.quotationDetail[index].sgst
                //console.log('for i', i)
                //console.log('for i quote detail', this.quotationDetail)
              //}
            }
              )
            }, 2000);
            //this.quotationDetail[index].priceInclTax = (this.quotationDetail[index].price * 1 + this.quotationDetail[index].price * (this.quotationDetail[index].tax_rate / 100))
          });
  
          this.quoteService.getBillingAddress2(this.id).subscribe(bads => {
            this.bAddress = bads;
            console.log('bill add', this.bAddress)
            this.selectedSAddress = this.bAddress
          });
  
          this.quoteService.getOrderNTB1(this.id).subscribe(temps => {
            this.quotationNTB = temps;
            console.log('NTB', this.quotationNTB, this.id)
            this.selectedAddress = this.quotationNTB
  
  
  
            this.userService.getAllStates(this.quotationNTB.country_id).subscribe(data => {
              this.states = data.states
              console.log('states',this.states)
              this.state = this.states.filter(res => {
                return res.id_state == this.quotationNTB.state_id
              })
              console.log('state', this.state)
              this.stateName = this.state[0].name
            })
  
  
  
            console.log('test123', this.countries, this.quotationNTB)
            this.country = this.countries.filter(res => {
              return res.id_country == this.quotationNTB.country_id
            })
  
            this.countryName = this.country[0].name
  
  
  
  
            this.userService.getAdminDetail().subscribe(data => {
              this.adminStateId = data.state_id
              console.log('A SID', this.adminStateId)
              if (this.adminStateId == this.selectedAddress.state_id) {
                this.isIgst = false
              }
  
  
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
  
  
  
  
  
  
  
            })
            //console.log('NTB Test', this.selectedAddress)
            /////////////////
            this.userService.getSingleCustDetail(this.quotationNTB.customer_id).subscribe(data => {
              this.custDet = data.customers_Details
            })
  
            this.quoteService.getCustDG(this.quotationNTB.disc_group_id).subscribe(data => {
              this.discGrp = data
              //console.log('disc grp', this.discGrp)
            })
            ////////////
            this.quoteService.getAddressById(this.quotationNTB.customer_id).subscribe(ads => {
  
              this.address = ads;
              this.Saddress = ads;
              //this.userSelection = ads;
              if(ads.length == 1){
                this.oneAddress = true
      
                console.log('testtest', this.oneAddress)
                this.cd.markForCheck();
      
              }
              console.log('ADS', ads, this.quotationNTB.customer_id)
            });
          });
        });
        // setTimeout(() => {
  
        //   this.selectedAddress.first_name = this.quotationNTB.first_name
        //   this.selectedAddress.second_name = this.quotationNTB.second_name
        //   this.selectedAddress.company_name = this.quotationNTB.company_name
        //   this.selectedAddress.mobile = this.quotationNTB.mobile
        //   this.selectedAddress.address1 = this.quotationNTB.address1
        //   this.selectedAddress.address2 = this.quotationNTB.address2
  
        // }, 1000);
  
  
  
  
        /////////////////////////////////////////////////////
  
  
  
  
        this.isIgst = true
  
  
        this.totalCgst = 0
        this.totalSgst = 0
        this.totalIgst = 0
        this.subTotal = 0
        this.display = false;
        //console.log('I m from ngOninit')
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
        if(this.isChecked){
          this.finalTotalWOtax = this.quoteTempTotal
        }else{
          this.finalTotalWtax = this.quoteTempTotal
        }
        this.quoteService.quoteTempData$.subscribe((data: QuoteTempModelServer) => this.quoteTempData = data);
        this.productService.getAllProducts().subscribe(prods => {
          this.initialProducts = prods.products;
        });
        this.userid = localStorage.getItem('userid1');
  
  
        setTimeout(() => {
          this.subtotalWithoutTax = this.quoteTempTotal - this.totalIgst
  
          //console.log('I am here at ng on int 1')
  
          let length = this.quoteTempData.data.length
          let j
          for (j = 0; j < length; ++j) {
            //console.log('I am here at ng on int 2')
            this.discountOnChange(j)
            //console.log('I am here at ng on int')
          }
          // setTimeout(() => {
          //   this.summary()
          // }, 300);
  
  
        }, 4000);
      }
  
      open(content) {
  
        localStorage.setItem('newAddressCustId', this.custId);
    
    
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    
          this.closeResult = `Closed with: ${result}`;
    
        }, (reason) => {
    
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
        });
    
      }
  
      addAddress() {
        this.quoteService.getAddressById(this.custDet.customer_id).subscribe(ads => {
          this.address = ads;
          this.Saddress = ads;
    
          //this.userSelection = ads;
          console.log('ADS', ads)
          this.onSelect(this.custDet.customer_id)
          this.cd.markForCheck();
        });
      }
  
  
      private getDismissReason(reason: any): string {
  
        if (reason === ModalDismissReasons.ESC) {
    
          return 'by pressing ESC';
    
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    
          return 'by clicking on a backdrop';
    
        } else {
    
          return `with: ${reason}`;
    
        }
    
      }
  
  
      forLoop() {
        let arraylength1 = this.allTaxes.length
        let i;
        // for(i=0; i < arraylength1; ++i){
        //   if(this.allTaxes.)
        // }
  
  
  
      }
  
      click(address_id) {
        //console.log('check', address_id)
        // //console.log('check', this.quoteTempData)
        // this.productService.getAllTaxes().subscribe((data) => this.allTaxes = data)
        // //console.log(this.allTaxes)
        // this.quoteService.updateBillingAddress(address_id, )
        // get all taxes
        let data = { quote_id: this.id, shippingId: address_id }
  
        this.quoteService.updateShippingAddress1(data).subscribe(() => {
          //console.log(Response)
          this.cd.markForCheck();
  
        })
        setTimeout(() => {
          //console.log('it runs')
          this.reloadComponent()
        }, 1000);
      }
  
      reload() {
        this.reloadComponent()
      }
  
      click1(address_id) {
        let data = { quote_id: this.id, billingId: address_id }
  
        this.quoteService.updateBillingAddress1(data).subscribe(() => {
          this.cd.markForCheck();
  
          //console.log(Response)
        })
        setTimeout(() => {
          this.reloadComponent()
        }, 500);
      }
  
      checkBoxOnSelect() {
  
        this.quoteTempData.data.forEach((value, i) => {
          this.calculateLineDiscountPrice(i)
          this.discountOnChange(i)
          //this.totalCgst += cgst;
          this.cd.markForCheck();
  
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
        //console.log("test", index)
        //console.log('I m from taxCalculation', this.quoteTempData.data[index].tax)
        //console.log('tax', this.quoteTempData.data[index].tax)
  
        this.cd.markForCheck();
  
  
        return (amount * (this.quoteTempData.data[index].tax / 100))
  
      }
  
  
  
      taxCalculationLocal(index: number) {
        console.log('I am working')
        //console.log('I m from tax calc loacl')
        //console.log('5')
        ////console.log('index', index, 'tax', this.quoteTempData.data[index].tax )
        this.quoteTempData.data[index].priceInclTax = (this.quoteTempData.data[index].product.price * 1 + this.quoteTempData.data[index].product.price * (this.quoteTempData.data[index].tax / 100))
        this.cd.markForCheck();
        return this.quoteTempData.data[index].priceInclTax
  
      }
  
      taxCalculationReverse(amount: number, index: number) {
        //console.log('I m from tax calc rev')
  
        return (amount / (1 + (this.quoteTempData.data[index].tax / 100)))
      }
  
      calculateTax(i) {
        //console.log('I m from calc tax')
  
  
        this.quoteService.CalculateQuoteTotal();
  
        if (this.isChecked == true) {
          ////console.log('checked',this.isChecked )
          this.amountForCalc = this.Amount - this.discountRate
          this.CGST = this.quoteTempData.data[i].cgst_rate;
          //console.log('cgst', this.CGST)
          this.SGST = this.quoteTempData.data[i].sgst_rate;
          ////console.log('amt f c', this.amountForCalc)
  
          this.finalAmtWT = this.taxCalculationReverse(this.amountForCalc, this.quoteTempData.data[i].tax)
  
          this.finalAmtWTCS = (this.finalAmtWT * (this.CGST / 100))
          //console.log('cgst, sgst', this.finalAmtWTCS)
          //rev to forward
          this.finalAmtWTcgst = this.taxCalculationReverse(this.amountForCalc, this.CGST)
          //console.log('final amount with tax(cgst)', this.finalAmtWTcgst)
          this.finalAmtWTsgst = this.taxCalculationReverse(this.amountForCalc, this.SGST)
          ////console.log('tax', this.finalAmtWT)
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
  
        this.cd.markForCheck();
  
  
      }
  
  
      discountOnChange(i) {
        console.log('I am working')
        // if(this.quoteTempData.data[i].numInQuote < 1){
        //   this.quoteTempData.data[i].numInQuote = 1
        // }
        //console.log('I m from disc on change.......', this.quoteTempData.data[i].tax)
        this.taxCalculationLocal(i)
        this.calculateLineDiscountPrice(i)
        //this.quoteService.CalculateQuoteSubTotal(i);
        this.quoteTempData.data[i].linetotal = this.quoteService.CalculateQuoteSubTotal(i)
        //console.log('testing', this.quoteTempData.data[i].linetotal, this.quoteService.CalculateQuoteSubTotal(i))
  
        //this.lineTotal = this.quoteService.CalculateQuoteSubTotal(i)
        this.calculateLineTax(i)
  
        //console.log('f1')
  
        this.quoteService.CalculateQuoteTotal();
        //console.log('f2')
        // -------------------------------------------------------------------------------------------------------------------------------------------------
        // this.calculateLineDiscountPrice(i);
        // 1-------------------------------------------------------------------------------------------------------------------------------------------------
  
        //this.taxCalculationLocal(i);
        this.calculateTax(i)
        //console.log('f4')
  
        this.quoteService.CalculateTempTotal();
        //console.log('f5')
  
        //this.calculateLineTax(i)
  
        // setTimeout(() => {
        //   this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
        // }, 1000);
        //this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
        this.ngOnInit
        ////console.log('tot', this.quoteTempTotal)
        setTimeout(() => {
          this.subtotalWithoutTax = this.quoteTempTotal - this.totalIgst
        }, 500);
        this.cd.markForCheck();
  
      }
  
  
      search() {
        //console.log('I m from search')
  
        this.name == "";
        this.productSelection = "";
        if (this.name == "") {
          // this.ngOnInit();
        } else {
          this.product = this.initialProducts.filter(res => {
            return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
          })
        }
        setTimeout(() => {
          this.productSelection = this.product[0].id
          console.log('auto select check',this.productSelection )
  //       this.cdr.detectChanges();
        this.cd.markForCheck();
        }, 100);
        this.cd.markForCheck();
  
      }
  
      addFunction() {
        this.editEnabled = true
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
          //console.log('value', this.taxCalculationLocal(length))
          this.quoteTempData.data[length].priceInclTax = this.taxCalculationLocal(length)
          this.quoteTempData.data[length].lineDiscountPrice = this.quoteTempData.data[length].priceInclTax
          //console.log(length)
          // //console.log(this.quoteTempData.data[length].product.price)
          // //console.log(this.quoteTempData.data[length].lineDiscountPrice)
          this.quoteTempData.data[length].linetotal = this.quoteTempData.data[length].lineDiscountPrice * this.quoteTempData.data[length].numInQuote
          this.discountOnChange(length)
        }, 1000);
        setTimeout(() => {
          let length = this.quoteTempData.data.length - 1
          this.discountOnChange(length)
          this.summary()
          this.cd.markForCheck();
  
        }, 2000);
        // setTimeout(() => {
        //   this.subtotalWithoutTax=this.quoteTempTotal - this.totalIgst
        // }, 2500);
        this.cd.markForCheck();
  
      }
  
      deleteProduct(i: number) {
        //console.log('I m from del product')
  
        this.quoteService.deleteProduct(i);
        let j = i - 1
        if(j<0){
          j=0
        }
        this.discountOnChange(j)
        this.cd.markForCheck();
  
      }
  
      OnSelect(id: any) {  //note o caps
        //console.log('I m from On select')
  
        this.productId = id;
        this.quantity = 1;
        this.cd.markForCheck();
  
      }
  
      test() {
        for (let i = 0; i < this.quoteTempData.data.length; i++) {
          this.product_details[i] = this.quoteTempData.data[i].product
          //console.log(this.quoteTempData.data[i].product)
  
        }
        //console.log(this.productDetail)
        this.cd.markForCheck();
  
      }
  
      save2() {
        //console.log('I m from save 2')
        // this.quoteTempData.data.forEach(p => {
        //   const { cgst } = p;
        //   const { sgst } = p;
        //   let i = 0
  
        // });
  
        // for (let i = 0; i < this.quoteTempData.data.length; i++) {
        //   this.product_details[i] = this.quoteTempData.data[i].product
        //   //console.log(this.productDetail)
        // }
        // this.product_details = this.quoteTempData.data
  
  
  
        //this.resetServerData();
        this.httpClient.post(`${this.serverURL}/quote/newQuotation`, {
          cust_id: this.custDet.customer_id, shippingId: this.selectedAddress.id, billingId: this.selectedSAddress.id, total: this.quoteTempTotal, totalCgst: this.totalCgst, totalSgst: this.totalSgst, totalIgst: this.totalIgst, subTotal: this.subtotalWithoutTax, taxSummary: this.taxSummSore,
          product: this.quoteTempData.data
        }).subscribe(() => {
          //console.log(Response)
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
        //console.log('I m from seach 1')
  
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
          this.cd.markForCheck();
          }, 100);
        }
        this.cd.markForCheck();
  
      }
  
      Ssearch() {
        //console.log('I m from S search')
  
        this.Sname == "";
        this.SuserSelection = this.selectedAddress;
        if (this.Sname == "") {
          this.ngOnInit();
        } else {
          this.Scust = this.customer_details.filter(res => {
            return res.first_name?.toLocaleLowerCase().match(this.name?.toLocaleLowerCase()) || res.second_name?.toLocaleLowerCase().match(this.name?.toLocaleLowerCase()) || res.company_name?.toLocaleLowerCase().match(this.name?.toLocaleLowerCase()) || res.mobile?.toString().toLocaleLowerCase().match(this.name?.toLocaleLowerCase())
          })
        }
        this.cd.markForCheck();
  
      }
  
      reloadComponent() {
        //console.log('I m from reaload comp')
  
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.quoteService.resetServerData()
      }
  
      onSelect(id: any) {
        this.display = true
        //console.log('I m from on select')
  
        this.quoteService.getAddressById(id).subscribe(ads => {
          this.address = ads;
          this.Saddress = ads;
  
  
          if(ads.length == 1){
            this.oneAddress = true
  
            console.log('testtest', this.oneAddress)
            this.cd.markForCheck();
  
          }
          //this.userSelection = ads;
          //console.log('ADS', ads)
        });
  
        //console.log('ADS', this.address)
  
  
        // this has been removed and added the address directly
  
  
        // this.userService.getSingleCustDetail(id).subscribe(data => {
        //   this.custDet = data.customers_Details
        //   //console.log('CD',this.custDet)
        //   let addressShipId = data.customers_Details.default_ship_address;
        //   let addressBillId = data.customers_Details.default_bill_address;
        //   //console.log("A Id", addressShipId)
        //   this.quoteService.getAddressByAddId(addressShipId).subscribe(ads => {
        //     this.selectedAddress = ads;
        //     this.userSelection = this.selectedAddress
        //     //console.log('Address', this.selectedAddress)
        //   })
        //   this.quoteService.getAddressByAddId(addressBillId).subscribe(ads => {
        //     this.selectedSAddress = ads;
        //     //console.log('Address', this.selectedSAddress)
        //   })
  
        //   setTimeout(() => {
        //   if(addressShipId == 0){
        //     this.selectedAddress = this.Saddress[0]
        //   }
        //   if(addressBillId == 0){
        //     this.selectedSAddress = this.Saddress[0]
        //   }
  
  
        // }, 1000);
  
        // })
  
        this.custId = id;
  
        setTimeout(() => {
          //console.log('cust det1', this.custDet, this.Saddress.length, this.adminStateId, this.selectedAddress.state_id, this.SummaryValue)
          //console.log('length test', this.Saddress.length)
          //console.log('ADS', this.address)
          if (this.adminStateId == this.selectedAddress.state_id) {
            this.isIgst = false
          }
  
          this.quoteService.getCustDG(this.custDet.disc_group_id).subscribe(data => {
            this.discGrp = data
          })
          this.cd.markForCheck();
  
        }, 1000);
  
  
      }
  
      onSelectQ(index: any) {
  
        //console.log('I m from select q')
  
        this.selectedAddress = this.Saddress[index]
        this.shippingUpdateButton = false
        //console.log('shipping add', this.selectedAddress)
        this.click(this.selectedAddress.id)
        this.cd.markForCheck();
  
      }
  
      onSelectS(index: any) {
        //console.log('I m from select s')
  
        this.selectedSAddress = this.address[index]
        this.billingUpdateButton = false
        //console.log('ship id', this.selectedSAddress.id)
        //console.log('ship id', this.selectedSAddress)
  
        this.click1(this.selectedSAddress.id)
  
        this.cd.markForCheck();
  
      }
  
      calculateLineDiscountPrice(index: number) {
        console.log('I am working 2', this.isChecked, index, this.quoteTempData.data[index].product.price,'tax', this.quoteTempData.data[index].tax )
  
        //console.log('I m from calc line disc')
  
  
        let price = 0
        if (this.isChecked != true) {
          //console.log('is checked', this.isChecked)
          price = (this.quoteTempData.data[index].product.price * 1 + this.quoteTempData.data[index].product.price * (this.quoteTempData.data[index].tax / 100))
          //console.log('is checked 1', price)
  
        } else {
          price = this.quoteTempData.data[index].product.price
        }
        console.log('I am working 2')
        if (this.discGrp.discount_value != 0) {
          //console.log('test', this.discGrp.discount_value)
          var dispercent = this.discGrp.discount_value
          this.discGrpBoolean = true
  
          this.discountAmt = this.discGrp.discount_value
          var dispAmt: number = this.discountAmt
          this.discountAmt = price * (this.discountAmt / 100);
          this.quoteTempData.data[index].discount = dispercent
        } else {
          this.discountAmt = this.quoteTempData.data[index].discount;
          console.log('this.discountAmt', this.discountAmt)
  
            if (this.discountAmt && this.discountAmt.includes('%')) {
              let disPercent: number = parseFloat(this.discountAmt.replace('%', ''));
              this.discountAmt = price * (disPercent / 100);
            }
  
            
  
        }
        //this.quoteTempData.data[index].discountPrice = this.calculateLineDiscountPrice(index)
        var x: number = (price - this.discountAmt);
        if (this.isChecked == true) {
  
          //x = x*1 + x*(this.quoteTempData.data[index].tax/100)
          this.quoteTempData.data[index].discountPrice = (price - this.discountAmt)
          //*1 + (price - this.discountAmt)*(this.quoteTempData.data[index].tax/100)
        } else {
          this.quoteTempData.data[index].discountPrice = (price - this.discountAmt);
          //this.quoteTempTotal = this.quoteTempTotal*1 + this.quoteTempTotal*(this.quoteTempData.data[index].tax/100)
        }
        this.ngOnInit
        setTimeout(() => {
          this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
          if(this.isChecked){
            this.finalTotalWOtax = this.quoteTempTotal
          }else{
            this.finalTotalWtax = this.quoteTempTotal
          }
  
          if (this.isChecked) {
            this.totalWithoutDiscount = this.quoteTempTotal
            var discountAmt1 = this.discount;
            if (discountAmt1 && discountAmt1.includes('%')) {
              let disPercent1: number = parseFloat(discountAmt1.replace('%', ''));
              discountAmt1 = this.quoteTempTotal * (disPercent1 / 100);
            }
            this.quoteTempTotal = this.quoteTempTotal - discountAmt1
            this.finalTotalWOtax = this.quoteTempTotal
          }
          //this.quoteService.quoteTempTotalQuantity$.subscribe(totalQuantity => this.quoteTempTotalQuantity = totalQuantity);
  
  
          this.cd.markForCheck();
  
        }, 1000);
        //this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
  
        this.quoteTempData.data[index].lineDiscountPrice = x
        //this.lineDiscountPrice = x
        return x
      }
  
      calculateLineTax(i: number) {
        //console.log('I m from calc line tax')
  
        //this.calculateFinalTax()
        let amount = this.quoteService.CalculateQuoteSubTotal(i)
        let x = (amount / (1 + (this.quoteTempData.data[i].tax / 100)))
        //console.log('tax issue',)
        Math.round(x * 100) / 100
        let bastAmt = x
        x = amount - x
  
        let amountWithoutTax = x
        // this.lineSgst = (bastAmt * ((this.quoteTempData.data[i].tax/2) / 100))
        // this.lineCgst = (bastAmt * (this.quoteTempData.data[i].tax/2 / 100))
  
        this.quoteTempData.data[i].cgst = (bastAmt * ((this.quoteTempData.data[i].cgst_rate) / 100))
        this.quoteTempData.data[i].sgst = (bastAmt * ((this.quoteTempData.data[i].sgst_rate) / 100))
        //console.log('igst 1', this.quoteTempData.data[i].igst)
        this.quoteTempData.data[i].igst = (bastAmt * ((this.quoteTempData.data[i].igst_rate) / 100))
        //console.log('igst 2', this.quoteTempData.data[i].igst)
  
  
        let total = 0
        let total1 = 0
        let total2 = 0
        //this.calculateLineTax(i)
        ////console.log('array length',this.quoteTempData.data.length )
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
        this.cd.markForCheck();
  
        //this.finalCSgst = (amount / (1 + (CSgst / 100)))
        return x
      }
  
      calculateFinalTax() {
        //console.log('I m from calc final tax')
  
        //this.totalCgst =
        let total = 0
        //this.calculateLineTax(i)
        ////console.log('array length',this.quoteTempData.data.length )
        this.quoteTempData.data.forEach(p => {
          const { cgst } = p;
          const { sgst } = p;
          //this.totalCgst += cgst;
          total += cgst;
        });
        // total cgst and sgst in total
        this.totalCgst = total;
        //this.totalSgst += sgst;
        //console.log('total tax', this.totalCgst)
        //this.subtotalWithoutTax =
        this.cd.markForCheck();
  
      }
  
  
      functionSummary(value: number, i: number) {
  
        let j;
        let lineLength = this.quoteTempData.data.length
  
  
        for (j = 0; j < lineLength; ++j) {       // table line cycle
          //console.log('tax', this.quoteTempData.data[j].tax)
          if (value == this.quoteTempData.data[j].tax) {     //  if value matches
            //console.log('matches')
            //console.log('tax add', this.quoteTempData.data[j].igst)
            //console.log('smry tx', this.summaryTaxDiv)
            //console.log('index', j)
            this.summaryTaxDiv[i] = this.summaryTaxDiv[i] + this.quoteTempData.data[j].igst // add if matches
            this.summaryCGSTDiv[i] = this.summaryCGSTDiv[i] + this.quoteTempData.data[j].cgst // add if matches
            this.summarySGSTDiv[i] = this.summarySGSTDiv[i] + this.quoteTempData.data[j].sgst // add if matches
            this.summaryTaxLineTotal[i] = this.summaryTaxLineTotal[i] + this.quoteTempData.data[j].linetotal - this.quoteTempData.data[j].igst
  
            //console.log('summary test', this.summaryTaxDiv);
  
          }
          this.cd.markForCheck();
  
        }
      }
  
      summary() {
  
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
  
  
        for (i = 0; i < arrayLength; ++i) {
          a.push(this.quoteTempData.data[i].tax);
          b.push(this.quoteTempData.data[i].tax_id);
  
        }
  
        // usage example:
        var unique = a.filter(onlyUnique);
  
  
        //this.taxSummary.uniqueTaxvalue = a.filter(onlyUnique);
        this.summaryData.uniqueTaxvalue = a.filter(onlyUnique);
        this.summaryData.uniqueTaxId = b.filter(onlyUnique);
  
  
  
        //console.log(unique);
        //console.log('unique', this.summaryData.uniqueTaxvalue);
        //console.log('unique tax id', this.summaryData.uniqueTaxId);
  
        this.SummaryValue = unique
  
  
        //console.log('Summary value', this.SummaryValue);
  
  
        let j;
        let lineLength = this.quoteTempData.data.length
        //console.log('line length', lineLength);
  
        let summaryLength = this.SummaryValue.length
        //console.log('summaryLength', summaryLength);
  
        let l;
        for (l = 0; l < summaryLength; ++l) {
          //this.taxSummary[l].totalValueOfUniqueTax = 0
          this.summaryData.totalValueOfUniqueTax[l] = 0
          this.summaryTaxDiv[l] = 0
          this.summaryCGSTDiv[l] = 0
          this.summarySGSTDiv[l] = 0
          this.summaryTaxLineTotal[l] = 0
  
        }
  
        let k;
        for (k = 0; k < summaryLength; ++k)      // summary length cycle
        // //console.log('summary all 0',this.summaryTaxDiv);
  
        {
  
          //console.log(this.SummaryValue[k])
          // let checkValue = this.SummaryValue[k]   // summary index value
          // //console.log('check value',checkValue)
          // //console.log('check value',this.SummaryValue[k])
  
          this.functionSummary(this.SummaryValue[k], k)
          //console.log('final', this.summaryTaxDiv)
          //console.log('final', this.summaryData.uniqueTaxvalue)
  
          let z;
  
          this.taxSummSore = [{
            uniq: 0,
            igst: 0,
            cgst: 0,
            sgst: 0,
  
          }]
  
          for (z = 0; z < summaryLength; ++z) {
            this.taxSummSore[z] = {
              uniq: this.summaryData.uniqueTaxvalue[z],
              uniqId: this.summaryData.uniqueTaxId[z],
              igst: this.summaryTaxDiv[z],
              sgst: this.summarySGSTDiv[z],
              cgst: this.summaryCGSTDiv[z],
              subTotal: this.summaryTaxLineTotal[z]
            }
          }
  
          // this.taxSummSore = [{
          //   uniq: this.summaryTaxDiv,
          //   taxTot: this.summaryData.uniqueTaxvalue
          // }]
          //console.log('sum test', this.taxSummSore)
        }
        this.cd.markForCheck();
  
      }
  
      //////////////////////////////////// edit/update/delete functionality
  
      editEnabled: boolean
      edit(i) {
  
        this.editEnabled = true
        this.quoteTempData.data[i].isEdit = false
  
        const TDlength = this.quoteTempData.data.length
        for (let i = 0; i < TDlength; i++) {
          this.quoteTempData.data[i].editSelect = true
        }
        this.quoteTempData.data[i].editSelect = false
        this.cd.markForCheck();
  
  
      }
  
      onchangeQInput(i) {
        this.quoteTempData.data[i].UpSave = false
        this.cd.markForCheck();
  
        //console.log("Test One")
      }
  
      // reloadComponent(){
  
      // }
  
      SaveTDLine(i) {
  
        let ToSave = {
          Quotation_id: this.id,
          Product_id: this.quoteTempData.data[i].productId,
          Quantity: this.quoteTempData.data[i].numInQuote,
          Price: this.quoteTempData.data[i].price,
          Total: this.quoteTempTotal,
          sub_total: this.subtotalWithoutTax,
          product: this.quoteTempData.data[i],
        };
        this.quoteTempData.data[i].exist = true
        //console.log('To Save', ToSave)
  
        this.httpClient.post(`${this.serverURL}/quote/saveProdFrmQDT1/`, ToSave).subscribe((data: any) => {
          //console.log(Response)
        })
        const TDlength = this.quoteTempData.data.length
        for (let i = 0; i < TDlength; i++) {
          this.quoteTempData.data[i].isEdit = true
          // this.quoteTempData.data[i].exist=true
          this.quoteTempData.data[i].editSelect = false
          this.quoteTempData.data[i].UpSave = true
        }
  
        this.editEnabled = false
  
        setTimeout(() => {
          this.reloadComponent()
        }, 400);
  
      }
  
      UpdateQDLine(i) {
  
        let ToUpdate = {
          quotation_id: this.id,
          quotationDetail_id: this.quoteTempData.data[i].QDId,
          Total: this.quoteTempTotal,
          total_tax: this.quoteTempData.data[i].linetax,
          sub_total: this.subtotalWithoutTax,
          quantity: this.quoteTempData.data[i].numInQuote,
          discount: this.quoteTempData.data[i].discount,
          lineDiscountPriceExclTax: this.quoteTempData.data[i].lineDiscountPriceExclTax,
        };
  
        //let toUpdate = this.templateDetails[i];
        //console.log('To Update', ToUpdate)
  
        this.httpClient.post(`${this.serverURL}/quote/updateProdFrmQDT1/`, ToUpdate).subscribe((data: any) => {
          //console.log(Response)
        })
  
        const QDlength = this.quoteTempData.data.length
        for (let i = 0; i < QDlength; i++) {
          this.quoteTempData.data[i].isEdit = true
          // this.quoteTempData.data[i].exist=true
          this.quoteTempData.data[i].editSelect = false
          this.quoteTempData.data[i].UpSave = true
        }
  
        this.editEnabled = false
  
        this.cd.markForCheck();
  
      }
  
      //   change
      deleteProductfromDb(i: number, QDId: number) {
  
        this.deleteProduct(i)
  
        //console.log('I m from del product')
  
        //this.quoteService.deleteProduct(i);
  
        // this.httpClient.delete(`${this.serverURL}/quote/deleteProdFrmQDT1/` + QDId).subscribe((data: any) => {
        //   //console.log(Response)
        // })
        let total = this.quoteTempTotal
  
        this.httpClient.post(`${this.serverURL}/quote/deleteProdFrmQDT1`,  {QDId, qid: this.id, total}).subscribe((data: any) => {
          //console.log(Response)
        })
        setTimeout(() => {
          this.reloadComponent()
        }, 400);
        
      }
  
      // deleteProduct(i){
  
      // }
  
    }
  
  
  
  
  
  
