import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StockRolesService {
  private stockTypesUrl = environment.apiUrl + '/api'

  constructor(private http: HttpClient) { }

  public getStockRolesXSubroles = () => {
    return this.http.get(this.stockTypesUrl + '/stock_roles/getRS')
  }
}