import { ProductApiService } from './../product-api.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[];
  count: number;

  constructor(private productApiService: ProductApiService, private local: LocalStorageService) { }

  ngOnInit(): void {
    this.productApiService.fetchProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);
    });
  }

  addToCart(index: number) {
    try {
      this.count = this.local.get("count");
      this.count++;
      this.local.set("count", this.count);
    } catch {
      this.local.set("count", 1);
    }
    this.local.set(("product" + this.count.toString()), this.products[index]);
    console.log(this.count);
    console.log(this.local.get(("product" + this.count.toString())));
  }

}
