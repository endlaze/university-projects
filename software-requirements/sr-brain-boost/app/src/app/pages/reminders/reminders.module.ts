import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module'

import { IonicModule } from '@ionic/angular';

import { RemindersPage } from './reminders.page';
import { AddReminderComponent } from '../../components/add-reminder/add-reminder.component'

const routes: Routes = [
  {
    path: '',
    component: RemindersPage
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
  declarations: [RemindersPage, AddReminderComponent]
})
export class RemindersPageModule { }
