import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  public login(user){
    return this.http.post(this.loginUrl, user, {});
  }
}