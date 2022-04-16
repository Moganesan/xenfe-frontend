import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common'
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import { NgForm } from '@angular/forms';

import {environment} from '../../../environments/environment';




@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  
    public data= {name:'',description:''};
        private serverURL = environment.serverURL;

  
      private serverUrl = `${this.serverURL}/file`;

  
  
    selectedFiles: FileList;
    progressInfos = [];
    message = '';
    submitted: boolean = false;
    successMsg: string;
    errorMsg: any;
  
  
    fileInfos: Observable<any> | null = null;
  
  
    pageTitle = ' Create New category | Xenfe';
    CategoryForm: FormGroup;
  
  
  
    constructor(private title: Title,
                private fb: FormBuilder ,
                private location: Location,
                private httpClient: HttpClient) { }
  
  
  
    ngOnInit(): void {
  
      // this.fileInfos = this.uploadService.getFiles();
  
      this.title.setTitle(this.pageTitle)
  
      this.CategoryForm = this.fb.group({
        cat_name: ["", Validators.required],
        cat_desc: ["", Validators.required],
        image: ["", Validators.required]
  
      });
    }
  
  
    selectFiles(e): void {
      this.progressInfos = [];
      this.selectedFiles = e.target.files;
      console.log("e", e)

    }
  
  
    upload1(file: File): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
  
      alert(this.data.name)
  
      formData.append('file', file);
      formData.append('cat_name', this.data.name);
      formData.append('cat_desc', this.data.description);
  
      for (var pair of formData.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }
  
      // console.log(file);
      // console.log('file');
  
  
      const request = new HttpRequest('POST', `${this.serverUrl}/upload`, formData, {
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
  
  back(){
    this.location.back()
  }
  
  }
  
