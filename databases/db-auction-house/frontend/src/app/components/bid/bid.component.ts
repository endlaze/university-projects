import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from '../../services/bid-service/bid.service'
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';


@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.less']
})
export class BidComponent implements OnInit, OnDestroy {
  bidId: number
  private sub: any
  currentRole;
  currentAlias;
  bids;
  constructor(private router: Router, private route: ActivatedRoute, private bidService: BidService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.currentRole = this.storage.get('current-user').role
      this.currentAlias = this.storage.get('current-user').alias
      this.bidId = + params['id'];
      this.bidService.getBidBy('auction', this.bidId, this.currentAlias, this.currentRole)
        .subscribe(bids => {
          this.bids = bids;
          console.log(bids)
        }, () => console.log('No se pudo recuperar los usuarios de la base de datos', 'Error'))
    });
  }

  goToProfile = (userAlias) => {
    let profUser = { Alias: userAlias, auctionRole: 'Comprador' }
    this.storage.set('buyer-prof', profUser)
    this.storage.set('curr-actor', 'buyer')
    this.router.navigate(['profile'])
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  toDate = (utc) => {
    return new Date(utc * 1000)
  }

}
