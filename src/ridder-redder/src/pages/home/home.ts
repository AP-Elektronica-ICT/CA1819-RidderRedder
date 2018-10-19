import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad");
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then(
      (resp) => {    
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            },
            zoom: 18,
            tilt: 30
          },
          gestures: {
            scroll: false,
            tilt: false,
            zoom: false,
            rotate: false
          },
        };

        console.log(mapOptions);

        this.map = GoogleMaps.create('map_canvas', mapOptions);
      }).catch((error) => {
        console.log(error);
      });
  }

}
