import { Component, OnInit, Inject } from '@angular/core';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { AuctionService } from '../../services/auction-service/auction.service'
import { BidService } from '../../services/bid-service/bid.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  vendor;
  buyer;
  currentActor;
  currentUser;
  userAuctions;
  userBids;
  constructor(private auctionService: AuctionService, private bidService: BidService, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.currentUser = this.storage.get('current-user');
    this.vendor = this.storage.get('seller-prof');
    this.buyer = this.storage.get('buyer-prof');
    this.currentActor = this.storage.get('curr-actor')


    if (this.currentActor === 'seller')
      this.getUserAuctions()
    else
      this.getUserWinnerBids()

  }

  getUserAuctions = () => {
    this.auctionService.getUserAuctions(this.currentUser.alias, this.vendor.Alias, this.currentUser.role).subscribe(auctions => {
      this.userAuctions = auctions
    }, () => console.log('No se pudo recuperar las subastas de la base de datos', 'Error'))
  }

  getUserWinnerBids = () => {
    this.bidService.getUserWinnerBids(this.currentUser.alias, this.buyer.Alias, this.currentUser.role).subscribe(bids => {
      this.userBids = bids
      console.log(this.userBids)
    }, () => console.log('No se pudo recuperar las pujas de la base de datos', 'Error'))
  }

  toDate = (utc) => {
    return new Date(utc * 1000)
  }

}
