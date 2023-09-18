import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = environment.apiUrl + '/product'

  constructor(private http: HttpClient) { }

  public createProduct = (purchase, type) => {
    return this.http.post(this.productUrl + '/create', { purchase: purchase, type: type }, { observe: 'response' })
  }

  public createPlaylist = (transaction, type) => {
    return this.http.post(this.productUrl + '/playlist/create', { type: type, transaction: transaction }, { observe: 'response' })
  }

  public addProductToPlaylist = (type, transaction) => {
    return this.http.post(this.productUrl + '/playlist/add', { type: type, transaction: transaction }, { observe: 'response' })
  }

  public fetchPlaylists = (email, type) => {
    return this.http.post(this.productUrl + '/playlist/findAll', { email: email, type: type }, { observe: 'response' })
  }
}

