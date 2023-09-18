import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../../assets/const/constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})

export class NavComponent implements OnInit {
  routes = ROUTES

  constructor(private router: Router) { }

  ngOnInit() { }

  isActive = (route) => (this.router.url === route)
}
