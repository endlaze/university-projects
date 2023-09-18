import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StockRolesService } from 'src/app/services/stock-roles/stock-roles.service';
import { AddRelatedAccountComponent } from '../add-related-account/add-related-account.component'
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { UserService } from '../../services/user-service/user.service'


@Component({
  selector: 'app-related-accounts-list',
  templateUrl: './related-accounts-list.component.html',
  styleUrls: ['./related-accounts-list.component.scss'],
})
export class RelatedAccountsListComponent implements OnInit {

  linkedAccounts = []
  userRole = { role_id: 0, role_desc: "" }
  userSubroles = []
  currentUserId = ''
  isDataLoaded = false


  constructor(public modalController: ModalController, private storage: Storage, private userService: UserService) {
  }

  ngOnInit() {
    this.getRequiredData()
  }

  openAddAccModal = () => {
    const modal = this.modalController.create({
      component: AddRelatedAccountComponent,
      cssClass: 'reminders-modal'
    }).then(createdModal => {
      createdModal.present();
      createdModal.onDidDismiss()
        .then(() => {
          console.log('createdModal')
        });
    });
  }

  getRequiredData = () => {
    this.storage.get('current-user-id').then(user_id => {
      this.currentUserId = user_id;
      this.storage.get('user_roles').then(roles => {
        this.userRole = roles.user_role
        this.userSubroles = roles.user_subroles
        this.getLinkedAccounts(user_id, roles.user_role.role_id)
      });
    })
  }

  getLinkedAccounts = (id, role) => {
    let req = { user_id: id, current_user_role: role }
    this.userService.getLinkedAccounts(req).subscribe((res: any) => {
      this.linkedAccounts = res.response
      this.getRolesForAcc().then(() => {
        this.isDataLoaded = true
      })
    }, err => { console.log(err) });
  }

  getUserRoles = (id) => {
    return new Promise((resolve, reject) => {
      this.userService.getRoles({ user_id: id }).subscribe((res: any) => {
        resolve(res.response)
      }, err => { console.log(err) });
    })
  }

  getRolesForAcc(): Promise<any> {
    let rolesToAdd: Array<any> = [];
    this.linkedAccounts.forEach(acc => {
      rolesToAdd.push(new Promise((resolve, reject) => {
        this.getUserRoles(acc.id).then((role: any) => {
          acc['user_role'] = role.user_role
          acc['user_subroles'] = role.user_subroles
          resolve();
        })
      }))
    });
    return Promise.all(rolesToAdd);
  }
}




