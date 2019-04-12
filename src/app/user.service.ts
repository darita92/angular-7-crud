import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from './auth/UserModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.token = cookieService.get('session')
  }

  baseurl: string = environment.API_BASE_URL;

  getAllUsers(){
    return this.http.get<UserModel[]>(this.baseurl + '/users',
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  getUserById(id: string){
    return this.http.get<UserModel>(this.baseurl + '/users' + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  addUser(user: UserModel){
    return this.http.post(this.baseurl + '/users', user,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  deleteUser(id: string){
    return this.http.delete(this.baseurl + '/users' + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  updateUser(user: UserModel){
    return this.http.put(this.baseurl + '/users' + '/' + user._id, user,
    {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }
}
