import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {productModelServer, serverResponse} from "../models/products.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private serverURL = environment.serverURL;

  private url = `${this.serverURL}/`


  constructor(
    private http: HttpClient,
    ) {
  }

  getAllProducts(numberofResults:number =100): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'products', {
      params: {
        limit: numberofResults.toString()
      }
    });
  }

  getAllTaxes(): Observable<any> {
    return this.http.get<any>(this.url + 'products/taxes/all')
  }

  getAllTaxRules(): Observable<any> {
    return this.http.get<any>(this.url + 'products/taxRules/all')
  }

  getSingleProduct(id:any): Observable<any> {
    return this.http.get<any>(this.url + 'products/' + id);
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(this.url + 'categories');
  }

  getSingleCategory(id:any): Observable<productModelServer> {
    return this.http.get<productModelServer>(this.url + 'categories/' + id);
  }

  productCreate(formData, data): Observable<any>{
    return this.http.post(`${this.serverURL}/file/productCreate`, { formData, data })
  };


}
