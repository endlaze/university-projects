import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../app/services/login-service/login.service'
import { HttpClientModule} from '@angular/common/http';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPizzaComponent } from './components/new-pizza/new-pizza.component';
import { OrderComponent } from './components/order/order.component';
import { StockService } from './services/stock-service/stock.service';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { NewStockPizzaComponent } from './components/maintenance/new-stock-pizza/new-stock-pizza.component';
import { DefinePizzaComponent } from './components/define-pizza/define-pizza.component';
import { OrderService } from './services/order-service/order.service';
import { LocalService } from './services/local-service/local.service';
import { RegistrarLocalComponent } from './components/registrar-local/registrar-local.component';
import { DrinkComponent } from './components/drink/drink.component';
import { NewSaladComponent } from './components/new-salad/new-salad.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    AppComponent,
    NewPizzaComponent,
    OrderComponent,
    MaintenanceComponent,
    NewStockPizzaComponent,
    DefinePizzaComponent,
    RegistrarLocalComponent,
    DrinkComponent,
    NewSaladComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [LoginService, StockService, OrderService, LocalService],
  bootstrap: [AppComponent],
  entryComponents: [CreateUserComponent, NewPizzaComponent, DefinePizzaComponent, DrinkComponent, RegistrarLocalComponent, NewSaladComponent]
})

export class AppModule { }
