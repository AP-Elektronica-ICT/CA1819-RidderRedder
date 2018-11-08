import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, ILatLng, Marker, MarkerOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Monster } from '../../app/Monster';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  prevPos: ILatLng;
  mapUpdater: Subscription;
  monsters: Array<Monster>;

  // tfw static doesn't work
  monsterDistance:number = 0.005; // 0.005 ~ 250m?

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    this.monsters = new Array<Monster>();
    this.prevPos = { lat: 0, lng: 0};
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad");
    this.loadMap();
    this.mapUpdater = Observable.interval(5000).subscribe(() => {
      this.updateMap();
      this.updateMonsters();
    });
  }

  // create new GoogleMap
  loadMap(){
    this.geolocation.getCurrentPosition()
      .then((resp) => {    
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
            zoom: true,
            rotate: true
          },
        };

        console.log(mapOptions);

        this.prevPos.lat = resp.coords.latitude;
        this.prevPos.lng = resp.coords.longitude;

        this.map = GoogleMaps.create('map_canvas', mapOptions);
      }).catch((error) => {
        console.log(error);
      });
  }

  // move map centre to current location, if location is far enough from previous location
  updateMap(){
    this.geolocation.getCurrentPosition()
      .then((resp) => {    
        //if (
        //  (Math.abs(resp.coords.latitude - this.prevPos.lat) + 
        //   Math.abs(resp.coords.longitude - this.prevPos.lng))
        // > 0.0002){      //+- 10 meters difference at 50°N

          console.log("moving  map to " + resp);

          this.prevPos.lat = resp.coords.latitude;
          this.prevPos.lng = resp.coords.longitude;

          this.map.animateCamera(
            {target:
              {lat: resp.coords.latitude,
                lng: resp.coords.longitude
              }
            });
        //}

      }).catch((error) => {
        console.log(error);
      });
  }

  // generate new monsters, and check if you're close enough to fight
  updateMonsters(){
    //if close enough
    if( false ){
    }
    if( this.monsters.length > 5 ){
      // TODO add timestamp, remove after time
      this.monsters[0].marker.remove();
      this.monsters.shift();
    }
    else{
      // generate new marker location
      let currPos = this.map.getCameraPosition().target;       
      let rlat: number = (currPos.lat-this.monsterDistance)+(Math.random()*2*this.monsterDistance);
      let rlng: number = (currPos.lng-this.monsterDistance)+(Math.random()*2*this.monsterDistance);

      //generate random monster, attach marker
      let monster: Monster = Monster.random()
      
      let marker: Marker = this.map.addMarkerSync({
        title: monster.name,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: rlat,
          lng: rlng
        }
      });

      monster.marker = marker;
      this.monsters.push(monster);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.launchFight(monster);
      });
    }
  }

  // open the fight screen
  launchFight(monster: Monster){
    //TODO actually call the fight screen
    alert("starting fight");
  }
}
