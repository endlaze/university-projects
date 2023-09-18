import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl = environment.apiUrl + '/user/register';
  constructor(private http: HttpClient) { }

  registerUser(user) {
    console.log(user)
    return this.http.post(this.loginUrl, user);
  }
}
