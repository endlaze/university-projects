import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  auctionUrl = environment.apiUrl + '/auctions';
  constructor(private http: HttpClient) { }

  getAuctionBy = (by, idSub, alias, rol) => {
    return this.http.get(`${this.auctionUrl}/${by}/${idSub}/${alias}/${rol}`);
  }

  getCategories = (by) => {
    return this.http.get(this.auctionUrl + by);
  }

  createAuction = (auction) => {
    return this.http.post(this.auctionUrl, auction);
  }

  getUserAuctions = (AliasConsulta, AliasVendedor, Role) => {
    return this.http.get(`${this.auctionUrl}/user/${AliasConsulta}/${AliasVendedor}/${Role}`);
  }

  getExpiredAuctions = (alias) => {
    return this.http.get(`${this.auctionUrl}/expired/${alias}`);
  }

  restartExpAuct = (auction) => {
    return this.http.post(`${this.auctionUrl}/expired`, auction);
  }
}

