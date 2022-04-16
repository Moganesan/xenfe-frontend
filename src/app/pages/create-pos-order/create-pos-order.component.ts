import { UserService } from "../../services/user.service";
import { QuoteService } from "../../services/quote.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Component, OnInit, ViewChild, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { QuoteTempModelServer, QuoteTempModelPublic, taxSummary } from '../../models/quote';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
//import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-create-pos-order',
  templateUrl: './create-pos-order.component.html',
  styleUrls: ['./create-pos-order.component.scss']
})
export class CreatePosOrderComponent implements OnInit {



  quoteTempTotalQuantity: number;

  finalTotalWOtax: number;
  finalTotalWtax: number;

  discount: any;

  totalWithoutDiscount: any;


  addedSuccess: boolean;
  closeResult: string;
  noAddress: boolean
  /////////////////////////////
  oneAddress: boolean
  name101: any;
  userSelection01: any;
  cust01: any;
  customer_details01: any[] = [];
  displayo1: boolean
  userid01: number;
  countries: [{ id_country: any, name: any }];
  states: any[] = [];
  country_id: any;
  data = {
    Branch: '',
    Salution: '',
    FirstName: '',
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
  product_details: any[] = []
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

  private serverUrl = `${this.serverURL}/api/tempUpload`;

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
  lineDiscountPriceExclTax: any

  summaryTaxDiv: number[] = []
  summaryCGSTDiv: number[] = []
  summarySGSTDiv: number[] = []
  summaryTaxLineTotal: number[] = []


  //taxSummary: any[]

  taxSummSore: any


  quoteTempTotal: number;
  quoteTempTotalExclTax: number;

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
  @Input() selectedAddress: any;
  selectedSAddress: any;
  Saddress: any[] = [];
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
  applyDiscountCheck: boolean;
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



  adminDetail: any;
  countriesAdd: any[] = [];
  dataAdd = {
    Branch: '',
    Salution: '',
    FirstName: '',
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
    LISalution: '',
    LIPassword: '',
    LIMobile: '',
    LISecondName: '',
    LIFirstName: ''
  }











  constructor(
    private zone: NgZone,
    private modalService: NgbModal,
    private userService: UserService,
    public quoteService: QuoteService,
    private router: Router,

    private productService: ProductService,
    private httpClient: HttpClient,
    //private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.applyDiscountCheck = false

    this.discount = 0
    this.finalTotalWOtax = 0 



    this.userService.getAllCustDetail().subscribe(custD => {
      this.customer_details01 = custD.customers_Details;
    })


    this.userService.getAllCountry().subscribe(data => {
      this.countries = data.countries;
      this.countriesAdd = data.countries;
    })

    this.userService.getAllStates(this.data.Country).subscribe(data => {
      this.states = data.states
    })

    this.isIgst = true

    this.userService.getAdminDetail().subscribe(data => {
      this.adminStateId = data.state_id
      this.adminDetail = data
    })
    this.totalCgst = 0
    this.totalSgst = 0
    this.totalIgst = 0
    this.subTotal = 0
    this.display = false;
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
    this.quoteService.quoteTempTotalQuantity$.subscribe(totalQuantity => this.quoteTempTotalQuantity)

  }






  /// add customer admin side 

  add() {
    if (this.dataAdd.LISalution == '' || (this.dataAdd.LIPassword == '') || (this.dataAdd.LIMobile == '') || (this.dataAdd.LISecondName == '') || (this.dataAdd.LIFirstName == '')) {
      alert("Enter all fields")
    } else {
      // this.Data={branch: this.Branch, salution: this.Salution, firstName: this.FirstName, secondName: this.SecondName, companyName: this.CompanyName, gstin: this.GSTIN, address1: this.AddressLine1, address2: this.AddressLine2, city: this.City, pincode: this.Pincode, state: this.State, country: this.Country, customer_id: localStorage.getItem('userid1'), landline: this.Landline, mobile: this.Mobile, whatsapp: this.WhatsApp}
      this.httpClient.post(`${this.serverURL}/auth/custRegister1`, {
        Data: this.dataAdd
      }).subscribe((data: any) => {
        if (data.success) {
          this.addedSuccess = true
        } else {
          alert("Sorry Customer not added successfully")
        }
      })
      //this.router.navigate(['/customerDashboard'])
    }
    localStorage.setItem('newAddressCustId', undefined);
  }




  checkBoxOnSelect() {

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


    return (amount * (this.quoteTempData.data[index].tax / 100))
  }

  addAddress() {
    this.quoteService.getAddressById(this.custDet.customer_id).subscribe(ads => {
      this.address = ads;
      this.Saddress = ads;
      console.log('adds', ads)

      //this.userSelection = ads;
      this.onSelect(this.custDet.customer_id)
      this.cd.markForCheck();
    });
  }


  taxCalculationLocal(index: number) {

    this.quoteTempData.data[index].priceInclTax = (this.quoteTempData.data[index].product.price * 1 + this.quoteTempData.data[index].product.price * (this.quoteTempData.data[index].tax / 100))
    return this.quoteTempData.data[index].priceInclTax
  }

  taxCalculationReverse(amount: number, index: number) {

    return (amount / (1 + (this.quoteTempData.data[index].tax / 100)))
  }

  calculateTax(i: any) {


    this.quoteService.CalculateQuoteTotal();

    if (this.isChecked1 == true) {
      this.amountForCalc = this.Amount - this.discountRate
      this.CGST = this.quoteTempData.data[i].cgst_rate;
      this.SGST = this.quoteTempData.data[i].sgst_rate;

      this.finalAmtWT = this.taxCalculationReverse(this.amountForCalc, this.quoteTempData.data[i].tax)

      this.finalAmtWTCS = (this.finalAmtWT * (this.CGST / 100))
      //rev to forward
      this.finalAmtWTcgst = this.taxCalculationReverse(this.amountForCalc, this.CGST)
      this.finalAmtWTsgst = this.taxCalculationReverse(this.amountForCalc, this.SGST)
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
    this.taxCalculationLocal(i)
    this.calculateLineDiscountPrice(i)
    //this.quoteService.CalculateQuoteSubTotal(i);
    this.quoteTempData.data[i].linetotal = this.quoteService.CalculateQuoteSubTotal(i)

    //this.lineTotal = this.quoteService.CalculateQuoteSubTotal(i)
    this.calculateLineTax(i)
    this.quoteService.CalculateQuoteTotal();
    // -------------------------------------------------------------------------------------------------------------------------------------------------
    // this.calculateLineDiscountPrice(i);
    // 1-------------------------------------------------------------------------------------------------------------------------------------------------

    //this.taxCalculationLocal(i);
    this.calculateTax(i)

    this.quoteService.CalculateTempTotal().subscribe(data => {
      this.subtotalWithoutTax = this.quoteTempTotal - this.totalIgst
      if(this.isChecked){
        this.finalTotalWOtax = this.quoteTempTotal
      }else{
        this.finalTotalWtax = this.quoteTempTotal
      }

    });
    this.summary()

    //this.calculateLineTax(i)

    // setTimeout(() => {
    //   this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
    // }, 1000);
    //this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
    //this.ngOnInit
    // setTimeout(() => {
    //   this.subtotalWithoutTax=this.quoteTempTotal - this.totalIgst
    // }, 500);

    this.cd.markForCheck();

  }


  search() {

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
        this.cd.markForCheck();

      })
      this.quoteService.getTaxRule(this.quoteTempData.data[length].tax_id).subscribe(data => {
        this.quoteTempData.data[length].igst_rate = data[0].tax_rate
        this.quoteTempData.data[length].sgst_rate = data[1].tax_rate
        this.quoteTempData.data[length].cgst_rate = data[2].tax_rate
        this.cd.markForCheck();

      })
      this.quoteTempData.data[length].priceInclTax = this.taxCalculationLocal(length)
      this.quoteTempData.data[length].lineDiscountPrice = this.quoteTempData.data[length].priceInclTax
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

    this.quoteService.deleteProduct(i);

  }

  OnSelect(id: any) {  //note o caps

    this.productId = id;
    this.quantity = 1;
  }

  test() {
    for (let i = 0; i < this.quoteTempData.data.length; i++) {
      this.product_details[i] = this.quoteTempData.data[i].product

    }
  }

  save2() {
    // this.quoteTempData.data.forEach(p => {
    //   const { cgst } = p;
    //   const { sgst } = p;
    //   let i = 0

    // });

    // for (let i = 0; i < this.quoteTempData.data.length; i++) {
    //   this.product_details[i] = this.quoteTempData.data[i].product
    // }
    // this.product_details = this.quoteTempData.data



    //this.resetServerData();
    this.httpClient.post(`${this.serverURL}/quote/newPosOrder`, {
      cust_id: this.custDet.customer_id, shippingId: this.selectedAddress.id, billingId: this.selectedSAddress.id, total: this.finalTotalWtax, discount: this.discount, totalCgst: this.totalCgst, totalSgst: this.totalSgst, totalIgst: this.totalIgst, subTotal: this.subtotalWithoutTax, taxSummary: this.taxSummSore, totalQuantity: this.quoteTempTotalQuantity,
      product: this.quoteTempData.data, totalWOtax: this.finalTotalWOtax
    }).subscribe(() => {
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
  }

  Ssearch() {

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

    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  onSelect(id: any) {

    if(id == ""){
      alert('choose customer')
    }else{
    
    this.display = true

    this.quoteService.getAddressById(id).subscribe(ads => {
      this.address = ads;
      this.Saddress = ads;
      console.log('addressses', ads)
      //this.userSelection = ads;


      if (ads[0] == undefined) {
        this.noAddress = true
        this.cd.markForCheck();

      } else {
        this.noAddress = false
        this.cd.markForCheck();
      }

      if (ads.length == 1) {
        this.oneAddress = true
        this.cd.markForCheck();

      }




      this.userService.getSingleCustDetail(id).subscribe(data => {
        this.custDet = data.customers_Details
        let addressShipId = data.customers_Details.default_ship_address;
        let addressBillId = data.customers_Details.default_bill_address;

        console.log("addressShipId", addressShipId)

        if (addressShipId == null) {
          this.selectedAddress = this.Saddress[0];  //setTimeout
          this.cd.markForCheck();
        } else {
          this.quoteService.getAddressByAddId(addressShipId).subscribe(ads => {
            this.selectedAddress = ads;
            this.userSelection = this.selectedAddress

            this.selectedAddress.country = this.countries.filter(res => {
              return res.id_country == this.selectedAddress.country_id
            })
            this.cd.markForCheck();

          })
        }


        if (addressBillId == null) {
          this.selectedSAddress = this.Saddress[0]
          this.cd.markForCheck();

        } else {
          this.quoteService.getAddressByAddId(addressBillId).subscribe(ads => {
            this.selectedSAddress = ads;
            this.cd.markForCheck();

          })
        }

        //   setTimeout(() => {
        //   if(addressShipId == null){
        //     this.selectedAddress = this.Saddress[0]

        //   }
        //   if(addressBillId == null){
        //     this.selectedSAddress = this.Saddress[0]
        //   }


        // }, 1000);
        this.cd.markForCheck();


      })
      this.cd.markForCheck();

    });

    this.custId = id;

    setTimeout(() => {

      if (this.selectedAddress == undefined) {
        this.isIgst = false
      } else {

        if (this.adminStateId == this.selectedAddress.state_id) {
          this.isIgst = false
        }

      }

      // if(this.Saddress.length == 1 ){
      //   this.selectedAddress = this.Saddress[0]
      //   this.selectedSAddress = this.Saddress[0]
      //   //this.selectedAddress = this.Saddress[index]
      // }

      this.quoteService.getCustDG(this.custDet.disc_group_id).subscribe(data => {
        this.discGrp = data
        this.cd.markForCheck();

      })
    }, 1000);
    setTimeout(() => {
      this.cd.markForCheck();


    }, 1000);
    //this.cdr.detectChanges();
  }

  }

  onSelectQ(index: any) {

    this.selectedAddress = this.Saddress[index]

  }

  onSelectS(index: any) {

    this.selectedSAddress = this.address[index]
  }

  calculateLineDiscountPrice(index: number) {

    console.log(this.applyDiscountCheck)

    // if excl tax check box is selected the price will not have tax
    let price = 0
    if (this.isChecked != true && this.applyDiscountCheck != true) {
      price = (this.quoteTempData.data[index].product.price * 1 + this.quoteTempData.data[index].product.price * (this.quoteTempData.data[index].tax / 100))
      console.log('apply disc not true')
    } else {
      price = this.quoteTempData.data[index].product.price
      console.log('apply disc true')

    }

    //discGrp
    if (this.discGrp.discount_value != 0) {
      var dispercent = this.discGrp.discount_value
      var discountAmt = this.discGrp.discount_value
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

    if(this.applyDiscountCheck != true){
      var x: number = (price - discountAmt);
    }else{
      var x: number = (price- discountAmt)
    }
    console.log('check', price, discountAmt)
    // if (this.isChecked == true) {

      //x = x*1 + x*(this.quoteTempData.data[index].tax/100)
      this.quoteTempData.data[index].discountPrice = (price - discountAmt)
      //*1 + (price - discountAmt)*(this.quoteTempData.data[index].tax/100)
    // } else {
      // this.quoteTempData.data[index].discountPrice = (price - discountAmt);
      //this.quoteTempTotal = this.quoteTempTotal*1 + this.quoteTempTotal*(this.quoteTempData.data[index].tax/100)
    // }
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
      this.quoteService.quoteTempTotalQuantity$.subscribe(totalQuantity => this.quoteTempTotalQuantity = totalQuantity);
      this.cd.markForCheck();
    }, 1000);
    //this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);

    this.quoteTempData.data[index].lineDiscountPrice = x
    //this.lineDiscountPrice = x
    return x
  }

  calculateLineTax(i: number) {

    //this.calculateFinalTax()
    let amount = this.quoteService.CalculateQuoteSubTotal(i)

    let amount1 = this.quoteTempData.data[i].discountPrice


    let x = (amount / (1 + (this.quoteTempData.data[i].tax / 100)))
    let y = (amount1 / (1 + (this.quoteTempData.data[i].tax / 100)))

    Math.round(x * 100) / 100
    Math.round(y * 100) / 100
    let bastAmt = x
    let bastAmt1 = y

    y = amount1 - y

    let amountWithoutTax = x
    // this.lineSgst = (bastAmt * ((this.quoteTempData.data[i].tax/2) / 100))
    // this.lineCgst = (bastAmt * (this.quoteTempData.data[i].tax/2 / 100))

    this.quoteTempData.data[i].cgst = (bastAmt * ((this.quoteTempData.data[i].cgst_rate) / 100))
    this.quoteTempData.data[i].sgst = (bastAmt * ((this.quoteTempData.data[i].sgst_rate) / 100))
    this.quoteTempData.data[i].igst = (bastAmt * ((this.quoteTempData.data[i].igst_rate) / 100))


    // reverse calculation for line discounted price
    this.quoteTempData.data[i].cgst1 = (bastAmt1 * ((this.quoteTempData.data[i].cgst_rate) / 100))
    this.quoteTempData.data[i].sgst1 = (bastAmt1 * ((this.quoteTempData.data[i].sgst_rate) / 100))
    this.quoteTempData.data[i].igst1 = (bastAmt1 * ((this.quoteTempData.data[i].igst_rate) / 100))
    this.quoteTempData.data[i].lineDiscountPriceExclTax = this.quoteTempData.data[i].lineDiscountPrice - this.quoteTempData.data[i].igst1




    let total = 0
    let total1 = 0
    let total2 = 0
    //this.calculateLineTax(i)
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

    //this.totalCgst =
    let total = 0
    //this.calculateLineTax(i)
    this.quoteTempData.data.forEach(p => {
      const { cgst } = p;
      const { sgst } = p;
      //this.totalCgst += cgst;
      total += cgst;
    });
    // total cgst and sgst in total
    this.totalCgst = total;
    //this.totalSgst += sgst;
    //this.subtotalWithoutTax =
  }


  functionSummary(value: number, i: number) {

    let j;
    let lineLength = this.quoteTempData.data.length


    for (j = 0; j < lineLength; ++j) {       // table line cycle
      if (value == this.quoteTempData.data[j].tax) {     //  if value matches

        this.summaryTaxDiv[i] = this.summaryTaxDiv[i] + this.quoteTempData.data[j].igst // add if matches
        this.summaryCGSTDiv[i] = this.summaryCGSTDiv[i] + this.quoteTempData.data[j].cgst // add if matches
        this.summarySGSTDiv[i] = this.summarySGSTDiv[i] + this.quoteTempData.data[j].sgst // add if matches
        this.summaryTaxLineTotal[i] = this.summaryTaxLineTotal[i] + this.quoteTempData.data[j].linetotal - this.quoteTempData.data[j].igst


      }
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
    var unique1 = a.filter(onlyUnique);


    //this.taxSummary.uniqueTaxvalue = a.filter(onlyUnique);
    this.summaryData.uniqueTaxvalue = a.filter(onlyUnique);
    this.summaryData.uniqueTaxId = b.filter(onlyUnique);





    this.SummaryValue = unique




    let j;
    let lineLength = this.quoteTempData.data.length

    let summaryLength = this.SummaryValue.length

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

    {

      // let checkValue = this.SummaryValue[k]   // summary index value

      this.functionSummary(this.SummaryValue[k], k)

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
    }
  }





  open(content) {

    localStorage.setItem('newAddressCustId', this.custId);


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

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

      return `with: ${reason}`;

    }

  }







}







