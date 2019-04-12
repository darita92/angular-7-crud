import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserModel } from './auth/UserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Product Webapp';

  constructor(
    private authService: AuthService,
  ){}

  ngOnInit() {
    this.authService.profile().subscribe(data=>{
      const user:UserModel = data['user'];
      if(user){
        this.authService.setRole(user.role)
        this.title = `Hi ${user.username} welcome to Product Webapp`;
      }
    });
  }
  
}
