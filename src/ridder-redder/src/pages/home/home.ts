import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';


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
    this.map = GoogleMaps.create('map_canvas');
  }

}
