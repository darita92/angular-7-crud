import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from './UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.API_BASE_URL;
  authenticated: boolean;
  token: string;
  private roleSource = new BehaviorSubject('user');
  currentRole = this.roleSource.asObservable();
  private tokenSource = new BehaviorSubject('');
  currentToken = this.tokenSource.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  authorize(user: UserModel){
    let headers = {
      'Application-Key': environment.apiKey
    };
    return this.http
      .post(
        this.baseUrl + '/authorize',
        {
          username: user.username,
          password: user.password
        },
        { headers: headers}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  profile(){
    let token = this.cookieService.get('session');
    let headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http
      .get(
        this.baseUrl + '/profile',
        { headers: headers}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  setSession(token){
    this.authenticated = true;
    this.tokenSource.next(token)
    this.cookieService.set('session', token);
  }

  setRole(role){
    this.roleSource.next(role)
  }

  destroySession(){
    this.authenticated = false;
    this.tokenSource.next('')
    this.roleSource.next('user')
    this.cookieService.delete('session')
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
