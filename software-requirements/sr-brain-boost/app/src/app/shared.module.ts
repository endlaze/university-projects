import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component'
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
 imports:      [ CommonModule, IonicModule.forRoot(), RouterModule],
 declarations: [ SidemenuComponent ],
 exports:      [ CommonModule, SidemenuComponent ]
})
export class SharedModule { }