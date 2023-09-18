import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  loginUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  postOrder(path, order) {
    return this.http.post(this.loginUrl + path, order);
  }
}
