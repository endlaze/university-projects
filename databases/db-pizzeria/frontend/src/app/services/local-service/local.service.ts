import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  localUrl = environment.apiUrl + '/stores/';

  constructor(private http: HttpClient) { }

  registerLocal(local) {
    return this.http.post(this.localUrl, local);
  }
}
