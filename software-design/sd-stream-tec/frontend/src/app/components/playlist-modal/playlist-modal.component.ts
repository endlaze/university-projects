import { Component, OnInit, Input, Inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service'
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.css']
})


export class PlaylistModalComponent implements OnInit {
  @Input() product: string;
  @Input() type: number;

  playlists = []
  currentUser

  constructor(private productService: ProductService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.currentUser = this.storage.get('current-user')
    this.initPlaylists(this.currentUser.email, this.type)
  }

  initPlaylists = (email, type) => {
    this.productService.fetchPlaylists(email, type).subscribe((res: any) => {
      this.playlists = res.body.playlists
    },
      err => console.log(err));
  }

  addProductToPlaylist = (playlist: any, product, type) => {
    let transaction = { email: this.currentUser.email, playlist: { playlistId: playlist._id, product: product } }
    this.productService.addProductToPlaylist(type, transaction).subscribe((res: any) => {
      this.closeModal()
    },
      err => console.log(err));
  }

  closeModal = () => {
    this.activeModal.close()
  }





}
