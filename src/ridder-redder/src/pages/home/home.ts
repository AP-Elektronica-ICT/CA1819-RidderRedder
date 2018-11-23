import { Component } from '@angular/core';
import { ModalController, NavParams, NavController, IonicApp } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, ILatLng, Marker, MarkerOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Monster } from '../../models/Monster';
import { Landmark } from '../../models/Landmark';
import { InventoryPage } from '../inventory/inventory';
import { CombatPage } from '../combat/combat';
import { MonsterProvider } from '../../providers/monster/monster';
import { PlayerProvider } from '../../providers/player/player';
import { LandmarkProvider } from '../../providers/landmark/landmark';

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  prevPos: ILatLng;
  mapUpdater: Subscription;
  monsters: Array<Monster>;
  landmarks: Array<Landmark>;

  // tfw static doesn't work
  monsterDistance:number = 0.005; // 0.005 ~ 250m?

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public modalCtrl: ModalController, public monsterProvider: MonsterProvider, public lmProvider: LandmarkProvider, public pProvider: PlayerProvider) {
    this.monsters = new Array<Monster>();
    this.prevPos = { lat: 0, lng: 0};

    this.landmarks = lmProvider.getLandmarks();
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
          controls: {
            "myLocation": true,  // the blue location dot
            "myLocationButton": false,
            "zoom": false,
            "mapToolbar": false
          },
          camera: {
            target: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            },
            zoom: 17,
            tilt: 30
          },
          gestures: {
            scroll: false,
            tilt: false,
            zoom: true,
            rotate: true
          },
          styles: [ // disable placenames etc.
            {
              "featureType": "administrative",
              "elementType": "labels",
              "stylers": [{"visibility": "off"}]
            },
            {     // disable point of interest markers
              "featureType": "poi",
              "elementType": "labels",
              "stylers": [{"visibility": "off"}]
            },

          ]
        };

        console.log(mapOptions);

        this.prevPos.lat = resp.coords.latitude;
        this.prevPos.lng = resp.coords.longitude;

        this.map = GoogleMaps.create('map_canvas', mapOptions);
        this.addLandmarks();

      }).catch((error) => {
        console.log(error);
      });
  }

  // add landmark markers to the map
  addLandmarks(){
    for(let landmark of this.landmarks){
      var icon;
      if(landmark.owner == null){
        icon = {url: 'assets/imgs/castle_black.png',  //Castle by BGBOXXX Design from the Noun Project
          size: {
            width: 20,
            height: 30}
        }
      }
      else if(landmark.owner == this.pProvider.id){
        icon = {url: 'assets/imgs/castle_green.png',  //Castle by BGBOXXX Design from the Noun Project
          size: {
            width: 20,
            height: 30}
        }

      }
      else{
        icon = {url: 'assets/imgs/castle_red.png',  //Castle by BGBOXXX Design from the Noun Project
          size: {
            width: 20,
            height: 30}
        }
      }

      let marker: Marker = this.map.addMarkerSync({
        title: landmark.name,
        icon: icon,
        animation: 'DROP',
        position: {
          lat: landmark.lat,
          lng: landmark.lng
        }
      });
      landmark.marker = marker;
    }
  }
  // move map centre to current location, if location is far enough from previous location
  updateMap() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        console.log("moving  map to " + resp);

        this.prevPos.lat = resp.coords.latitude;
        this.prevPos.lng = resp.coords.longitude;

        this.map.animateCamera(
          {
            target:
            {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            }
          });

      }).catch((error) => {
        console.log(error);
      });
  }

  // generate new monsters, and check if you're close enough to fight
  updateMonsters() {
    //if close enough
    if (false) {
    }
    if (this.monsters.length > 5) {
      // TODO add timestamp, remove after time
      this.monsters[0].Marker.remove();
      this.monsters.shift();
    }
    else {
      // generate new marker location
      let currPos = this.map.getCameraPosition().target;
      let rlat: number = (currPos.lat - this.monsterDistance) + (Math.random() * 2 * this.monsterDistance);
      let rlng: number = (currPos.lng - this.monsterDistance) + (Math.random() * 2 * this.monsterDistance);

      //generate random monster, attach marker
      let monster: Monster = this.monsterProvider.getRandomMonster();

      let marker: Marker = this.map.addMarkerSync({
        title: monster.Name.MonsterName,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: rlat,
          lng: rlng
        }
      });

      monster.Marker = marker;
      this.monsters.push(monster);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.launchFight(monster);
      });
    }
  }

  // open the fight screen
  launchFight(monster: Monster) {
    this.navCtrl.push(
      CombatPage,
      { monster: monster }
    );
  }

  // show inventory
  presentInventory() {
    let inventoryModal = this.modalCtrl.create(InventoryPage);
    inventoryModal.present();
  }
}
