import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad");
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 51.2308134,
          lng: 4.4238697
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

  }

}
