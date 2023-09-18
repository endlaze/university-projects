import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { getRole } from '../../const/role-constants'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})

export class MainPageComponent implements OnInit {
  roles;

  constructor(private route: ActivatedRoute, private router: Router, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {

    
    this.roles= getRole(this.storage.get('current-user').role)
  }

  goToRoute(route) {
    this.router.navigate([route]);
  }
}
