import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StockRolesService } from './services/stock-roles/stock-roles.service'
import { IonicStorageModule } from '@ionic/storage';
import { AuthGuard } from './guard/auth-guard'
import { LockerModule } from 'angular-safeguard';
import {AddReminderComponent} from './components/add-reminder/add-reminder.component'
import {RemindersPageModule} from './pages/reminders/reminders.module'
import { GoogleMaps } from '@ionic-native/google-maps/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HomePageModule } from './pages/home/home.module'
import { AddRelatedAccountComponent} from './components/add-related-account/add-related-account.component'

@NgModule({
  declarations: [AppComponent, AddRelatedAccountComponent],
  entryComponents: [AddReminderComponent, AddRelatedAccountComponent],
  imports: [
    LockerModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    RemindersPageModule,
    HomePageModule],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StockRolesService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
