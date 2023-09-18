import { Component, OnInit, Inject } from '@angular/core';
import { PLANS_INFO } from '../../const/plans.constants'
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MembershipService } from '../../services/membership/membership.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})

export class PlansComponent implements OnInit {
  plansCards = []
  currentUser


  constructor(
    private membershipService: MembershipService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private guard: AuthGuard
  ) { }

  ngOnInit(): void {
    this.plansCards = PLANS_INFO
    this.currentUser = this.storage.get('current-user');
   
  }

  selectPlan = (idPlan) => {
    if (!this.checkLoggedIn()) {
      this.router.navigate([`signup/${idPlan}`]);
      return;
    }


    let membershipInfo = { email: this.currentUser.email, membership: parseInt(idPlan) }

    this.membershipService.addMembership(membershipInfo)
      .subscribe(res => this.membershipSuccess(res, this.currentUser),
        err => this.membershipError(err));
  }

  membershipSuccess = (res, currentUser) => {
    this.currentUser.membership = res.membership;
    this.storage.set('current-user', currentUser);
  }

  membershipError = (err) => {
    console.log(err);
  }

  isButtonDisabled = (membership) => {

    if (!this.checkLoggedIn()) {
      return false
    }

    return (this.currentUser.membership === parseInt(membership))
  }



  checkLoggedIn = () => {
    return this.guard.isUserLoggedIn();
  }
}
