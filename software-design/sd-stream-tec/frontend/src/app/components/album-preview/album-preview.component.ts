import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fetchAlbum } from '../../const/music.constants';
import { AuthGuard } from '../../services/auth/auth.guard'
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MUSIC } from '../../const/music.constants'
import { ProductService } from 'src/app/services/product/product.service';
import { PlaylistModalComponent } from '../playlist-modal/playlist-modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.css']
})
export class AlbumPreviewComponent implements OnInit {
  musicCatalog = []
  album: any = {}
  ownedTracks = new Map();
  currentUser


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    @Inject(SESSION_STORAGE) private storage: StorageService, private authGuard: AuthGuard,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    let albumIdParam = parseInt(this.activatedRoute.snapshot.params['idAlbum']);

    fetchAlbum(albumIdParam).then((album) => {
      if (!album) {
        this.router.navigate(['/music'])
        return;
      }
      this.album = album;
      this.musicCatalog = MUSIC;

      if (!this.checkLoggedIn()) {
        return;
      }

      this.currentUser = this.storage.get('current-user');

      this.fetchOwnedAlbum(this.album.id, this.currentUser.albums).then((ownedAlbum: any) => {
        this.updateOwnedTracks(ownedAlbum.tracks).then(tracks => {

          this.ownedTracks = new Map(tracks);
        })
      })
    })
  }


  checkLoggedIn = () => {
    return this.authGuard.isUserLoggedIn();
  }

  buyTrack = (track) => {
    if (!this.checkLoggedIn()) {
      this.router.navigate(['login'])
      return;
    }

    track.price = (this.isUsrBirthMonth(this.currentUser.birthdate)) ? (track.price - (track.price * 0.05)) : track.price

    let purchase = {
      email: this.currentUser.email, product: { idAlbum: this.album.id, track: { number: track.number, purchaseDate: Date.now(), purchasePrice: track.price } }
    }

    this.productService.createProduct(purchase, 2)
      .subscribe(res => this.trackSuccess(res),
        err => this.trackError(err));
  }


  trackSuccess(res) {
    let product = res.body.product;
    this.currentUser.albums = product.updatedAlbums;
    this.storage.set('current-user', this.currentUser);

    this.ownedTracks.set(product.track.number, product.track.number)
  }

  trackError(err) {
    console.log('Usuario o contraseña incorrectos', 'Autentificación Incorrecta');
    // this.toastr.error('Usuario o contraseña incorrectos', 'Autentificación Incorrecta');
  }

  updateOwnedTracks = (ownedTracks) => {
    let promiseArray = []
    ownedTracks.map(track => {
      promiseArray.push(new Promise((resolve, reject) => {
        resolve([track.number, track.number])
      }))
    })
    return Promise.all(promiseArray)
  }

  fetchOwnedAlbum = (idAlbum, albums) => new Promise((resolve, reject) => {

    let album = albums.find((album) => {
      return (album.idAlbum === idAlbum)
    })

    resolve(album)
  });

  addToPlaylist = (track) => {
    track.idAlbum = this.album.id

    const modalRef = this.modalService.open(PlaylistModalComponent);
    modalRef.componentInstance.product = track;
    modalRef.componentInstance.type = 2;
  }

  isUsrBirthMonth = (birthdate) => {
    birthdate = new Date(birthdate)
    let currentDate = new Date();

    return birthdate.getMonth() === currentDate.getMonth()
  }

  isUsrBirthday = (birthdate) => {
    birthdate = new Date(birthdate)
    let currentDate = new Date();

    return birthdate.getUTCDate() === currentDate.getUTCDate()
  }
}
