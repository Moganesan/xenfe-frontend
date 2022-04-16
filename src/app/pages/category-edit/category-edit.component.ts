import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { map } from "rxjs/operators";
import { ProductService } from '../../services/product.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment';




@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  id: any
  category: any
  data = {name : '', description : '', id: '' }
  selectedFiles: FileList;
  progressInfos = [];
  message: any  
private serverURL = environment.serverURL;
  private serverUrl = `${this.serverURL}/file`;



  constructor(      private route: ActivatedRoute,
    private productService: ProductService,
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(catId => {
      this.id = catId;


      this.productService.getSingleCategory(this.id).subscribe(data => {this.category = data, console.log(this.category, data), this.data.name = this.category.cat_name, this.data.description = this.category.cat_desc})
      this.cdr.detectChanges();
    })
  }


  selectFiles(e): void {
    this.progressInfos = [];
    this.selectedFiles = e.target.files;
    console.log("e", e)

  }

  submit(){
    this.message = '';
    console.log('test', this.selectedFiles)
  
    if(this.selectedFiles === undefined){
      console.log('do nothing')
      const formData: FormData = new FormData();
      formData.append('cat_name', this.data.name);
      formData.append('cat_desc', this.data.description);
      formData.append('id', this.id);
      this.data.id = this.id
      this.httpClient.post(`${this.serverURL}/file/categoryUpdate`, this.data).subscribe(Response => console.log(Response))
      console.log(formData)
    }else{
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  }


  upload1(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    alert(this.data.name)

    formData.append('file', file);
    // formData.append('cat_name', this.data.name);
    // formData.append('cat_desc', this.data.description);
    formData.append('id', this.id);

    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }

    const request = new HttpRequest('POST', `${this.serverUrl}/categoryUpdateFile`, formData, {
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

}
