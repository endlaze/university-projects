import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';

//Services
import { ContactService } from '../services/contact-service/contact.service'
import { FAQService } from '../services/faq-service/faq.service'
//Components
import { MainComponent } from '../components/main-component/main.component';
import { ContactComponent } from '../components/contact-component/contact.component';
import { FAQComponent } from '../components/faq-component/faq.component'
import { NavComponent } from '../components/nav-component/nav.component';
import { HomeComponent } from '../components/home-component/home.component'

@NgModule({
  declarations: [
    MainComponent,
    ContactComponent,
    FAQComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ContactService, FAQService],
  bootstrap: [MainComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
