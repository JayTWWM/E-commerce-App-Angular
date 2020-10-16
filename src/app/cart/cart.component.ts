import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  count: number;
  email: string;
  constructor(private local: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.email = this.local.get("Email");
    if (this.email == null) {
      this.router.navigate(['/login']);
    }
    this.count = this.local.get("count");
    for (var i = 1; i <= this.count; i++) { 
      this.products.push(this.local.get((("product" + i.toString()))));
    }
    console.log(this.products);
  }

}
