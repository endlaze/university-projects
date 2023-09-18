import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  bidsUrl = environment.apiUrl + '/bids';
  constructor(private http: HttpClient) { }

  getBidBy = (by, idSubasta, alias, rol) => {
    return this.http.get(`${this.bidsUrl}/${by}/${idSubasta}/${alias}/${rol}`);
  }

  getParams = (rol) => {
    return this.http.get(`${this.bidsUrl}/params/${rol}`)
  }

  updateParams = (params) => {
    return this.http.post(`${this.bidsUrl}/params/`, params)
  }

  getMaxBid = (rol, auctionId) => {
    return this.http.get(`${this.bidsUrl}/maxBid/${auctionId}/${rol}`)
  }

  createBid = (bid) => {
    return this.http.post(`${this.bidsUrl}/`, bid)
  }

  getUserWinnerBids = (AliasConsulta, AliasComprador, Role) => {
    return this.http.get(`${this.bidsUrl}/user/${AliasConsulta}/${AliasComprador}/${Role}`);
  }
}
