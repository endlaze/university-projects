import { Component, OnInit, Inject } from '@angular/core';
import { Locker, DRIVERS } from 'angular-safeguard';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import {AuthGuard } from '../../services/auth/auth.guard'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
     private router: Router,
     private locker: Locker,
     private authGuard:AuthGuard  
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.locker.clear(DRIVERS.SESSION);
    this.storage.clear()
    this.router.navigateByUrl('/login');
  }

  checkLoggedIn=()=>{
    return this.authGuard.isUserLoggedIn();
  }


}
