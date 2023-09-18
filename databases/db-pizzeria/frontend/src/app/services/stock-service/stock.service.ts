import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StockService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getStock(path) {
    return this.http.get(this.apiUrl + path);
  }

  public postStock(path, stockObject) {
    return this.http.post(this.apiUrl + path, stockObject);
  }
}
