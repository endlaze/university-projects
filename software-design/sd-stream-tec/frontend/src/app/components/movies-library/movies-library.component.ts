import { Component, OnInit, Inject } from '@angular/core';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MOVIES, fetchMovie } from '../../const/movies.constants';
import { ProductService } from '../../services/product/product.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-movies-library',
  templateUrl: './movies-library.component.html',
  styleUrls: ['./movies-library.component.css']
})
export class MoviesLibraryComponent implements OnInit {
  currentUser
  userVideoPlaylists = []
  selectedPlaylist = { videos: [] }
  addPlaylistForm: FormGroup
  addPlaylistDisabled = true;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private productService: ProductService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.addPlaylistForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.currentUser = this.storage.get('current-user')

    this.productService.fetchPlaylists(this.currentUser.email, 1).subscribe((res: any) => {
      res.body.playlists.forEach(playlist => {
        this.initmovies(playlist.videos).then(movies => {
          playlist.videos = movies
          this.userVideoPlaylists.push(playlist)
        })
      });
    },
      err => console.log(err));
  }

  get form() { return this.addPlaylistForm.controls }

  changeBtnStatus = (value) => {
    this.addPlaylistDisabled = (value === "")
  }

  setCurrentPlaylist = (playlist) => {
    this.selectedPlaylist = playlist;
    console.log(this.selectedPlaylist.videos.length)
  }

  initmovies = (movies) => {
    let promiseArray = []

    movies.forEach(mov => {
      promiseArray.push(new Promise((resolve, reject) => {
        fetchMovie(mov.idVideo).then((movie: any) => {
          movie._id = mov._id
          resolve(movie)
        })
      })
      )
    });

    return Promise.all(promiseArray)
  }

  createPlaylist = () => {
    this.productService.createPlaylist({ email: this.currentUser.email, playlist: { name: this.form.name.value, videos: [] } }, 1).subscribe((res: any) => {
      this.userVideoPlaylists = [res.body.playlist].concat(this.userVideoPlaylists)
      this.addPlaylistForm.reset()
    },
      err => console.log(err));

  }
}
