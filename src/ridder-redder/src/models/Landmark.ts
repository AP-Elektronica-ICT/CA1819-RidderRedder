import { Marker } from '@ionic-native/google-maps';
import { Knight } from './Knight'
export class Landmark {
  id: number;
  name: string;
  lat;
  lng;
  marker: Marker;
  knights: Array<Knight>;
  ownerId: string;
  ownerName: string;

  constructor(id:number, name: string, lat, lng, ownerId: string, ownerName: string){
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.knights = new Array<Knight>();
    this.ownerId = ownerId;
    this.ownerName = ownerName;
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
