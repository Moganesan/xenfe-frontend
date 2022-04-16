import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service'
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  public data= {title:'',small_desc:'',desc: '', price: '', quantity: '', tax: '', category: '', tag: '1'};
  categories: any;
  taxes: any;
  progressInfos = [];
  selectedFiles: FileList;

  message = '';  
private serverURL = environment.serverURL;
  private serverUrl = `${this.serverURL}/file`;



  constructor(
    private productService: ProductService,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.productService.getAllCategory().subscribe(ctg => {
      this.categories=ctg.category;
      console.log('category', this.categories)
    });


    this.productService.getAllTaxes().subscribe(txs => {
      this.taxes = txs
      console.log('taxes', txs)
    })
  }

  selectFiles(e): void {
    this.progressInfos = [];
    this.selectedFiles = e.target.files;
    console.log("e", e)
  }

  catOnClick(catid){
    console.log('cat select', catid)
    // this.filteredSubCat = this.allTags.filter(tags => tags.cat_id == catid)
    // console.log(this.filteredSubCat)
  }

  taxOnClick(taxid){
    console.log('do nothing', taxid)
  }


  submit1(){
    if(this.data.title == ''|| (this.data.small_desc == '')|| (this.data.desc == '')|| (this.data.price == '')||(this.data.quantity == '')||(this.data.tax == '')||(this.data.category == '')||(this.data.tag == '')){
      alert("Enter all fields")
  }else{
    console.log('data', this.data)
  }
}


upload1(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  alert(this.data.title)
  formData.append('file', file);
  formData.append('title', this.data.title);
  formData.append('description', this.data.desc);
  formData.append('price', this.data.price);
  formData.append('tax_id', this.data.tax);
  formData.append('small_desc', this.data.small_desc);
  formData.append('tag_id', this.data.tag);
  formData.append('cat_id', this.data.category);
  formData.append('quantity', this.data.quantity);
  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }
  const request = new HttpRequest('POST', `${this.serverUrl}/productCreate`, formData, {
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

  for (let i = 0; i < this.selectedFiles.length; i++) {
    this.upload(i, this.selectedFiles[i]);
  }
}

}
