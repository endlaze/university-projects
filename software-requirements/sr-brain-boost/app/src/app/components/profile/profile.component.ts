import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo = {}
  userRole = {}
  userSubroles = []

  constructor(private storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('user_info').then(info => {
      this.userInfo = info
    })

    this.storage.get('user_roles').then(roles => {
      this.userRole = roles.user_role
      this.userSubroles = roles.user_subroles
    });
  }
}
