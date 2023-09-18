import { Component, OnInit, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { StockService } from '../../services/stock-service/stock.service';

@Component({
  selector: 'app-define-pizza',
  templateUrl: './define-pizza.component.html',
  styleUrls: ['./define-pizza.component.less']
})

export class DefinePizzaComponent implements OnInit {
  namePizza = ""
  stockIng: any = []
  pizzaIngredients: any = []

  constructor(public bsModalRef: BsModalRef, @Inject(SESSION_STORAGE) private storage: StorageService, private stockService: StockService) { }

  ngOnInit() {
    this.stockIng = this.loadIngredients();
  }

  loadIngredients() {
    let ingredients = this.storage.get('pizzaIngredients');
    ingredients = ingredients.map((ingredient) => {
      ingredient['selected'] = false
      return ingredient
    });
    return ingredients;
  }

  changeIngState(ingredient) {
    this.stockIng.map((ing) => {
      ing.selected = (ing.IdIngrediente === ingredient.IdIngrediente) ? !ing.selected : ing.selected
      if ((ing.IdIngrediente === ingredient.IdIngrediente) && ing.selected) {
        this.addPizzaIng(ing);
      }
      if ((ing.IdIngrediente === ingredient.IdIngrediente) && !ing.selected) {
        this.removePizzaIng(ing);
      }
      return ing;
    });
  }

  addPizzaIng = (ingredient) => {
    this.pizzaIngredients.push(ingredient);
    this.addStyle(ingredient.IdIngrediente, 'selected-ingredient');
  }

  removePizzaIng = (ingredient) => {
    this.pizzaIngredients = this.pizzaIngredients.filter((storedIng) => (ingredient.IdIngrediente !== storedIng.IdIngrediente));
    this.removeStyle(ingredient.IdIngrediente, 'selected-ingredient');
  }

  addStyle(elemId, style) {
    document.getElementById(elemId).classList.add(style);
  }

  removeStyle(elemId, style) {
    document.getElementById(elemId).classList.remove(style);
  }

  savePizza() {
    if ((this.namePizza !== "") || this.pizzaIngredients.length !== 0) {
      let newPizza = { name: this.namePizza, ingredients: this.pizzaIngredients }
      this.stockService.postStock('/stock-pizzas/', newPizza)
        .subscribe(user => console.log(user),
          err => console.log(err));
    }
  }

  close() {
    this.bsModalRef.hide();
  }
}
