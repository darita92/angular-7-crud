import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated: boolean = false;

  @Input() title: string;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentToken.subscribe( token => {
      if(token){
        this.authenticated = true
      }
    })
  }

  authorize(){
    this.router.navigate(['login']);
  }

  logOut(){
    this.authService.destroySession();
    this.authenticated = false;
    this.router.navigate(['login']);
  }

}
