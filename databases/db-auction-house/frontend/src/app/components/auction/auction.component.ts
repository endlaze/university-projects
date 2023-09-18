import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { AuctionService } from '../../services/auction-service/auction.service'
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.less']
})
export class AuctionComponent implements OnInit {
  category = "Antiguedades";
  subCategory;
  subCategories;
  categories = []
  currentSub = []
  currentRole;
  currentAlias;
  auctions;

  constructor(private toastr: ToastrService, private auctionService: AuctionService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router, ) { }

  ngOnInit() {
    this.currentRole = this.storage.get('current-user').role
    this.currentAlias = this.storage.get('current-user').alias
    this.auctionService.getCategories('/allCategories')
      .subscribe(cat => {
        this.subCategories = cat;
        this.categories = Array.from(new Set(this.subCategories.map(x => x.Categoria)))
      }, () => console.log('No se pudo recuperar los usuarios de la base de datos', 'Error'))
  }


  updateSubCategories = () => {
    const result = [];
    const map = new Map();
    for (const item of this.subCategories) {
      if (!map.has(item.IdSubcategoria) && item.Categoria === this.category) {
        map.set(item.IdSubcategoria, true);
        result.push({
          IdSubcategoria: item.IdSubcategoria,
          Subcategoria: item.Subcategoria
        });
      }
    }
    this.currentSub = result
  }

  sendId = () => {
    this.auctionService.getAuctionBy('subcategory', this.subCategory, this.currentAlias, this.currentRole)
      .subscribe(auctions => {
        this.auctions = auctions
      }, () => console.log('No se pudo recuperar los subastas de la base de datos', 'Error'))
  }

  goToBids = (auctionId) => {
    this.router.navigate(['/bids', auctionId]);
  }

  goToCreateBid = (auctionId) => {
    this.router.navigate(['/bids/create', auctionId]);
  }

  formatDate(date: Date) {
    let newDate = this.toDate(date)
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}`
  }

  toDate = (utc) => {
    return new Date(utc * 1000)
  }

  goToProfile = (userAlias) => {
    let profUser = { Alias: userAlias, auctionRole: 'Vendedor' }
    this.storage.set('seller-prof', profUser)
    this.storage.set('curr-actor', 'seller')
    this.router.navigate(['profile'])
  }

  goToRoute(route) {
    this.router.navigate([route]);
  }
}
