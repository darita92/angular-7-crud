import { Component, OnInit } from '@angular/core';
import { UserModel } from '../auth/UserModel';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: UserModel[];

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(data=>{
      this.users = data;
    });
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  }

  deleteUser(user: UserModel){
    
    this.userService.deleteUser(user._id).subscribe(data=>{
      this.getAllUsers();
    },
    data => {
      this.toastr.error(data.error.message, 'Error', {
        timeOut: 10000
      });
    });
  }

  updateUser(user: UserModel){
    localStorage.removeItem("userId");
    localStorage.setItem("userId", user._id);
    this.router.navigate(['edit-user']);
  }
}
