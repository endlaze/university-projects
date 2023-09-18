import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { AuctionService } from 'src/app/services/auction-service/auction.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditAuctionComponent } from '../edit-auction/edit-auction.component'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less']
})
export class MyProfileComponent implements OnInit {

  myExpiredAuctions;
  currentUser;
  editAuctionModal: BsModalRef

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private auctionService: AuctionService, private modalService: BsModalService) { }

  ngOnInit() {
    this.currentUser = this.storage.get('current-user');
    this.getExpiredAuctions()
  }

  getExpiredAuctions = () => {
    this.auctionService.getExpiredAuctions(this.currentUser.alias).subscribe((expiredAuctions) => {
      this.myExpiredAuctions = expiredAuctions;
    }, () => console.log('No se pudo publicar la subasta en la base de datos', 'Error'));
  }

  formatDate(date: Date) {
    let newDate = this.toDate(date)
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}`
  }

  toDate = (utc) => {
    return new Date(utc * 1000)
  }

  
  restartAuction = (auctionToEdit) => {
    this.storage.set('auction-to-edit', auctionToEdit)
    this.editAuctionModal = this.modalService.show(EditAuctionComponent);
    this.modalService.onHide.subscribe(() => {
    });
  }
}
