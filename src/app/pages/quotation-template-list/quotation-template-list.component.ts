import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QuoteService } from "../../services/quote.service";
import {Router} from "@angular/router";
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-quotation-template-list',
  templateUrl: './quotation-template-list.component.html',
  styleUrls: ['./quotation-template-list.component.scss']
})
export class QuotationTemplateListComponent implements OnInit {
  private serverURL = environment.serverURL;


  name: any;
  templates: any [] = [];
  token:any;

  constructor(private quoteservice: QuoteService,
    private cdr: ChangeDetectorRef,
    private router:Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {

      this.quoteservice.getAllTemplates().subscribe(temps => {
      this.templates=temps.templates;
      console.log(this.templates)
      this.cdr.detectChanges();

    });

}


reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

  async deleteTemplate(id:number){

  await this.httpClient.delete(`${this.serverURL}/quote/deleteTemp/` + id).subscribe((data:any)=> {
    console.log(Response)
  })


  setTimeout(() => {
    this.reloadComponent()
  }, 1000);


  // return new Promise((resolve, reject) => {
  //     if (Response) {
  //       reject(this.reloadComponent()); // pass values
  //     } else {
  //       resolve('Error'); // pass values
  //     }
  // });
};


doAsyncTask() {
  const error = true;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject('error'); // pass values
      } else {
        resolve('done'); // pass values
      }
    }, 1000);
  });
}


search(){
  if(this.name == ""){
    this.ngOnInit();
  }else{
    this.templates = this.templates.filter(res =>{
      return res.templateName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
    })
    this.cdr.detectChanges();

  }
}

key: string = 'id';
reverse: boolean = false;
sort(key) {
  console.log("I am here")
  this.key = key;
  this.reverse = !this.reverse;
  this.cdr.detectChanges();

}

}
