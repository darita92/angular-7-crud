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
  authenticated: boolean

  @Input() title: string;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authenticated = this.cookieService.check('session');
  }

  authorize(){
    this.router.navigate(['login']);
  }

  logOut(){
    this.authService.destroySession();
    this.router.navigate(['login']);
  }

}
