import { Marker } from '@ionic-native/google-maps';
import { Knight } from './Knight'
import { Player } from './Player'
export class Landmark {
  landmarkId: number;
  name: string;
  lat;
  lng;
  marker: Marker;
  knights: Array<Knight>;
  owner: string;

  constructor(landmarkId:number, name: string, lat, lng, owner: string){
    this.landmarkId = landmarkId;
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.knights = new Array<Knight>();
    this.owner = owner;
  }

  getKnights(){
    return this.knights;
  }

  killKnight(){
    this.knights.shift();
  }

  addKnight(newknight: Knight){
    this.knights.push(newknight);
 }
}
