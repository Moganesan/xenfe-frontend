import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';




@Component({
  selector: 'app-tables-widget13',
  templateUrl: './tables-widget13.component.html',
})
export class TablesWidget13Component implements OnInit {
  private serverURL = environment.serverURL;


  orders: any

  constructor(    private http: HttpClient,
    ) {}

  ngOnInit(): void {
                //get all orders
                this.getAllProductOrders().subscribe(orders => {
                  //console.log()
                this.orders=orders.orders;
                  console.log(this.orders)
                });
  }

  getAllProductOrders(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/allOrders/all`);
  }
}
