import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  count: number;
  constructor(private local: LocalStorageService) { }

  ngOnInit(): void {
    this.count = this.local.get("count");
    for (var i = 1; i <= this.count; i++) { 
      this.products.push(this.local.get((("product" + i.toString()))));
    }
    console.log(this.products);
  }

}
