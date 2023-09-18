import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/nav/nav.component';
import { PlansComponent } from './components/plans/plans.component';
import { HttpClientModule } from '@angular/common/http';
import { LockerModule } from 'angular-safeguard';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { UserService } from './services/user-service/user.service'
import { AuthService } from './services/auth/auth.service'
import { AuthGuard } from './services/auth/auth.guard';
import { StoreComponent } from './components/store/store.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MusicComponent } from './components/music/music.component';
import { AlbumPreviewComponent } from './components/album-preview/album-preview.component'
import { ProductService } from './services/product/product.service';
import { LibraryComponent } from './components/library/library.component';
import { TabComponent } from './generics/tab/tab.component';
import { LibraryTabsComponent } from './components/library-tabs/library-tabs.component';
import { MusicLibraryComponent } from './components/music-library/music-library.component';
import { MoviesLibraryComponent } from './components/movies-library/movies-library.component';
import { PlaylistModalComponent } from './components/playlist-modal/playlist-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    PlansComponent,
    routedComponents,
    StoreComponent,
    MoviesComponent,
    MusicComponent,
    AlbumPreviewComponent,
    LibraryComponent,
    TabComponent,
    LibraryTabsComponent,
    MusicLibraryComponent,
    MoviesLibraryComponent,
    PlaylistModalComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LockerModule,
    StorageServiceModule,
  ],
  providers: [UserService, AuthService, AuthGuard, ProductService],
  bootstrap: [AppComponent],
  entryComponents:[PlaylistModalComponent]
})
export class AppModule { }
