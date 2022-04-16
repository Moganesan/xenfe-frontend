import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuoteModelServer, QuoteModelPublic, QuoteTempModelServer, QuoteTempModelPublic, quoteDetailModelServer, tempDetailModelServer, QuoteDetailModelServer} from '../models/quote';
import {ProductService} from './product.service';
//import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {NavigationExtras, Router} from '@angular/router';
//import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from "rxjs";
import {serverResponse} from "../models/quote";
import {environment} from '../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private serverURL = environment.serverURL;


  private dcdiddataserver: any[] = []

  dcdidData$ = new BehaviorSubject<any[]>(this.dcdiddataserver);

  private QuoteDataClient: QuoteModelPublic = {
    total: 0,
    prodData: [{
      inquote: 0,
      id: 0,
      discount: 0,

    }]
  };

  private QuoteTempDataClient: QuoteTempModelPublic = {
    total: 0,
prodData: [
  {
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

  private quoteDataServer: QuoteModelServer = {
    total: 0,
    data: [{
      numInQuote: 0,
      product: undefined,
      productId: 0,
      discount: 0

    }]
  };

  private quoteTempDataServer: QuoteTempModelServer = {
    total: 0,
    totalQuantity: 0,
    product_details: undefined,
    data: [{
      numInQuote: 0,
      product: undefined,
      productId: 0,
      discount: 0,
      price: 0,
      discountPrice: 0,
      tax: 0,
      linetotal: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      cgst1:0,
      sgst1: 0,
      igst1: 0,
      priceInclTax: 0,
      lineDiscountPrice: 0,
      lineDiscountPriceExclTax: 0,
      tax_id: 0,
      cgst_rate: 0,
      sgst_rate: 0,
      igst_rate: 0,
      tax_name: '',
      UpSave: undefined,
      isEdit: undefined,
      editSelect: undefined,
      exist: undefined,
      QDId: 0,
      linetax: 0
        }]
  };

  quoteTotal$ = new BehaviorSubject<number>(0);
  quoteTempTotal$ = new BehaviorSubject<number>(0);
  quoteTempTotalQuantity$ = new BehaviorSubject<number>(0);

  quoteQuoteTotal$ = new BehaviorSubject<number>(0);
  quoteData$ = new BehaviorSubject<QuoteModelServer>(this.quoteDataServer);
  quoteTempData$ = new BehaviorSubject<QuoteTempModelServer>(this.quoteTempDataServer);
  quteTempId$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    //private toast: ToastrService,
    private router: Router,
    //private spinner: NgxSpinnerService
    ) { this.quoteData$.next(this.quoteDataServer), this.quoteTempData$.next(this.quoteTempDataServer), this.dcdidData$.next(this.dcdiddataserver); }

    addUnbilledInBehaviourSubject(data){
      this.dcdidData$ = data
      this.dcdiddataserver = data
      //this.dcdidData$.next(this.dcdiddataserver)

    }

    getSingleQuote(quoteId: number) {
      return this.http.get<ProductResponseModel[]>(`${this.serverURL}/quote/` + quoteId).toPromise();
    }

    getSingleDC(quoteId: number) {
      return this.http.get<ProductResponseModel[]>(`${this.serverURL}/quote/DC/` + quoteId).toPromise();
    }

    //single template
    GetSingleQuote(quoteId: number): Observable<quoteDetailModelServer> {
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/quote/` + quoteId);
    }

    GetSingleQuotation(quoteId: number): Observable<quoteDetailModelServer> {
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/quote/singleQuotation/` + quoteId);
    }

    GetSingleQuotation1(quoteId: number): Observable<quoteDetailModelServer> {
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/quote/singleQuotation1/` + quoteId);
    }

    GetSingleBackorder(quoteId: number): Observable<quoteDetailModelServer> {
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/quote/singleBackorder/` + quoteId);
    }

    GetSingleProductorder(quoteId: number): Observable<quoteDetailModelServer> {
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/quote/singleProductorder/` + quoteId);
    }

    GetSingleOrderToPack(quoteId: number): Observable<any> {
      return this.http.get<any>(`${this.serverURL}/quote/singleOrderToPack/` + quoteId);
    }

    GetSingleLead(LeadId: number): Observable<any> {
      return this.http.get<any>(`${this.serverURL}/quote/getLead/` + LeadId);
    }

    SaveLead(content): Observable<any>{
      return this.http.post(`${this.serverURL}/quote/laedReq/save`, { content })

    }

    getAllDiscountGroups(): Observable<any>{
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/quote/quotation/getAllDiscountGroup`);
    }

    getAllTaxes(): Observable<any>{
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/products/taxes/all`);
    }

    getCustDG(id: number): Observable<any>{
      return this.http.post(`${this.serverURL}/quote/quotation/getAllDiscountGroup`, { id })
    };

    getTaxRate(id: number):  Observable<any>{
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/products/tax/` + id);
    };

    getTaxRule(id: number):  Observable<any>{
      return this.http.get<quoteDetailModelServer>(`${this.serverURL}/products/taxRule/` + id);
    };



    saveTempId(id){
      this.quteTempId$.next(id);
    }

  AddProductToQuote(id: number, quantity: number) {
    this.productService.getSingleProduct(id).subscribe(prod => {

      //  1. If the quote is empty
      if (this.quoteDataServer.data[0].product === undefined) {

        this.quoteDataServer.data[0].product = prod;
        this.quoteDataServer.data[0].numInQuote = quantity !== undefined ? quantity : 1;
        this.quoteDataServer.data[0].product = prod;
        //this.quoteDataServer.data[0].productId = prod.id;

        //this.quoteTempDataServer.data[0].productId = prod.id;

        //this.quoteTempDataServer.product_details[0] = prod;



        this.CalculateTotal();
        this.QuoteDataClient.prodData[0].inquote = this.quoteDataServer.data[0].numInQuote;
        //this.QuoteDataClient.prodData[0].id = prod.id;
        this.QuoteDataClient.total = this.quoteDataServer.total;

        localStorage.setItem('quote', JSON.stringify(this.QuoteDataClient));
        this.quoteData$.next({...this.quoteDataServer});

      } else {


        const index = this.quoteDataServer.data.findIndex(p => p.product.id === prod.id);  // -1 or a positive value

        //     a. if that item is already in the quote  =>  index is positive value
        if (index !== -1) {

          this.quoteDataServer.data[index].numInQuote = quantity + this.quoteDataServer.data[index].numInQuote;

          this.QuoteDataClient.prodData[index].inquote = this.quoteDataServer.data[index].numInQuote;
          this.CalculateTotal();
          this.QuoteDataClient.total = this.quoteDataServer.total;
          localStorage.setItem('quote', JSON.stringify(this.QuoteDataClient));
          // this.toast.info(`${prod.name} quantity updated in the quote`, 'Product Updated', {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // });

        } else {

          this.quoteDataServer.data.push({
            numInQuote: quantity,
            product: prod,
            productId: 0,
            discount: 0

          });

          this.QuoteDataClient.prodData.push({
            inquote: 1,
            id: prod.id,
            discount: 0

          });
          // this.toast.success(`${prod.name} added to the quote`, 'Product Added', {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // });

          this.CalculateTotal();
          this.QuoteDataClient.total = this.quoteDataServer.total;
          localStorage.setItem('quote', JSON.stringify(this.QuoteDataClient));
          this.quoteData$.next({...this.quoteDataServer});
        }  // END OF ELSE
      }
    });
  }


  getAddressById(id:any){
      return this.http.get<any>(`${this.serverURL}/customer/address/` + id);
  }

  getAddressByAddId(id:any){
    return this.http.get<any>(`${this.serverURL}/customer/addressId/` + id);
}


  deleteProduct(i:number){

    if (i > -1) {
      this.quoteTempDataServer.data.splice(i, 1);
    }
    this.CalculateTotal

  }



//   deleteProduct1(i:number){
//     //delete this.templateDetails[i]

// if (i > -1) {
//   this.templateDetails.splice(i, 1);
// }
//   }




  AddProductToTempQuote(id: number, quantity: number) {

    this.productService.getSingleProduct(id).subscribe(prod => {
      // this.getTaxRate(prod.tax_id).subscribe(data => {
      //   this.tax_rate = data.tax_rate
      // })

      //  1. If the quote is empty
      if (this.quoteTempDataServer.data[0].product === undefined) {

        this.quoteTempDataServer.data[0].product = prod;
        this.quoteTempDataServer.data[0].productId = prod.id;
        this.quoteTempDataServer.data[0].price = prod.price;
        this.quoteTempDataServer.data[0].tax_id = prod.tax_id;
        this.quoteTempDataServer.data[0].tax = prod.tax_rate;
        this.quoteTempDataServer.data[0].igst_rate = prod.tax_rate;
        //this.quoteTempDataServer.product_details[0] = prod;

        this.quoteTempDataServer.data[0].numInQuote = quantity !== undefined ? quantity : 1;
        this.CalculateTempTotal();
        this.QuoteTempDataClient.prodData[0].inquote = this.quoteTempDataServer.data[0].numInQuote;
        this.QuoteTempDataClient.prodData[0].id = prod.id;
        this.QuoteTempDataClient.prodData[0].price = prod.price;

        // this.QuoteTempDataClient.prodData[0].taxRate = prod.price;
        // this.QuoteTempDataClient.prodData[0].lineTotal = prod.price;
        // this.QuoteTempDataClient.prodData[0].discount = prod.price;
        // this.QuoteTempDataClient.prodData[0].cgst = prod.price;
        // this.QuoteTempDataClient.prodData[0].sgst = prod.price;
        // this.QuoteTempDataClient.prodData[0].igst = prod.price;


        this.QuoteTempDataClient.total = this.quoteTempDataServer.total;

        localStorage.setItem('quote', JSON.stringify(this.QuoteTempDataClient));
        this.quoteTempData$.next({...this.quoteTempDataServer});

      } else {
        const index = this.quoteTempDataServer.data.findIndex(p => p.product.id === prod.id);  // -1 or a positive value

        //     a. if that item is already in the quote  =>  index is positive value
        if (index !== -1) {

          this.quoteTempDataServer.data[index].numInQuote = quantity + this.quoteTempDataServer.data[index].numInQuote;

          this.QuoteTempDataClient.prodData[index].inquote = this.quoteTempDataServer.data[index].numInQuote;
          this.QuoteTempDataClient.prodData[index].id = this.quoteTempDataServer.data[index].productId;



          this.CalculateTempTotal();
          this.QuoteTempDataClient.total = this.quoteTempDataServer.total;
          localStorage.setItem('quote', JSON.stringify(this.QuoteTempDataClient));
          // this.toast.info(`${prod.name} quantity updated in the quote`, 'Product Updated', {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // });
          this.quoteTempDataServer.data[index].isEdit= false,
          this.quoteTempDataServer.data[index].editSelect = false;
          this.quoteTempDataServer.data[index].UpSave = false;

        } else {

          this.quoteTempDataServer.data.push({
            discount: 0,
            numInQuote: quantity !== undefined ? quantity : 1,
            price: prod.price,
            product: prod,
            productId: prod.id,
            discountPrice: 0,
            linetotal: 0,
            sgst: 0,
            cgst: 0,
            igst: 0,
            cgst1: 0,
            sgst1: 0,
            igst1: 0,
            priceInclTax: 0,
            lineDiscountPrice: 0,
            lineDiscountPriceExclTax: 0,
            tax_id: prod.tax_id,
            tax: prod.tax_rate,
            cgst_rate: 0,
            sgst_rate: 0,
            igst_rate: prod.tax_rate,
            tax_name: prod.tax_name,
            UpSave: true,
            isEdit: true,
            editSelect: false,
            exist: false,
            QDId: 0,
            linetax: 0
          });

          this.QuoteTempDataClient.prodData.push({
            inquote: 1,
            id: prod.id,
            price: prod.price,
            igst: 0,
            cgst:0,
            sgst: 0,
            taxRate: prod.tax_rate,
            discount: 0,
            lineTotal: 0,
            tax_id: prod.tax_id
          });
          // this.toast.success(`${prod.name} added to the quote`, 'Product Added', {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // });

          this.CalculateTempTotal();
          this.QuoteTempDataClient.total = this.quoteDataServer.total;
          localStorage.setItem('quote', JSON.stringify(this.QuoteTempDataClient));
          this.quoteTempData$.next({...this.quoteTempDataServer});
        }  // END OF ELSE
      }
    });
  }

  private CalculateTotal() {
    let Total = 0;

    this.quoteDataServer.data.forEach(p => {
      const {numInQuote} = p;
      const {price} = p.product;

      Total += numInQuote * price;
    });
    this.quoteDataServer.total = Total;
    this.quoteTotal$.next(this.quoteDataServer.total);
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    const p = this.quoteDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInQuote;

    return subTotal;
  }


  CalculateTempTotal() {


    let Total = 0;
    let totalQuantity = 0;

    this.quoteTempDataServer.data.forEach(p => {
      const {numInQuote} = p;
      const {price} = p.product;
      const {discountPrice} = p;

      if(discountPrice != 0){
        Total += numInQuote * discountPrice;
      }else{
        Total += numInQuote * price;
      }

      totalQuantity += numInQuote


      // Total += numInQuote * price;
    });
    this.quoteTempDataServer.total = Total;
    this.quoteTempDataServer.totalQuantity = totalQuantity;


    this.quoteTempTotal$.next(this.quoteTempDataServer.total);
    this.quoteTempTotalQuantity$.next(this.quoteTempDataServer.totalQuantity);


    return this.quoteTempTotal$
  }

  // calculateQuotationTotal(){
  //   let Total = 0;

  //   this.quoteTempDataServer.data.forEach(p => {
  //     const {linetotal} = p;
  //     Total += linetotal
  //     this.quoteTempDataServer.total = Total;

  //     this.quoteTempTotal$.next(this.quoteTempDataServer.total);

  //     return this.quoteTempTotal$

  //   });


  // }

  CalculateQuoteTotal() {
    let Total = 0;

    this.quoteTempDataServer.data.forEach(p => {
      const {numInQuote} = p;
      const {discountPrice} = p;

      Total += numInQuote * discountPrice;
    });
    this.quoteTempDataServer.total = Total;
    this.quoteQuoteTotal$.next(this.quoteTempDataServer.total);
    this.CalculateTempTotal();

  }

  CalculateTempSubTotal(index): number {
    let subTotal = 0;

    const p = this.quoteTempDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInQuote;

    return subTotal;
  }

  CalculateQuoteSubTotal(index): number {

    let subTotal = 0;
    const p = this.quoteTempDataServer.data[index];
    // @ts-ignore
    Math.round(p.discountPrice * 100) / 100


    subTotal = p.discountPrice * p.numInQuote;


    Math.round(subTotal * 100) / 100


    //return (subTotal*1 + subTotal * (this.quoteTempDataServer.data[index].tax / 100))
    this.CalculateTempTotal()
    //this.calculateQuotationTotal()


    return subTotal;
  }

  resetServerData() {
    this.quoteTempDataServer = {
      total: 0,
      totalQuantity: 0,
      product_details: undefined,
      data: [{
        discount:0,
        numInQuote: 0,
        product: undefined,
        productId: 0,
        price: 0,
        discountPrice: 0,
        tax: 0,
        linetotal: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        cgst1: 0,
        sgst1: 0,
        igst1: 0,
        priceInclTax: 0,
        lineDiscountPrice: 0,
        lineDiscountPriceExclTax: 0,
        tax_id: 0,
        cgst_rate: 0,
        sgst_rate: 0,
        igst_rate: 0,
        tax_name: '',
        UpSave: undefined,
        isEdit: undefined,
        editSelect: undefined,
        exist: undefined,
        QDId: 0,
        linetax: 0
      }]
    };

    this.quoteTempData$.next({...this.quoteTempDataServer});
  }


  CreateQuoteTemplate(userid: number, templateName: any, templateDesc: any, quoteTempTotal: any) {

        this.resetServerData();
        this.http.post(`${this.serverURL}/quote/new`, {
          userid,
          templateName, templateDesc, quoteTempTotal,
          products: this.QuoteTempDataClient.prodData
        }).subscribe((data: TemplateResponse) => {
          this.getSingleQuote(data.order_id).then(prods => {
            if (data.success) {

              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.QuoteTempDataClient.total
                }
              };
              //this.spinner.hide().then();
              this.router.navigate(['/templateList'], navigationExtras).then(p => {
                this.QuoteTempDataClient = {total: 0, prodData: [{      inquote: 0,
                  id: 0,
                  price: 0,
                  igst: 0,
                  cgst:0,
                  sgst: 0,
                  taxRate: 0,
                  discount: 0,
                  tax_id: 0,
                  lineTotal: 0}]};
                this.quoteTempTotal$.next(0);
                this.quoteTempTotalQuantity$.next(0);
                localStorage.setItem('Quote', JSON.stringify(this.QuoteTempDataClient));
              });
            }
          });
        });
  }

  createQuote(custId:number, shippingId: number, billingId: number, total: number){

        //this.resetServerData();
        this.http.post(`${this.serverURL}/quote/newQuotation`, {
          custId,shippingId, billingId, total,
          products: this.QuoteTempDataClient.prodData
        }).subscribe(() =>{
          console.log(Response)
        })

        setTimeout(() => {
          this.router.navigate(['/quotation-list'])
        }, 100);
  }

  createDiscountGroup( name: any, value: number){

        this.resetServerData();
        this.http.post(`${this.serverURL}/quote/newDiscountGroup`, {
          name,value
        }).subscribe(() =>{
          console.log(Response)
        })
        // setTimeout(() => {
        //   this.router.navigate(['/quotation-list'])
        // }, 100);
  }

  createTax( name: any, value: number){

    this.http.post(`${this.serverURL}/quote/newTax`, {
      name,value
    }).subscribe(() =>{
      console.log(Response)
    })
}


  getAllTemplates(): Observable<serverResponse>{
    return this.http.get<serverResponse>(`${this.serverURL}/quote`);
  }

  getAllQuotation(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/quotation/getAllQuote`);
  }

  // from quotation table
  GetAllQuotation(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/quotation/getAllQuotation`);
  }

  getAllQuotation1(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/quotation/getAllQuote1`);
  }

  getAllBackorders(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/allBackorders/all`);
  }

  getAllOrdersToPack(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/OrdersToPack2/all`);
  }

  getAllProductOrders(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/allOrders/all`);
  }

  getAllOrdersToPackShortShipped(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/OrdersToPackShortShipped/all`);
  }

  getAllTaxInvoice(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/taxInvoice/all`);
  }
  
  getAllCashInvoice(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/cashInvoice/all`);
  }

  getTemplateNDT(tempId): Observable<tempDetailModelServer>{
    return this.http.get<tempDetailModelServer>(`${this.serverURL}/quote/singletemp/`+tempId);
  }

  getquotationNTB(qteId): Observable<QuoteDetailModelServer>{
    return this.http.get<QuoteDetailModelServer>(`${this.serverURL}/quote/singleqte/`+qteId);
  }

  getquotationNTB1(qteId): Observable<QuoteDetailModelServer>{
    return this.http.get<QuoteDetailModelServer>(`${this.serverURL}/quote/singleqte1/`+qteId);
  }

  getOrderNTB1(qteId): Observable<QuoteDetailModelServer>{
    return this.http.get<QuoteDetailModelServer>(`${this.serverURL}/quote/singleOrder/`+qteId);
  }

  getbackorderNTB1(qteId): Observable<QuoteDetailModelServer>{
    return this.http.get<QuoteDetailModelServer>(`${this.serverURL}/quote/singlebo1/`+qteId);
  }

  getTaxInvoice(qteId): Observable<QuoteDetailModelServer>{
    return this.http.get<QuoteDetailModelServer>(`${this.serverURL}/quote/taxInvoice/`+qteId);
  }

  getproductorderNTB1(qteId): Observable<QuoteDetailModelServer>{
    return this.http.get<QuoteDetailModelServer>(`${this.serverURL}/quote/singlepo1/`+qteId);
  }

  getBillingAddress(id): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/billingAdd/`+id);
  }

  getBillingAddress1(id): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/billingAdd1/`+id);
  }

  getBillingAddress2(id): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/billingAdd2/`+id);
  }

  getBillingAddressBackorder(id): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/billingAddBO1/`+id);
  }

  getBillingAddressProductorder(id): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/billingAddPO/`+id);
  }

  updateBillingAddress(data): Observable<any>{
    //let data = {cust_id, billing_id}

    return this.http.post<any>(`${this.serverURL}/quote/updateBillingAdd`, {data})  }

    updateBillingAddress1(data): Observable<any>{
      //let data = {cust_id, billing_id}

      return this.http.post<any>(`${this.serverURL}/quote/updateBillingAdd1`, {data})  }

      updateBackorderBillingAddress(data): Observable<any>{
        //let data = {cust_id, billing_id}

        return this.http.post<any>(`${this.serverURL}/quote/updateBillingAdd1`, {data})  }


  updateShippingAddress(data): Observable<any>{
    //let data = {cust_id, shipping_id}
    return this.http.post<any>(`${this.serverURL}/quote/updateShippingAdd`, {data});
  }

  updateShippingAddress1(data): Observable<any>{
    //let data = {cust_id, shipping_id}
    return this.http.post<any>(`${this.serverURL}/quote/updateShippingAdd1`, {data});
  }

  updateBackorderShippingAddress(data): Observable<any>{
    //let data = {cust_id, shipping_id}
    return this.http.post<any>(`${this.serverURL}/quote/updateBackorderShippingAdd1`, {data});
  }

  getCustDG1(id: number): Observable<any>{
    return this.http.post(`${this.serverURL}/quote/quotation/getAllDiscountGroup`, { id })
  };

  getAllLeads(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/getLeads/all`);
  }

  getAllDeliveryChallan(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/deliveryChallan/all`);
  }

  getDeliveryChallan(id: number): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/singleDeliveryChallan/`+id)
  };

  // discount creation



}

interface TemplateResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }];
}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}

export interface dcdids {
  data : any[]
}