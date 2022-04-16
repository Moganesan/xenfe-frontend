import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";
import { ProductService } from 'src/app/services/product.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';





@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: any
  taxes: any;
  categories: any;
  progressInfos = [];
  selectedFiles: FileList;
  message = '';  
private serverURL = environment.serverURL;
  private serverUrl = `${this.serverURL}/file`;


  public data= {id:'',image:'',name: '', price: '', quantity: '', short_desc: '', tax_id: '', cat_id: '', tax_rate: '1', upload_image_name: '', description: ''};


  constructor(
    private route: ActivatedRoute,
    private productService : ProductService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    this.productService.getAllCategory().subscribe(ctg => {
      this.categories=ctg.category;
      console.log('category', this.categories)
    });

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(courId => {
      this.id = courId;
  })


  this.productService.getAllTaxes().subscribe(txs => {
    this.taxes = txs
    console.log('taxes', txs)
  })


  this.productService.getSingleProduct(this.id).subscribe(data => {this.data = data, console.log('product', this.data)})
}


selectFiles(e): void {
  this.progressInfos = [];
  this.selectedFiles = e.target.files;
  console.log("e", e)
}

taxOnClick(taxid){
  console.log('do nothing', taxid)
}

catOnClick(catid){
  console.log('cat select', catid)
  // this.filteredSubCat = this.allTags.filter(tags => tags.cat_id == catid)
  // console.log(this.filteredSubCat)
}


upload1(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  alert(this.data.name)
  formData.append('file', file);
  formData.append('title', this.data.name);
  formData.append('description', this.data.description);
  formData.append('price', this.data.price);
  formData.append('tax_id', this.data.tax_id);
  formData.append('small_desc', this.data.short_desc);
  formData.append('cat_id', this.data.cat_id);
  formData.append('quantity', this.data.quantity);
  formData.append('id', this.data.id);

  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }
  const request = new HttpRequest('POST', `${this.serverUrl}/productUpdatefile`, formData, {
    reportProgress: true,
    responseType: 'json'
  });
  console.log(formData)
  return this.httpClient.request(request);
}

upload(idx, file): void {
  
  this.progressInfos[idx] = { value: 0, fileName: file.name };

  this.upload1(file).subscribe(
    event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
      }
    },
    err => {
      this.progressInfos[idx].value = 0;
      this.message = 'Could not upload the file:' + file.name;
    });
}

submit(){

  this.message = '';
  console.log('test', this.selectedFiles)

  if(this.selectedFiles === undefined){
    console.log('do nothing')
    const formData: FormData = new FormData();

    formData.append('title', this.data.name);
    formData.append('description', this.data.description);
    formData.append('price', this.data.price);
    formData.append('tax_id', this.data.tax_id);
    formData.append('small_desc', this.data.short_desc);
    formData.append('cat_id', this.data.cat_id);
    formData.append('quantity', this.data.quantity);
    formData.append('id', this.data.id);



    this.data.id = this.id
    this.httpClient.post(`${this.serverURL}/file/productUpdate`, this.data).subscribe(Response => console.log(Response))
    console.log(formData)
  }else{
  for (let i = 0; i < this.selectedFiles.length; i++) {
    this.upload(i, this.selectedFiles[i]);
  }
}
}

}
