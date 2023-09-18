import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { BidComponent } from './components/bid/bid.component'
import { AuctionComponent } from './components/auction/auction.component'
import { AuthGuard } from './guard/auth-guard'
import { RoleGuard } from './guard/role-guard'
import { MainPageComponent } from './components/main-page/main-page.component'
import { CreateUserComponent } from './components/create-user/create-user.component'
import { UserManagementComponent } from './components/user-management/user-management.component'
import { Router, ActivatedRoute } from '@angular/router';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component'
import { UpdateUserComponent } from './components/update-user/update-user.component'
import { CreateBidComponent } from './components/create-bid/create-bid.component'
import { ProfileComponent } from './components/profile/profile.component'
import { EditAuctionComponent } from './components/edit-auction/edit-auction.component'
import { MyProfileComponent } from './components/my-profile/my-profile.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auctions', component: AuctionComponent, canActivate: [AuthGuard] },
  { path: 'auctions/create', component: CreateAuctionComponent, canActivate: [AuthGuard] },
  { path: 'bids/create/:auctionId', component: CreateBidComponent, canActivate: [AuthGuard] },
  { path: 'bids/:id', component: BidComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Administrador', 'Agente'], redirectTo: '/auctions', key: 'current-user' } },
  { path: 'update-user', component: UpdateUserComponent, canActivate: [RoleGuard], data: { allowedRoles: ['Administrador', 'Agente'], redirectTo: '/auctions', key: 'current-user' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-auction', component: EditAuctionComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routedComponents = [LoginComponent];
