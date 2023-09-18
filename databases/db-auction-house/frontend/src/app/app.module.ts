import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth-service/auth.service'
import { UserService } from './services/user-service/user.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guard/auth-guard';
import { RoleGuard } from './guard/role-guard';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LockerModule } from 'angular-safeguard'
import { StorageServiceModule } from 'angular-webstorage-service';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuctionComponent } from './components/auction/auction.component';
import { AuctionService } from './services/auction-service/auction.service';
import { BidComponent } from './components/bid/bid.component'
import { BidService } from './services/bid-service/bid.service';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateTarjetaComponent } from './components/update-tarjeta/update-tarjeta.component'
import { CreateBidComponent } from './components/create-bid/create-bid.component';
import { ProfileComponent } from './components/profile/profile.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { ParamsComponent } from './components/params/params.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditAuctionComponent } from './components/edit-auction/edit-auction.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    MainPageComponent,
    UserManagementComponent,
    AuctionComponent,
    BidComponent,
    CreateAuctionComponent,
    UpdateUserComponent,
    UpdateTarjetaComponent,
    CreateBidComponent,
    ProfileComponent,
    AppNavComponent,
    ParamsComponent,
    MyProfileComponent,
    EditAuctionComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LockerModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [AuthService, UserService, AuthGuard, RoleGuard, AuctionService, BidService],
  bootstrap: [AppComponent],
  entryComponents: [UpdateTarjetaComponent, ParamsComponent]
})
export class AppModule { }
