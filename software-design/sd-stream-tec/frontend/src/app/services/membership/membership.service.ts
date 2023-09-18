import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MembershipService {

  membershipUrl = environment.apiUrl + '/membership';

  constructor(private http: HttpClient) { }

  public addMembership(membershipInfo) {
    return this.http.post(this.membershipUrl + '/add', membershipInfo);
  }
}
