import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {QuoteTempModelServer, QuoteTempModelPublic} from '../../models/quote';
import {QuoteService} from '../../services/quote.service';
import {ProductService} from '../../services/product.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-quotation-template-create',
  templateUrl: './quotation-template-create.component.html',
  styleUrls: ['./quotation-template-create.component.scss']
})
export class QuotationTemplateCreateComponent implements OnInit {

  private serverURL = environment.serverURL;

  @ViewChild('quantity') quantityInput;
  templeteDesc:any;
  templeteName:any;
  product:any;
  initialProducts:any;
  name: any;
  productSelection: any;
  quantity: number;
  productId:any;
  userid: any;
  quoteTempData: QuoteTempModelServer;
  quoteTempTotal: number;
  subTotal: number;

  constructor(
    public quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private httpClient: HttpClient,
    ) {
  }

  ngOnInit(): void {
    this.quantity= 1;
    console.log('Product',this.product)
    this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
    this.quoteService.quoteTempData$.subscribe((data: QuoteTempModelServer) => this.quoteTempData = data);
    this.productService.getAllProducts().subscribe(prods => {
      //console.log()
    this.initialProducts=prods.products;
      console.log(this.initialProducts)
      this.cdr.detectChanges();

    });
    this.userid = localStorage.getItem('userid1');
    this.cdr.detectChanges();


  }

  search(){
    this.name=="";
    this.productSelection = "";
    if(this.name == ""){
     // this.product = "";
     //this.quoteData.data[0].numInQuote == 0;
      // this.ngOnInit();
    }else{
      this.product = this.initialProducts.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
      console.log(this.product)
    }
    setTimeout(() => {
      this.productSelection = this.product[0].id
      console.log('auto select check',this.productSelection )
//       this.cdr.detectChanges();
    this.cdr.markForCheck();
    }, 100);
    this.cdr.detectChanges();

  }

  addFunction(){
    console.log(this.productSelection)
    console.log(this.quantity)
    //this.quoteService.CalculateTempTotal()
    this.quoteService.quoteTempTotal$.subscribe(total => this.quoteTempTotal = total);
    if(this.productSelection == ""){
      alert("Please Choose a Product")
    }else{
      console.log('Qty',this.quantity)
    this.quoteService.AddProductToTempQuote(this.productSelection, this.quantity);
    }
    this.cdr.detectChanges();

  }



   deleteProduct(i:number){

     this.quoteService.deleteProduct(i);
     this.cdr.detectChanges();


  }




  onSelect(id: any){
    this.productId = id;
    this.quantity = 1;
    this.cdr.detectChanges();

  }

  // save1(){
  //   console.log("I am here ts 1")
  //   this.save(this.quoteTempData)
  // }

  // save(){

  // console.log('Quote Model',this.quoteTempData)

  // const request = new HttpRequest('POST', `${this.serverURL}/tempUpload/template`, this.quoteTempData, {
  //   reportProgress: true,
  //   responseType: 'json'
  // });
  // console.log('Request',request)


  // this.httpClient.post(`${this.serverURL}/quote/new`,  {TempName: this.templeteName,TempDesc: this.templeteDesc}, {
  //   reportProgress: true,
  //   responseType: 'json'
  // }).subscribe((data:any)=> {
  //   console.log(Response)
  // })
  // }

  save1() {

    if (this.quoteTempTotal > 0) {

        this.quoteService.CreateQuoteTemplate(this.userid, this.templeteName, this.templeteDesc, this.quoteTempTotal);
        console.log(this.userid)
    } else {
      return;
    }
    this.cdr.detectChanges();

  }




    // const body=JSON.stringify(quoteTempModelServer);
    // const headers = { 'content-type': 'application/json'}
  // const request1 = new HttpRequest('POST', `${this.serverUrl}/uploadcour`, formData, {
  //   reportProgress: true,
  //   responseType: 'json'
  // });
  // console.log(formData)

  // this.httpClient
  //     .get("data-url")
  //     .subscribe(
  //       data => console.log('success', data),
  //       error => console.log('oops', error)
  //     );

  // console.log("I am here ts 3")
   //return this.httpClient.post(this.serverUrl + 'people', body,{'headers':headers})


   //   if(this.templeteName == undefined && this.templeteDesc == undefined){
  //     alert("Please enter Template Title and Description")
  //   }else{
  //   if(this.templeteName == undefined ){
  //     alert("Please enter Template Title")
  //   }
  //   if( this.templeteDesc == undefined){
  //     alert("Please enter Template Description")
  //   }else{
  //     if(this.quoteTempData.data[0].numInQuote == 0){
  //       alert("You need to add atleast one product to create a template")
  //     }else{
  //       alert("Fine")
  //     }
  //   }
  // }





  // ChangeQuantity(index: number, increase: boolean) {
  //   this.quoteService.UpdateCartItems(index, increase);
  // }

}
