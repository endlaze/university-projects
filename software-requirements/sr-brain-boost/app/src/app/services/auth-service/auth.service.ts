import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage'
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = environment.apiUrl + '/api/app_user/auth/'

  constructor(private http: HttpClient, private storage: Storage) { }

  public login = (user) => {
    return this.http.post(this.authURL, user)
  }

  public logout = () => {
    this.storage.remove('token')
    this.storage.remove('user')
  }

  public authenticated = () => {
    return new Promise((resolve, reject) => {
      this.storage.get('currentSession').then((val) => {
        const sessionExists = val ? true : false;
        resolve(sessionExists)
      });
    });
  }
}
