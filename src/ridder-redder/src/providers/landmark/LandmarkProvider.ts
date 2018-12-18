import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';


/*
  Generated class for the LandmarkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LandmarkProvider {
  landmarks: Array<Landmark>;

  constructor(public http: HttpClient) {
    console.log('Hello LandmarkProvider Provider');
    // connect to server, fetch all landmarks

    this.landmarks = new Array<Landmark>();
    this.landmarks.push(new Landmark(0, "Campus ELL", 51.230322, 4.416155, null, null));
    this.landmarks.push(new Landmark(1, "Campus NOO", 51.230309, 4.413604, "admin", "adminName"));
    this.landmarks[1].addKnight(new Knight(0, "admin", "red", 14));
    this.landmarks.push(new Landmark(2, "Bar Noord", 21.230944, 4.422794, "notadmin", "notadminName"));
    this.landmarks[2].addKnight(new Knight(1, "notadmin", "blue", 18));
    this.landmarks.push(new Landmark(3, "Maria met kind", 51.227181, 4.454838, null, null));
  }

  getLandmarks():Array<Landmark>{
    return this.landmarks;
  }

  addKnight(landmark: Landmark, knight: Knight):Landmark {
    //TODO push to DB
    return landmark;
  }
}