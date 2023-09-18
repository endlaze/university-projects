import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RelatedAccountsPage } from './related-accounts.page';
import { SharedModule } from '../../shared.module';
import { RelatedAccountsListComponent } from '../../components/related-accounts-list/related-accounts-list.component'

const routes: Routes = [
  {
    path: '',
    component: RelatedAccountsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RelatedAccountsPage, RelatedAccountsListComponent]
})
export class RelatedAccountsPageModule { }
