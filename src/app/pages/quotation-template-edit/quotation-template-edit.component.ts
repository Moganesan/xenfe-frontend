import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {QuoteService} from '../../services/quote.service';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import {ProductService} from '../../services/product.service';
import { quoteDetailModelServer} from '../../models/quote';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import {QuoteTempModelServer, QuoteTempModelPublic} from '../../models/quote';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-quotation-template-edit',
  templateUrl: './quotation-template-edit.component.html',
  styleUrls: ['./quotation-template-edit.component.scss']
})
export class QuotationTemplateEditComponent implements OnInit {
  private serverURL = environment.serverURL;


  templateDetails: any
  id: any
  templateNDT: any;
  total: any;
  quantity: any;
  name: any;
  product:any;
  initialProducts:any;
  productId:any;
  editResponse: number;
  quoteTempData: QuoteTempModelServer;
  quoteTempTotal: number;
  productSelection: any;
  editEnabled: any;

  constructor(public quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private router:Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.editEnabled = false
    this.productService.getAllProducts().subscribe(prods => {
      //console.log()
    this.initialProducts=prods.products;
      console.log(this.initialProducts)
      this.cdr.detectChanges();

    });
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(tempId => {
      this.id = tempId;

      this.quoteService.getTemplateNDT(this.id).subscribe(temps => {
        this.templateNDT=temps;
        console.log('name d t',this.templateNDT)
        this.total = this.templateNDT.total;
        console.log('Total', this.total)
        this.cdr.detectChanges();

      });

      this.quoteService.GetSingleQuote(this.id).subscribe(temp => {
        this.templateDetails = temp;
        // this.templateDetails.array.forEach(element => {
        //         const {price} = p;
        // });
        const TDlength = this.templateDetails.length
        for (let i = 0; i < TDlength; i++) {
          this.templateDetails[i].isEdit=true
          this.templateDetails[i].exist=true
          this.templateDetails[i].editSelect=false
          this.templateDetails[i].UpSave=true
        }
        console.log('Template Detail',this.templateDetails)
        console.log('Template Length',TDlength)
        this.cdr.detectChanges();

      });
    });
    this.CalculateTotal()
  }

  // isDisable(index: number): void {
  //   this.templateDetails[index].is_edit = false;
  // }

  SaveTDLine(i){

    let ToSave = {
      Template_id: this.id,
      Product_id: this.templateDetails[i].product_id,
      Quantity: this.templateDetails[i].quantity,
      Price: this.templateDetails[i].price,
      Total: this.total,

  };
  this.templateDetails[i].exist = true


  console.log('To Save',ToSave)

   this.httpClient.post(`${this.serverURL}/quote/saveProdFrmTDT/` , ToSave).subscribe((data:any)=> {
    console.log(Response)
    this.cdr.detectChanges();

  })

  const TDlength = this.templateDetails.length
  for (let i = 0; i < TDlength; i++) {
     this.templateDetails[i].isEdit=true
    // this.templateDetails[i].exist=true
    this.templateDetails[i].editSelect=false
    this.templateDetails[i].UpSave=true
  }

  this.editEnabled = false
  // setTimeout(() => {
  //   this.reloadComponent()
  // }, 1000);

  }


  UpdateTDLine(i: number){

    let ToUpdate = {
        Template_id: this.id,
        TemplateDetail_id: this.templateDetails[i].id,
        Total: this.total,
        quantity: this.templateDetails[i].quantity
    };

    //let toUpdate = this.templateDetails[i];
    console.log('To Update',ToUpdate)

     this.httpClient.post(`${this.serverURL}/quote/updateProdFrmTDT/` , ToUpdate).subscribe((data:any)=> {
      this.cdr.detectChanges();

      console.log(Response)
    })

    const TDlength = this.templateDetails.length
    for (let i = 0; i < TDlength; i++) {
       this.templateDetails[i].isEdit=true
      // this.templateDetails[i].exist=true
      this.templateDetails[i].editSelect=false
      this.templateDetails[i].UpSave=true
    }

      this.editEnabled = false

    //this.templateDetails[i].isEdit=false



    // setTimeout(() => {
    //   this.reloadComponent()
    // }, 1000);
    this.cdr.detectChanges();



  }

  update(){
    this.total
  }

  addToQuote(){

  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }


  deleteProductfromDb(id : number){
    this.httpClient.delete(`${this.serverURL}/quote/deleteProdFrmTDT/` + id).subscribe((data:any)=> {
      console.log(Response)
    })
    setTimeout(() => {
      this.reloadComponent()
    }, 1000);
  }

  search(){

     this.productSelection = "";
     if(this.name == ""){
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
  }

  onSelect(id: any){
    this.productId = id;
    this.quantity = 1;
  }

  CalculateLineTotal(index): number {
    let lineTotal = 0;

    const p = this.templateDetails[index];
    // @ts-ignore
    lineTotal = p.quantity * p.price;

    return lineTotal;
  }


  CalculateTotal() {
    let Total = 0;

    this.templateDetails?.forEach(p => {
      const {quantity} = p;
      const {price} = p;

      Total += quantity * price;
    });
    this.total = Total;
    return Total;
  }

  addFunction(){
    console.log(this.templateDetails)
    console.log(this.quantity)
    if(this.productSelection == ""){
      alert("Please Choose a Product")
    }else{
      console.log('Qty',this.quantity)
    this.AddProductToTempDetails(this.productSelection, this.quantity);
    console.log('temp details', this.templateDetails)
    console.log("Product Selection...",this.productSelection)
    this.cdr.detectChanges();

    }
    this.cdr.detectChanges();

  }

  AddProductToTempDetails(id: number, quantity: number){

    //if table is empty
         this.productService.getSingleProduct(id).subscribe((prod) => {
                 if (this.templateDetails[0].product_id === undefined) {
                    this.templateDetails[0].product_id = prod.id;
                    this.templateDetails[0].quantity = quantity !== undefined ? quantity : 1;
                    this.templateDetails[0].price = prod.price;
                    this.templateDetails[0].title = prod.name;
                    this.cdr.detectChanges();


                 } else {
                   //if product already exist
                  const index = this.templateDetails.findIndex(p => p.product_id === prod.id);  // -1 or a positive value
                  if (index !== -1) {
                    console.log('I am here 3')

                    this.templateDetails[index].quantity = quantity + this.templateDetails[index].quantity;
                    this.edit(index)
                    this.templateDetails[index].UpSave = false
                    this.cdr.detectChanges();

                  }else{
                    //if product is not in table
                    console.log('I am here 5')
                    if(this.editEnabled = true){

                          this.templateDetails.push({
                            quantity: quantity !== undefined ? quantity : 1,
                            price: prod.price,
                            product_id: prod.id,
                            title: prod.name,
                            exist: false,
                            isEdit: true,
                            editSelect: false,
                            UpSave: true,

                          })
                          this.cdr.detectChanges();

                        }else{
                          this.templateDetails.push({
                            quantity: quantity !== undefined ? quantity : 1,
                            price: prod.price,
                            product_id: prod.id,
                            title: prod.name,
                            exist: false,
                            isEdit: true,
                            editSelect: false,
                            UpSave: true,
                          })
                          this.cdr.detectChanges();

                        }

                  }
                 }
        });
  }

  edit(i){

    this.editEnabled = true
    this.templateDetails[i].isEdit=false

    const TDlength = this.templateDetails.length
    for (let i = 0; i < TDlength; i++) {
      this.templateDetails[i].editSelect=true
    }
    this.templateDetails[i].editSelect=false


  }
  onchangeQInput(i){
    this.templateDetails[i].UpSave=false
    console.log("Test One")
  }

  deleteProduct(i:number){
    this.editEnabled = false

    //delete this.templateDetails[i]


if (i > -1) {
  this.templateDetails.splice(i, 1);
}
 console.log('Ater del',this.templateDetails)
  }

  deleteProduct1(doc){
    this.templateDetails.forEach( (item, index) => {
      if(item === doc) this.templateDetails.splice(index,1);
    });
    console.log('Ater del',this.templateDetails)

 }

 finishEdit(){
  this.router.navigateByUrl('/quotationTemplateList/quotationTemplateView/'+ this.id);
}
}
