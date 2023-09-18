import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private stockTypesUrl = environment.apiUrl + '/api/app_user'
  private personalInformationURL = environment.apiUrl + '/api/personalData'

  constructor(private http: HttpClient) { }

  public create = (user) => {
    return this.http.post(this.stockTypesUrl + '/create', user)
  }

  public getNames = (id) => {
    return this.http.post(this.personalInformationURL, id)
  }

  public getRoles = (id) => {
    return this.http.post(this.stockTypesUrl + '/roles', id)
  }

  public getInfo = (id) => {
    return this.http.post(this.stockTypesUrl + '/get_info', id)
  }

  public linkAccount = (linkReq) => {
    return this.http.post(this.stockTypesUrl + '/link_acc', linkReq)
  }

  public getLinkedAccounts = (linkReq) => {
    return this.http.post(this.stockTypesUrl + '/get_rel_acc', linkReq)
  }
}
