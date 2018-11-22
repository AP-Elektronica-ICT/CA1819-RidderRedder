import { Marker } from "@ionic-native/google-maps";

export class Landmark {
  name: string;
  lat;
  lng;
  marker: Marker;

  constructor(public iname: string, public ilat, public ilng){
    this.name = iname;
    this.lat = ilat;
    this.lng = ilng;
  }
}
