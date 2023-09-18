import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {
  stockDrinks = [];
  stockSizes = [];
  selectedDrink = 1;
  selectedSize = 1;
  quantity = 1;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.stockDrinks = this.loadDrinks(this.storage.get('drinks'))
    this.stockSizes = this.storage.get('drinkSizes');
  }

  loadDrinks(drinks) {
    drinks.map((drink) => {
      drink['Cantidad'] = 0;
      drink['size'] = {}
      drink['Precio'] = 0;
      return drink
    });
    return drinks
  }

  onDrinkChange(drinkId) {
    this.selectedDrink = parseInt(drinkId);
  }

  onSizeChange(sizeId) {
    this.selectedSize = parseInt(sizeId);
  }

  onQuantityChange(quantity) {
    this.quantity = parseInt(quantity);
  }

  saveDrink() {
    let currentOrder = this.storage.get('newOrder');
    let seleDrink = this.stockDrinks.find((drink) => {
      return drink.IdBebidaStock === this.selectedDrink
    });

    let seleTam = this.stockSizes.find((size) => {
      return size.IdTamBebidaStock === this.selectedSize
    });

    seleDrink.Cantidad = this.quantity;
    seleDrink.Precio = this.quantity * seleTam.PrecioBase;
    seleDrink.size = Object.assign({}, seleTam);
    currentOrder.drinks.push(seleDrink);
    this.storage.set('newOrder', currentOrder);
    this.bsModalRef.hide();
  }

  close() {
    this.bsModalRef.hide();
  }
}