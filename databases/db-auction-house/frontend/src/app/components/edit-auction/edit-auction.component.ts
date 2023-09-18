import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { AuctionService } from 'src/app/services/auction-service/auction.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.less']
})
export class EditAuctionComponent implements OnInit {
  editAuctionForm: FormGroup;
  currentUser;
  auctionToEdit;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private toastr: ToastrService, public bsModalRef: BsModalRef, private auctionService: AuctionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currentUser = this.storage.get('current-user');
    this.auctionToEdit = this.storage.get('auction-to-edit');

    this.editAuctionForm = this.formBuilder.group({
      basePrice: ['', Validators.required],
      finalDate: ['', Validators.required]
    });

    this.editAuctionForm.patchValue({
      basePrice: this.auctionToEdit.PrecioBase,
    });
  }
  get form() { return this.editAuctionForm.controls; }

  toDate = (utc) => {
    return new Date(utc * 1000)
  }

  onSubmit() {
    if (this.editAuctionForm.invalid) {
      console.log('invalid')
      return;
    }

    if (!this.currentUser.conTarjeta) {
      this.toastr.error('El usuario no tiene una tarjeta asociada')
      this.close();
    }

    let updatedAuction = { IdSubasta: this.auctionToEdit.IdSubasta, FechaFinal: this.form.finalDate.value, PrecioBase: this.form.basePrice.value }
    console.log(updatedAuction)

    this.auctionService.restartExpAuct(updatedAuction).subscribe((res) => {
      console.log(res)
    }, () => console.log('No se pudo publicar la subasta en la base de datos', 'Error'));

  }

  close = () => {
    this.bsModalRef.hide()
  }

}
