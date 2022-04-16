import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: any [] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllCategory().subscribe(ctg => {
      this.categories=ctg.category;
    });
  }

}
