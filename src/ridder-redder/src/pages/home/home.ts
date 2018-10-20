import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, ILatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  prevPos: ILatLng = { lat: 0, lng: 0 };
  mapUpdater: Subscription;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad");
    this.mapUpdater = Observable.interval(5000).subscribe(() => {
      this.loadMap();
    });
  }

  loadMap(){
    this.geolocation.getCurrentPosition()
      .then((resp) => {    
        if (
          (Math.abs(resp.coords.latitude - this.prevPos.lat) + 
            Math.abs(resp.coords.longitude - this.prevPos.lng))
          > 0.0002){      //+- 10 meters difference at 50°N

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
          
          this.prevPos.lat = resp.coords.latitude;
          this.prevPos.lng = resp.coords.longitude;

          this.map = GoogleMaps.create('map_canvas', mapOptions);
        }

      }).catch((error) => {
        console.log(error);
      });
  }

}
