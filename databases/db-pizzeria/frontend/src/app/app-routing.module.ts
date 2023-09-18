import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/components/login/login.component'
import {CreateUserComponent} from '../app/components/create-user/create-user.component'
import {NewPizzaComponent} from '../app/components/new-pizza/new-pizza.component'
import {OrderComponent} from '../app/components/order/order.component'
import { MaintenanceComponent } from './components/maintenance/maintenance.component';


const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
                        { path: 'login', component: LoginComponent },
                        { path: 'register', component: CreateUserComponent },
                        { path: 'newOrder', component: OrderComponent },
                        { path: 'maintenance', component: MaintenanceComponent },
                        { path: 'newPizza', component: NewPizzaComponent },
                        { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routedComponents = [LoginComponent, CreateUserComponent, NewPizzaComponent, MaintenanceComponent];
 