import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './ProductModel';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  baseurl: string = "http://localhost:3000/";

  getAllProducts(){
    return this.http.get<ProductModel[]>(this.baseurl + 'Products',
    {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
  }

  getProductById(id: string){
    return this.http.get<ProductModel>(this.baseurl + 'Products' + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
  }

  addProduct(product: ProductModel){
    return this.http.post(this.baseurl + 'Products', product,
    {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
  }

  deleteProduct(id: string){
    return this.http.delete(this.baseurl + 'Products' + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
  }

  updateProduct(product: ProductModel){
    return this.http.put(this.baseurl + 'Products' + '/' + product._id, product,
    {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    });
  }
}
