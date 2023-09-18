import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../../components/profile/profile.component'
import { IonicModule } from '@ionic/angular';
import { UserProfilePage } from './user-profile.page';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [UserProfilePage, ProfileComponent]
})
export class UserProfilePageModule { }
