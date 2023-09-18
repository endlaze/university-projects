import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit{
  watch: any;
  map: GoogleMap;
  lat = 0.0;
  long = 0.0;

  constructor(private platform: Platform, private geolocation: Geolocation) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {
      this.lat = data.coords.latitude
      this.long = data.coords.longitude
      this.onPositionChange()
      
    });
  }

  onPositionChange = () => {
    this.map.moveCamera({
      target: {lat: this.lat, lng: this.long},
      zoom: 17,
      tilt: 60,
    }).then(() => {
      let marker: Marker = this.map.addMarkerSync({
        title: 'Posicion actual',
        icon: 'blue',
        position: {
          lat: this.lat,
          lng: this.long
        }
      });
    });
  }

  loadMap = () => {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDzlKHFZ1WgHylJ8A2uCc1aEXDLZDLUYq8',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDzlKHFZ1WgHylJ8A2uCc1aEXDLZDLUYq8'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.lat,
           lng: this.long,
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

  }
}
