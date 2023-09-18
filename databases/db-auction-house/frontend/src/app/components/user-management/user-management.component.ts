import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { getRole } from '../../const/role-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.less']
})


export class UserManagementComponent implements OnInit {
  users;
  currentUser;
  constructor(private router: Router, private userService: UserService, @Inject(SESSION_STORAGE) private storage: StorageService) { }
  ngOnInit(): void {
    this.currentUser = this.storage.get('current-user')
    this.getUsers()
  }


  getUsers() {
    let user = this.storage.get('current-user')
    this.userService.getUsersByRole(user.alias)
      .subscribe(users => {
        this.users = users;
        console.log(this.users)
      }, () => console.log('No se pudo recuperar los usuarios de la base de datos', 'Error'))
  }

  changeUserStatus = (user) => {
    console.log(user)
    let postUser = { Alias: user.Alias, Rol: this.currentUser.role }
    let route = getRole(this.currentUser.role).route;
    let action = (user.Suspendido) ? 'activate' : 'ban'

    this.users.map((listUser) => {
      if (listUser.Alias === user.Alias) {
        user.Suspendido = !user.Suspendido
      }
    })

    this.userService.updateUserStatus(postUser, `${route}/${action}`)
  }

  updateUser = (user) => {
    this.storage.set('user-to-update', user)
    this.goToRoute('update-user')
  }

  goToRoute(route) {
    this.router.navigate([route]);
  }
}
