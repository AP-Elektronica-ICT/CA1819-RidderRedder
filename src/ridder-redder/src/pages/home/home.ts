import { Component } from '@angular/core';
import { ModalController, NavParams, NavController, IonicApp } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, ILatLng, Marker, MarkerOptions, HtmlInfoWindow } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Monster } from '../../models/Monster';
import { Landmark } from '../../models/Landmark';
import { InventoryPage } from '../inventory/inventory';
import { CombatPage } from '../combat/combat';
import { LandmarkPage } from '../landmark/landmark';
import { LandmarkProvider } from '../../providers/landmark/LandmarkProvider';
import { MonsterProvider } from '../../providers/monster/MonsterProvider';
import { PlayerProvider } from '../../providers/player/PlayerProvider';
import { MonsterDto } from '../../dtos/MonsterDto';
import { AuthProvider } from '../../providers/auth/AuthProvider';
import { LandmarkLoader } from '../../providers/LandmarkLoader';

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

    mapLoaded = false;
    private geoPosWatcher: any;

    private loading = true;

    // The maximum distance a monster should be able to spawn from you
    private monsterDistance: number = 0.003; // 0.005 ~ 250m?

    constructor(public navCtrl: NavController, public geolocation: Geolocation, public modalCtrl: ModalController, public monsterProvider: MonsterProvider, public lmProvider: LandmarkProvider, public pProvider: PlayerProvider, public authProvider: AuthProvider, public navParams: NavParams) {
        this.monsters = new Array<Monster>();
        this.prevPos = { lat: 0, lng: 0 };
    }

    ionViewDidLoad() {
        document.addEventListener("pause", this.resetGeo, false);

        // this.presentInventory();

        // Check if there has previously been a defeated monster.
        // Then remove it from the list
        if (!this.navParams.get('lastmonster'))
            this.removeMonster(this.navParams.get('lastmonster'));

        // Check if the map is loaded, load the map, watch the map.
        if (!this.mapLoaded)
            this.loadMap();
        else
            this.watchMap();
        // this.mapUpdater = Observable.interval(5000).subscribe(() => {
        //     this.updateMap();
        //     this.updateMonsters();
        // });

    }

    // Here we load the Google Maps map by getting our current geolocation.
    // 1. Then we set some map and position options like camera tracking 
    // and disabling options like zooming and scrolling.
    // 2. Then we load in the landmarks for the map.
    // 3. Then we watch our map for movement changes.
    private loadMap() {
        console.log("Loading map");
        this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: false })
            .then((resp) => {
                console.log("Got current position");

                // Step 1. Set map options
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
                        zoom: 16,
                        tilt: 30
                    },
                    gestures: {
                        scroll: false,
                        tilt: false,
                        zoom: false,
                        rotate: true
                    },
                    styles: [ // disable placenames etc.
                        {
                            "featureType": "administrative",
                            "elementType": "labels",
                            "stylers": [{ "visibility": "off" }]
                        },
                        {     // disable point of interest markers
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [{ "visibility": "off" }]
                        },

                    ]
                };

                this.prevPos.lat = resp.coords.latitude;
                this.prevPos.lng = resp.coords.longitude;

                this.map = GoogleMaps.create('map_canvas', mapOptions);

                // Step 2. Load in our landmarks from the API and put them on our map
                this.lmProvider.getLandmarks().subscribe((landmarks) => {
                    console.log('got landmarks');
                    console.log(landmarks);
                    this.landmarks = landmarks;
                    this.addLandmarks();
                });

                // Step 3. We start watching our map for movement changes
                this.mapLoaded = true;
                this.watchMap();

            }).catch((error) => {
                console.log(error);
                console.log("Couldnt get map, retrying...");
                setTimeout(() => {
                    this.loadMap();
                }, 1);

            });
    }

    // Here we watch the map. Listening to the movement of the user.
    // Whenever the user has moved, this we will update it's position
    // and let the camera follow the user.
    private watchMap() {
        console.log("Watching map...");
        this.geolocation.watchPosition({ timeout: 5000, enableHighAccuracy: true }).subscribe(data => {
            this.loading = false;
            this.updateMonsters();
            this.prevPos.lat = data.coords.latitude;
            this.prevPos.lng = data.coords.longitude;

            // Follow the user
            this.map.animateCamera(
                {
                    target:
                    {
                        lat: data.coords.latitude,
                        lng: data.coords.longitude
                    },
                    zoom: 16,
                    tilt: 30
                });
        }, error => {
            console.log("Stopped watching: " + error);
        });

    }

    // Select the landmark icon based on the state of the landmark
    // PARAM: landmark: The landmark to check it's owner
    private chooseLandmarkIcon(landmark) {
        var icon;
        if (landmark.ownerId == null) {
            icon = {
                url: 'assets/imgs/castle_black.png',  //Castle by BGBOXXX Design from the Noun Project
                size: {
                    width: 20,
                    height: 30
                }
            }
        }
        else if (landmark.ownerId == this.authProvider.AuthId) {
            icon = {
                url: 'assets/imgs/castle_green.png',  //Castle by BGBOXXX Design from the Noun Project
                size: {
                    width: 20,
                    height: 30
                }
            }
        }
        else {
            icon = {
                url: 'assets/imgs/castle_red.png',  //Castle by BGBOXXX Design from the Noun Project
                size: {
                    width: 20,
                    height: 30
                }
            }
        }
        return icon;
    }

    // Add landmark markers to the map
    private addLandmarks() {
        for (let landmark of this.landmarks) {
            var icon = this.chooseLandmarkIcon(landmark);
            // create marker
            let marker: Marker = this.map.addMarkerSync({
                title: landmark.name,
                icon: icon,
                animation: 'DROP',
                position: {
                    lat: landmark.lat,
                    lng: landmark.lng
                }
            });
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                this.presentLandmark(landmark);
            });

            // add refference to marker to landmark    
            landmark.marker = marker;
        }
    }

    // Move map center to current location, if location is far enough from previous location
    // DEPRECATED: no longer used, replaced with => watchMap()
    private updateMap() {
        this.geolocation.getCurrentPosition()
            .then((resp) => {
                console.log("Moving  map to " + resp);

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

    // Generate new monsters, and check if you're close enough to fight
    // Also check if monsters are dead to remove them
    private updateMonsters() {
        // console.log("Updating monsters");
        if (this.monsters.length > 5) {
            // this.monsters[0].Marker.remove();
            // this.monsters.shift().Marker.remove();
        } else {
            // for (let index = 0; index < 5 - this.monsters.length; index++) {
            this.generateMonster();
            // }
        }

        this.monsters.forEach(m => {
            if (m.Health <= 0)
                this.removeMonster(m);
        });

    }

    // Generate a new monster to put on the map. 
    // The position and attributes of this monster are random
    private generateMonster() {
        // console.log("Generating new monster...");
        // generate new marker location
        // let currPos = this.map.getCameraPosition().target;
        let rlat: number = (this.prevPos.lat - this.monsterDistance) + (Math.random() * 2 * this.monsterDistance);
        let rlng: number = (this.prevPos.lng - this.monsterDistance) + (Math.random() * 2 * this.monsterDistance);

        //generate random monster, attach marker
        this.monsterProvider.getMonster().subscribe(data => {

            let monster: Monster = data;

            let marker: Marker = this.map.addMarkerSync({
                title: monster.Title.monsterTitleText + " " + monster.Name.monsterNameText,
                icon: {
                    url: 'assets/icons/marker_icon.png',
                    // url: monster.Model.monsterModelPath,
                    size: {
                        width: 25,
                        height: 25
                    }
                },
                animation: 'DROP',
                position: {
                    lat: rlat,
                    lng: rlng
                }
            });

            monster.Marker = marker;
            this.monsters.push(monster);
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                // console.log("Fighting: " + JSON.stringify(monster));
                this.launchFight(monster);
            });
        });
    }

    // Removes a monster from the map and list. This should be 
    // called whenever a monster has been defeated or timed out.
    // PARAM: monster: The monster to remove from the map and list
    private removeMonster(monster: Monster) {
        if (!monster)
            return;

        console.log("Removing monster from the list: " + monster.Name);
        monster.Marker.remove();
        this.monsters.splice(this.monsters.indexOf(monster), 1);
    }

    // Navigate to the combat screen in order to fight the monster
    // PARAM: monster: The Monster to start combat with
    private launchFight(monster: Monster) {
        this.resetGeo();
        let combatModal = this.modalCtrl.create(
            CombatPage,
            { monster: monster }
        )
        combatModal.present();
    }

    // Stops the subscription on watchPosition.
    // This should be called when cleaning up
    private resetGeo() {
        // this.geoPosWatcher.unsubscribe();
        if (this.geolocation) {
            this.geolocation.watchPosition().subscribe().unsubscribe();
        }
    }

    // Present the inventory panel
    public presentInventory() {
        let inventoryModal = this.modalCtrl.create(InventoryPage);
        inventoryModal.present();
    }

    // Present landmark information
    private presentLandmark(landmark: Landmark) {
        console.log('Opening landmark page');
        console.log(landmark);
        this.navCtrl.push(
            LandmarkPage,
            { landmark: landmark }
        );
    }
}
