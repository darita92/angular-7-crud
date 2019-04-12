import { Component, OnInit } from '@angular/core';
import { UserModel } from '../auth/UserModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  product: UserModel;
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    let userId = localStorage.getItem("userId");
    if(!userId){
      alert("Something wrong!");
      this.router.navigate(['users']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });

    this.userService.getUserById(userId).subscribe(data=>{
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
      this.userService.updateUser(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['users']);
      },
      data => {
        this.toastr.error(data.error.message, 'Error', {
          timeOut: 10000
        });
      });
    }
  }

}
