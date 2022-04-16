import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-simple-test-page',
  templateUrl: './simple-test-page.component.html',
  styleUrls: ['./simple-test-page.component.scss']
})
export class SimpleTestPageComponent implements OnInit {
  private serverURL = environment.serverURL;


  A: number;
  B: number;
  C: number;
  orders: any


  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.A = 0, this.B = 0
           //get all orders
           this.getAllProductOrders().subscribe(orders => {
            //console.log()
          this.orders=orders.orders;
            console.log(this.orders)
          });
  }

  add(){

    setTimeout(() => {
      this.C = this.A + this.B
    console.log("From add", "c", this.C)
    this.cd.markForCheck();

    }, 5000);

  }

  getAllProductOrders(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/allOrders/all`);
  }

}
