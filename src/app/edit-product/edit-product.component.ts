import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductService } from '../product.service';
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { ProductModel } from '../ProductModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: ProductModel;
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService) { }

  ngOnInit() {
    let productId = localStorage.getItem("productId");
    if(!productId){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      company: ['', Validators.required]
    });

    this.productService.getProductById(productId).subscribe(data=>{
      console.log(data);
      this.editForm.patchValue(data); //Don't use editForm.setValue() as it will throw console error
    },
    data => {
      this.toastr.error(data.error.message, 'Error', {
        timeOut: 10000
      });
    });
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit(){
    this.submitted = true;
    
    if(this.editForm.valid){
      this.productService.updateProduct(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      },
      data => {
        this.toastr.error(data.error.message, 'Error', {
          timeOut: 10000
        });
      });
    }
  }

}
