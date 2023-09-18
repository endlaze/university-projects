import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthGuard } from '../../guard/auth-guard'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { APP_PAGES } from '../../../const/sidemenu.constants'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  currentRole
  userRole = { role_id: 1, role_desc: '' }
  userSubroles = []
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home',
      disabled: false,
      allowedRoles: [1, 2, 3]
    },
    {
      title: 'Mi perfil',
      url: '/profile',
      icon: 'person',
      disabled: false,
      allowedRoles: [1, 2, 3]
    },
    {
      title: 'Cuentas asociadas',
      url: '/related-accounts',
      icon: 'people',
      disabled: false,
      allowedRoles: [1, 2, 3]
    },
    {
      title: 'Recordatorios',
      url: '/reminders',
      icon: 'ios-calendar',
      disabled: false,
      allowedRoles: [1]
    },
    {
      title: 'Aplicaciones',
      url: '/apps',
      icon: 'ios-apps',
      disabled: true,
      allowedRoles: [1, 2, 3]
    },
    {
      title: 'Juegos',
      url: '/games',
      icon: 'logo-game-controller-b',
      disabled: true,
      allowedRoles: [1, 2, 3]
    },
    {
      title: 'Estadísticas',
      url: '/stats',
      icon: 'stats',
      disabled: true,
      allowedRoles: [1, 2, 3]
    },
    {
      title: 'Notas Médicas',
      url: '/medical_notes',
      icon: 'create',
      disabled: true,
      allowedRoles: [1]
    },
    {
      title: 'Información',
      url: '/info',
      icon: 'information-circle-outline',
      disabled: true,
      allowedRoles: [1, 2, 3]
    },
    {
      title: 'Ajustes',
      url: '/settings',
      icon: 'cog',
      disabled: true,
      allowedRoles: [1, 2, 3]
    }
  ]

  constructor(private guard: AuthGuard, private router: Router, private storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('user_roles').then(roles => {
      this.userRole = roles.user_role
      this.userSubroles = roles.user_subroles
    });



  }

  logout = () => {
    this.guard.logout()
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  // checkRoute = (allowedRoles: any) => {
  //   return allowedRoles.includes(this.userRole.role_id)
  // }
}
