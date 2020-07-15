import { ProductApiService } from './../product-api.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {

  product: Product = { name: null, picLink: null, cost: null, description: null, discount: null };

  constructor(private productApiService: ProductApiService) { }

  ngOnInit(): void {
  }

  createProduct(form) {
    if (this.product.name.length > 50 || this.product.discount > 100 || this.product.cost == 0 || this.product.name.length == 0 || this.product.description.length == 0 || this.product.picLink.length == 0) {
      console.log("Form Invalid");
    } else {
      console.log("Form Valid");
      this.productApiService.createProduct(form.value).subscribe((product: Product) =>{
        console.log("Product created ", product);
        this.ngOnInit();
      });
    }
  }

}
