import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authorizationUrl = environment.authorizationUrl;
  authenticated: boolean;
  token: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  authorize(role: string){
    let headers = {
      'Application-Key': environment.apiKey
    };
    return this.http
      .post(
        this.authorizationUrl,
        {role},
        { headers: headers}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  setSession(token: string){
    this.authenticated = true;
    this.token = token;
    this.cookieService.set('session', token);
  }

  destroySession(){
    this.authenticated = false;
    this.token = '';
    this.cookieService.delete('session')
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
