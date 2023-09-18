import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'signup', loadChildren: () => import('./pages/sign-up/sign-up.module').then(s => s.SignUpPageModule) },
  { path: 'reminders', canActivate: [AuthGuard], loadChildren: () => import('./pages/reminders/reminders.module').then(r => r.RemindersPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(l => l.LoginPageModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./pages/user-profile/user-profile.module').then(up => up.UserProfilePageModule) },
  { path: 'related-accounts', canActivate: [AuthGuard], loadChildren: () => import('./pages/related-accounts/related-accounts.module').then(ra => ra.RelatedAccountsPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
