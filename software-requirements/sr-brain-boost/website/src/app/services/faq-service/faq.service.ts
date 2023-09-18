import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FAQService {
  private faqUrl = environment.apiUrl + '/api/FAQ'

  constructor(private http: HttpClient) { }

  public getFAQ = () => {
    return this.http.get(this.faqUrl)
  }

  public postFAQ = (faqObj) => {
    return this.http.post(this.faqUrl, faqObj)
  }
}
