import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

//import { WidgetsModule } from '../../_metronic/partials';
//import { NgModule } from '@angular/core';



// @NgModule({
//   imports: [
//     WidgetsModule,
//   ],
// })


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  private serverURL = environment.serverURL;


  orders: any

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
                    //get all orders
                    this.getAllProductOrders().subscribe(orders => {
                      //console.log()
                    this.orders=orders.orders;
                      console.log(this.orders)
                      this.cd.markForCheck();

                    });
  }

  getAllProductOrders(): Observable<any>{
    return this.http.get<any>(`${this.serverURL}/quote/allOrders/all`);
  }

}
