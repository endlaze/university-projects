import { Component, OnInit, Inject } from '@angular/core';
import { MUSIC } from '../../const/music.constants'
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AuthGuard } from '../../services/auth/auth.guard'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-Music',
  templateUrl: './Music.component.html',
  styleUrls: ['./Music.component.css']
})
export class MusicComponent implements OnInit {
  musicCatalog = []
  currentUser
  memType


  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private authGuard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.musicCatalog = MUSIC;

    if (!this.checkLoggedIn()) {
      return;
    }
    this.currentUser = this.storage.get('current-user')
    this.memType = this.currentUser.membership.memType
  }

  checkLoggedIn = () => {
    return this.authGuard.isUserLoggedIn();
  }
  
  previewAlbum(album) {
    this.router.navigate([`/album/${album.id}`]);
  }

}
