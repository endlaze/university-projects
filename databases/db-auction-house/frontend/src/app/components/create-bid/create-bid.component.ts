import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from 'src/app/services/bid-service/bid.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.less']
})
export class CreateBidComponent implements OnInit, OnDestroy {
  auctionId: number
  private sub: any
  currentRole;
  currentAlias;
  bid = 0;
  minPush;
  maxBid;
  conTarjeta;


  constructor(private route: ActivatedRoute, private bidService: BidService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.currentRole = this.storage.get('current-user').role
      this.currentAlias = this.storage.get('current-user').alias
      this.conTarjeta = this.storage.get('current-user').conTarjeta
      this.auctionId = +params['auctionId'];
      this.bidService.getParams(this.currentRole).subscribe(p => {
        this.minPush = +p[0].AumentoMinimo
        console.log(this.minPush)
      }, () => console.log('No se pudo recuperar los subastas de la base de datos', 'Error'))
      this.bidService.getMaxBid(this.currentRole, this.auctionId).subscribe(maxbid => {
        this.maxBid = +maxbid[0].MaxPuja
      })
    });
  }

  pushBid = () => {
    const bid = {
      AliasParticipante: this.currentAlias,
      Oferta: this.bid,
      IdSubasta: this.auctionId,
      Rol: this.currentRole
    }

    if (!this.conTarjeta) {
      this.toastr.error('El usuario no tiene una tarjeta asociada')
      return;
    }

    if (this.bid < this.maxBid + this.minPush) {
      this.toastr.error(`El aumento mínimo es de ${this.minPush}`)
      return;
    }

    this.bidService.createBid(bid).subscribe(res => {
      this.router.navigate(['/bids/', this.auctionId]);
    }, () => console.log('No se pudo recuperar los subastas de la base de datos', 'Error'))
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
