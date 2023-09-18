import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl = environment.apiUrl + '/user';
  constructor(private http: HttpClient) { }

  createUser = (user, role) => {
    return this.http.post(this.loginUrl + role, user);
  }

  getUsersByRole(alias) {
    return this.http.get(`${this.loginUrl}/by-role/${alias}`);
  }

  updateUserStatus(user, route) {
    return this.http.post(this.loginUrl + route, user).subscribe((res) => {
      console.log('El usuario ha cambiado su estado', 'Usuario Registrado');
    },
      (err) => { console.log('El usuario ya existe', 'Usuario Registrado'); });
  }

  updateUser(user, route) {
    return this.http.post(this.loginUrl + route + '/update', user);
  }

  updatePartCard(user) {
    return this.http.post(this.loginUrl + '/part/update/card', user)
  }
}
