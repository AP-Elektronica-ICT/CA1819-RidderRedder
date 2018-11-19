import { Marker } from '@ionic-native/google-maps';
import { Knight } from './Knight'
export class Landmark {
  id: number;
  name: string;
  lat;
  lng;
  marker: Marker;
  knights: Array<Knight>;

  constructor(iid:number, iname: string, ilat, ilng){
    this.name = iname;
    this.lat = ilat;
    this.lng = ilng;
    this.knights = new Array<Knight>();
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
