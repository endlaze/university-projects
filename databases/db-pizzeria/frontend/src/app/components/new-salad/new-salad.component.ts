import { Component, OnInit, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { StockService } from 'src/app/services/stock-service/stock.service';

@Component({
  selector: 'app-new-salad',
  templateUrl: './new-salad.component.html',
  styleUrls: ['./new-salad.component.less']
})
export class NewSaladComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, @Inject(SESSION_STORAGE) private storage: StorageService, private stockService: StockService) { }
  stockSalads = [];
  stockExtras = [];
  stockSizes = [];
  saladIngredients = [];
  pollo;
  vinegretas = [];
  saladSize = 1;
  extras = [];
  quantity = 1;
  stockSaladId = 0;
  vinId = 0;
  chicken = false;
  currentSalad = {Precio: 0, Cantidad: this.quantity, Nombre: '', ing: [], size: {}, extra: [] };

  ngOnInit() {
    this.stockSalads = this.loadStockSalads();
    this.stockExtras = this.storage.get('stockExtras');
    this.stockSizes = this.storage.get('saladSizes');
    this.pollo = this.stockExtras.shift();
    this.vinegretas = [...this.stockExtras];
  }

  loadStockSalads() {
    let salads = this.storage.get('stockSalads')
    salads.forEach(salad => {
      salad.ingredients.map((ing) => {
        ing['Cantidad'] = 1
        return ing;
      });
    });
    return salads;
  }

  close() {
    this.bsModalRef.hide()
  }

  saveSalad() {
    let salad = this.buildSalad();
    let currentOrder = this.storage.get('newOrder');
    currentOrder.salads.push(salad);
    this.storage.set('newOrder', currentOrder);
    this.bsModalRef.hide();
  }

  onStockSaladChange(stockSaladId) {
    this.stockSaladId = parseInt(stockSaladId)
    let selectedSalad = this.stockSalads.find((salad) => {
      return salad.salad.IdEnsaladaStock === this.stockSaladId;
    })
    this.currentSalad.Nombre = selectedSalad.salad.Nombre;
    this.saladIngredients = [...selectedSalad.ingredients];
    this.currentSalad = this.buildSalad();
  }

  onVinagretaChange(vinagretaId) {
    this.vinId = parseInt(vinagretaId);
    this.currentSalad = this.buildSalad();
  }

  onChickenChange() {
    this.chicken = !this.chicken;
    this.currentSalad = this.buildSalad();
  }

  onDuplicateChange(ingredient) {
    this.saladIngredients.map((ing) => {
      if (ing.IdIngrediente === ingredient.IdIngrediente) {
        ing.Cantidad = (ing.Cantidad === 1) ? 2 : 1;
      }
      return ing;
    });
    this.currentSalad = this.buildSalad();
  }

  onSizeChange(sizeId) {
    this.saladSize = parseInt(sizeId);
    this.currentSalad = this.buildSalad();
  }

  deleteIngredient(ingredient) {
    this.saladIngredients = this.saladIngredients.filter((ing) => ing.IdIngrediente != ingredient.IdIngrediente);
  }

  calcSaladPrice(salad) {
    let price = salad.size.Precio
    salad.ing.forEach(ingre => {
      let ingPrice = (ingre.Cantidad === 1)? 0 : 250;
      price += ingPrice;
    });
    salad.extra.forEach(ext => {
      price += ext.Precio;
    });
    salad.Precio = price;
    return salad;
  }

  buildSalad() {
    let ingredients = this.saladIngredients;
    let size = this.stockSizes.find((size) => {return size.IdTamEnsaladaStock === this.saladSize});
    let ext = [];
    if (this.chicken) {
      ext.push(this.pollo);
    }
    if (this.vinId !== 0) {
      let vinagreta = this.vinegretas.find((vina) => {return vina.IdExtraStock === this.vinId});
      ext.push(vinagreta)
    }

    let newSalad = {
      Precio: 0,
      Cantidad: this.quantity,
      Nombre: this.currentSalad.Nombre,
      ing: ingredients,
      size: size,
      extra: ext
    }
    newSalad = this.calcSaladPrice(newSalad)
    return newSalad;
  }
}


