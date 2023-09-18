import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = environment.apiUrl + '/api/contact'

  constructor(private http: HttpClient) { }

  public sendMail = (messageInfo) => {
    return this.http.post(this.contactUrl + '/question', messageInfo, { observe: 'response' })
  }
}
