import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductModel } from '../ProductModel';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: ProductModel[];
  role: String = 'user';

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.authService.currentRole.subscribe( role => this.role = role);
  }

  isAdmin(){
    console.log(this.role)
    return this.role === 'admin';
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data=>{
      console.log(data)
      this.products = data;
    });
  };

  addProduct(): void {
    this.router.navigate(['add-product']);
  }

  deleteProduct(product: ProductModel){
    
    this.productService.deleteProduct(product._id).subscribe(data=>{
      console.log(data);
      this.getAllProducts();
    },
    data => {
      this.toastr.error(data.error.message, 'Error', {
        timeOut: 10000
      });
    });
  }

  updateProduct(product: ProductModel){
    localStorage.removeItem("productId");
    localStorage.setItem("productId", product._id);
    this.router.navigate(['edit-product']);
  }

}
