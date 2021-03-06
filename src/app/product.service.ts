import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './ProductModel';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  token: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.token = this.cookieService.get('session')
  }

  baseurl: string = environment.API_BASE_URL;

  getAllProducts(){
    return this.http.get<ProductModel[]>(this.baseurl + 'Products',
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  getProductById(id: string){
    return this.http.get<ProductModel>(this.baseurl + 'Products' + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  addProduct(product: ProductModel){
    return this.http.post(this.baseurl + 'Products', product,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  deleteProduct(id: string){
    return this.http.delete(this.baseurl + 'Products' + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  updateProduct(product: ProductModel){
    return this.http.put(this.baseurl + 'Products' + '/' + product._id, product,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}
