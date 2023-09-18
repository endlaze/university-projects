import { Component, OnInit, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { StockService } from '../../services/stock-service/stock.service';
import * as _ from "lodash";


@Component({
  selector: 'app-new-pizza',
  templateUrl: './new-pizza.component.html',
  styleUrls: ['./new-pizza.component.less']
})

export class NewPizzaComponent implements OnInit {
  namePizza = ""
  stockIng: any = []
  pizzaIngredients: any = []
  selectOptions = [{ name: 'Primera mitad', number: 1 }, { name: 'Segunda mitad', number: 2 }, { name: 'Toda la pizza', number: 3 }]
  pizzaSizes = []
  flavoring;
  stockFlavoring = []
  pizzaSize = 1;
  Cantidad = 1;
  price = 0;
  stockPizzaId = 0;
  stockPizzas = [];

  constructor(public bsModalRef: BsModalRef, @Inject(SESSION_STORAGE) private storage: StorageService, private stockService: StockService) { }

  ngOnInit() {
    this.stockIng = this.loadIngredients(this.storage.get('pizzaIngredients'));
    this.pizzaSizes = this.storage.get('pizzaSizes');
    this.stockFlavoring = this.storage.get('flavoring');
    this.stockPizzas = this.loadStockPizzas(this.storage.get('stockPizzas'));
    this.calculatePrice();
  }

  loadIngredients(ingredients) {
    ingredients = ingredients.map((ingredient) => {
      ingredient['selected'] = false;
      ingredient['MitadIngrediente'] = 3;
      ingredient['Cantidad'] = 1;
      ingredient['selector'] = `${ingredient.IdIngrediente}-selector`
      ingredient['inputId'] = `${ingredient.IdIngrediente}-input`
      return ingredient
    });
    return ingredients;
  }

  loadStockPizzas(stockPizzas) {
    let newStockPizzas = stockPizzas.map(pizza => {
      pizza.ingredients = this.loadIngredients(pizza.ingredients);
      return pizza
    });
    return newStockPizzas
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
    this.calculatePrice();
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
    let newPizza = {
      Precio: this.price,
      Cantidad: this.Cantidad,
      size: this.pizzaSizes.find((size) => size.IdTamPizzaStock === this.pizzaSize),
      flavoring: this.stockFlavoring.find((flavoring) => flavoring.IdSaborizante === this.flavoring),
      ing: this.pizzaIngredients
    }

    let currentOrder = this.storage.get('newOrder');
    currentOrder.pizzas.push(newPizza);
    this.storage.set('newOrder', currentOrder);
    this.bsModalRef.hide();
  }

  onChange(MitadIngrediente, ingredient) {
    let newIngredients = this.pizzaIngredients.map((ing) => {
      return (ingredient.IdIngrediente === ing.IdIngrediente) ? this.updateProp('MitadIngrediente', parseInt(MitadIngrediente, 10), ing) : ing;
    })
    this.pizzaIngredients = newIngredients;
    this.calculatePrice();
  }

  onFlavoringChange(flavoring) {
    this.flavoring = parseInt(flavoring);
  }

  onSizeChange(size) {
    this.pizzaSize = parseInt(size);
    this.calculatePrice();
  }

  updateProp(prop, val, obj) {
    obj[prop] = val
    return obj
  }
  onCantidadChange(Cantidad, ingredient) {
    let newIngredients = this.pizzaIngredients.map((ing) => {
      return (ingredient.IdIngrediente === ing.IdIngrediente) ? this.updateProp('Cantidad', parseInt(Cantidad, 10), ing) : ing;
    });
    this.pizzaIngredients = newIngredients;
    this.calculatePrice();
  }

  close() {
    this.bsModalRef.hide();
  }

  calculatePrice() {
    let selectedSize = this.pizzaSizes.find((size) => size.IdTamPizzaStock === this.pizzaSize);
    let pizzaPrice = selectedSize.PrecioBase;
    this.pizzaIngredients.forEach(ingredient => {
      let ingP = (this.calcIngredientPrice(ingredient, selectedSize) * ingredient.Cantidad)
      pizzaPrice += ingP;
    });
    this.price = pizzaPrice;
  }

  calcIngredientPrice(ingrediente, tam) {
    let { PrecioIngReg, PrecioIngDeluxe } = tam;
    let ingredientPrice = (ingrediente.Deluxe) ? PrecioIngDeluxe : PrecioIngReg;
    ingredientPrice = (ingrediente.MitadIngrediente === 3) ? ingredientPrice : (ingredientPrice / 2);
    return ingredientPrice
  }

  onStockPizzaChange(idStockPizza) {
    let pizzilla = this.stockPizzas.find(pizza => {
      return (pizza.pizza.IdPizzaStock === parseInt(idStockPizza, 10))
    });
    let newIng = [...pizzilla.ingredients];
    let previousIngredients =[...this.pizzaIngredients];
    this.pizzaIngredients = [];

    previousIngredients.forEach((ingre) => {
      this.changeIngState(ingre)
    });

    newIng.forEach ((ingre2) => {
      this.changeIngState(ingre2);
    });

  }
}
