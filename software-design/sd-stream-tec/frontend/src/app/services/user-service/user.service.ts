import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private contactUrl = environment.apiUrl + '/user'

  constructor(private http: HttpClient) { }

  public createUser = (user) => {
    return this.http.post(this.contactUrl + '/create', user, { observe: 'response' })
  }
}
