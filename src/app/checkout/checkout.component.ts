import { ProductApiService } from './../product-api.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { checkout } from '../checkout';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: Product[] = [];
  count: number;
  cost: number = 0;
  temp: number;
  email: string;
  checked: boolean = false;

  constructor(private local: LocalStorageService,private productApiService: ProductApiService) { }

  ngOnInit(): void {
    this.count = this.local.get("count");
    for (var i = 1; i <= this.count; i++) { 
      this.products.push(this.local.get((("product" + i.toString()))));
    }
    for (var product of this.products) { 
      this.temp = this.cost + (Number(product.cost)-Number(product.cost)*Number(product.discount)/100);
      this.cost = this.temp;
    }
    this.email = this.local.get("Email");
    console.log("Cost "+this.cost);
    console.log("Number of Products " + this.count);
    console.log("Email is: " + this.local.get("Email"));
  }

  checkoutProducts() { 
    if (this.count == 0) {
      console.log("No items to buy");
    } else { 
      if (!this.checked) {
        this.checked = !this.checked;
        console.log("Proceeding");
      this.productApiService.checkoutProducts(this.email, this.cost, this.count).subscribe((checkout: checkout) => {
        console.log(checkout.cost);
        this.ngOnInit();
      });
      }
    }
  }
}