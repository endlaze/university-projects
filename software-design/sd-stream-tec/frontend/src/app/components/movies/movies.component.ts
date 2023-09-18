import { Component, OnInit, Inject } from '@angular/core';
import { MOVIES } from '../../const/movies.constants';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AuthGuard } from '../../services/auth/auth.guard';
import { ProductService } from '../../services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaylistModalComponent } from '../playlist-modal/playlist-modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  cinemaCatalog = []
  ownedVideos = new Map();
  currentUser

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private authGuard: AuthGuard,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cinemaCatalog = MOVIES;

    if (!this.checkLoggedIn()) {
      return;
    }

    this.currentUser = this.storage.get('current-user')

    this.initOwnedVideos(this.currentUser.videos).then(videos => {
      this.ownedVideos = new Map(videos);
    })
  }

  checkLoggedIn = () => {
    return this.authGuard.isUserLoggedIn();
  }

  buyMovie = (movie) => {
    if (!this.checkLoggedIn()) {
      this.router.navigate(['login'])
      return;
    }

    movie.price = (this.isUsrBirthMonth(this.currentUser.birthdate)) ? (movie.price - (movie.price * 0.05)) : movie.price

    let purchase = { email: this.currentUser.email, product: { idVideo: movie.id, purchasePrice: movie.price, purchaseDate: Date.now() } }
    this.productService.createProduct(purchase, 1)
      .subscribe(res => this.movieSuccess(res),
        err => this.movieError(err));
  }

  movieSuccess(res) {
    let movie = res.body.product;
    this.currentUser.videos.push(movie)
    this.storage.set('current-user', this.currentUser);
    this.ownedVideos.set(movie.idVideo, movie.idMovie)
  }

  movieError(err) {
    console.log('Usuario o contraseña incorrectos', 'Autentificación Incorrecta');
    // this.toastr.error('Usuario o contraseña incorrectos', 'Autentificación Incorrecta');
  }

  addToPlaylist = (movie) => {

    const modalRef = this.modalService.open(PlaylistModalComponent);
    modalRef.componentInstance.product = movie;
    modalRef.componentInstance.type = 1;
  }

  initOwnedVideos = (ownedVideos) => {
    let promiseArray = []
    ownedVideos.map(video => {
      promiseArray.push(new Promise((resolve, reject) => {
        resolve([video.idVideo, video.idVideo])
      }))
    })
    return Promise.all(promiseArray)
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
