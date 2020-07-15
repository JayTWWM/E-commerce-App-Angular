import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  PHP_API_SERVER = "http://127.0.0.1:80";

  constructor(private httpClient: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.PHP_API_SERVER}/backend/api/createProduct.php`, product);
  }

  fetchProducts(): Observable<Product[]> { 
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/backend/api/getProducts.php`);
  }
  
  checkoutProducts(email: string, cost: number, count: number) { 
    return this.httpClient.post(`${this.PHP_API_SERVER}/backend/api/createOrder.php`, {'email': email, 'cost': cost, 'count': count });
  }
}
