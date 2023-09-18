import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = environment.apiUrl + '/user/login';
  constructor(private http: HttpClient) { }

  login(correo) {
    return this.http.post(this.loginUrl, correo);
  }
}
