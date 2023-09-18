import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HomePage } from './home.page';
import { MapComponent } from '../../components/map/map.component'
import { SharedModule } from '../../shared.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers: [
    Geolocation
  ],
  declarations: [HomePage, MapComponent]
})
export class HomePageModule { }
