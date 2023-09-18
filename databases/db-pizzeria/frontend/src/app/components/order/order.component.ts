import { Component, OnInit, Inject } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewPizzaComponent } from '../new-pizza/new-pizza.component'
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service'
import { StockService } from '../../services/stock-service/stock.service'
import { BASIC_STOCKS } from '../../const/stock-constants'
import { OrderService } from 'src/app/services/order-service/order.service';
import { RegistrarLocalComponent } from '../registrar-local/registrar-local.component';
import { DrinkComponent } from '../drink/drink.component'
import {NewSaladComponent} from '../new-salad/new-salad.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})

export class OrderComponent implements OnInit {
  newPizzaModalRef: BsModalRef
  newLocalModalRef: BsModalRef
  newDrinkRef: BsModalRef
  store = 1;
  stores = [];
  user;

  constructor(private modalService: BsModalService,
    private stockService: StockService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.storage.set('newOrder', this.initOrder());
    this.loadStocks()
    this.stores = this.storage.get('stores');
  }

  initOrder() {
    let stockOrder = { order: { storeId: 0, id: 0, totalPrice: 0 }, pizzas: [], salads: [], drinks: [] }
    let user = this.storage.get('currentUser');
    stockOrder.order.id = user.Cedula;
    return stockOrder;
  }

  showNewPizzaPage() {
    this.newPizzaModalRef = this.modalService.show(NewPizzaComponent);
    this.modalService.onHide.subscribe(() => {
      let newOrd = this.calcOrderPrice(this.storage.get('newOrder'))
      this.storage.set('newOrder', newOrd)
    });
  }

  loadStocks() {
    BASIC_STOCKS.forEach((stock) => { this.loadStock(stock.path, stock.storageKey) })
  }

  loadStock(path, storageKey) {
    this.stockService.getStock(path).subscribe((returnedVal) => {
      this.storage.set(storageKey, returnedVal);
    }, (error) => console.log(error));
  }

  registerOrder() {
    let order = this.storage.get('newOrder');
    order.order.storeId = this.store;
    order = this.calcOrderPrice(order)

    if (order.order.price != 0) {
      this.orderService.postOrder('/orders/register', order)
        .subscribe(order => console.log(order),
          err => console.log(err));
    }
    this.storage.set('newOrder', this.initOrder());

  }

  calcOrderPrice(order) {
    let pizzas = order.pizzas;
    let drinks = order.drinks;
    let salads = order.salads;
    let orderPice = 0;
    pizzas.forEach(pizza => {
      orderPice += (pizza.Cantidad * pizza.Precio)
    });

    drinks.forEach(drink => {
      orderPice += drink.Precio;
    });

    salads.forEach(salad => {
      orderPice += (salad.Precio * salad.Cantidad)
    });

    order.order.totalPrice = orderPice;
    console.log(order)
    return order;
  }

  onStoreChange(storeId) {
    this.store = storeId;
    this.newPizzaModalRef = this.modalService.show(NewPizzaComponent);
    this.modalService.onHide.subscribe(() => {
    });
  }

  showDrinksPage() {
    this.newDrinkRef = this.modalService.show(DrinkComponent);
    this.modalService.onHide.subscribe(() => {
      let newOrd = this.calcOrderPrice(this.storage.get('newOrder'))
      this.storage.set('newOrder', newOrd)
    });
  }

  showStoreRegister() {
    this.newLocalModalRef = this.modalService.show(RegistrarLocalComponent);
    this.modalService.onHide.subscribe(() => { 
      this.loadStocks()
      this.stores = this.storage.get('stores');
    });
  }

  showSaladsPage() {
    this.newDrinkRef = this.modalService.show(NewSaladComponent);
    this.modalService.onHide.subscribe(() => {
      let newOrd = this.calcOrderPrice(this.storage.get('newOrder'))
      this.storage.set('newOrder', newOrd)
    });
  }
  
}

