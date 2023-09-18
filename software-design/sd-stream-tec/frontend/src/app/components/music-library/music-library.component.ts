
import { Component, OnInit, Inject } from '@angular/core';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { MUSIC } from '../../const/music.constants';
import { ProductService } from '../../services/product/product.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MOVIES } from 'src/app/const/movies.constants';

@Component({
  selector: 'app-music-library',
  templateUrl: './music-library.component.html',
  styleUrls: ['./music-library.component.css']
})

export class MusicLibraryComponent implements OnInit {
  currentUser
  userMusicPlaylists = []
  selectedPlaylist = { tracks: [] }
  addPlaylistForm: FormGroup
  addPlaylistDisabled = true;
  stockMusic = new Map()

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addPlaylistForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.currentUser = this.storage.get('current-user')

    this.initStockMusic().then(music => {
      this.stockMusic = new Map(music);

      this.productService.fetchPlaylists(this.currentUser.email, 2).subscribe((res: any) => {
        res.body.playlists.forEach(playlist => {
          this.initTracks(playlist.tracks).then(newTracks => {
            playlist.tracks = newTracks
            this.userMusicPlaylists.push(playlist)
            console.log(this.userMusicPlaylists)
          })
        });
      },
        err => console.log(err));
    })
  }

  get form() { return this.addPlaylistForm.controls }

  changeBtnStatus = (value) => {
    this.addPlaylistDisabled = (value === "")
  }

  setCurrentPlaylist = (playlist: any) => {
    this.selectedPlaylist = playlist;
    console.log(this.selectedPlaylist.tracks)
  }

  createPlaylist = () => {
    this.productService.createPlaylist({ email: this.currentUser.email, playlist: { name: this.form.name.value, videos: [] } }, 2).subscribe((res: any) => {
      this.userMusicPlaylists = [res.body.playlist].concat(this.userMusicPlaylists);
      this.addPlaylistForm.reset()
    },
      err => console.log(err));
  }

  initStockMusic = () => {
    let promiseArray = []
    MUSIC.map(track => {
      promiseArray.push(new Promise((resolve, reject) => {
        resolve([track.id, track])
      }))
    })
    return Promise.all(promiseArray)
  }

  initTracks = (tracks) => {
    let promiseArray = []
    tracks.map(track => {
      promiseArray.push(new Promise((resolve, reject) => {
        let stockAlbum = this.stockMusic.get(track.idAlbum)
        let stockTrack = stockAlbum.tracklist.find(stockTrack => {
          return stockTrack.number === track.number
        })

        let newTrack = {
          _id: track._id,
          idAlbum: stockAlbum.id,
          cover: stockAlbum.cover,
          albumTitle: stockAlbum.title,
          albumArtist: stockAlbum.artist,
          number: stockTrack.number,
          trackTitle: stockTrack.title,
          length: stockTrack.length
        }

        resolve(newTrack)
      }))
    })
    return Promise.all(promiseArray)
  }
}
