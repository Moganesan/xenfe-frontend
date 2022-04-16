import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: any

  constructor(
    private productService : ProductService
  ) { }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(prods => {
      this.products = prods.products;
      console.log("products", this.products)
    });

  }

}
