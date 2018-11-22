import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Landmark } from '../../models/Landmark';


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
    this.landmarks.push(new Landmark(0, "Campus ELL", 51.230322, 4.416155, null));
    this.landmarks.push(new Landmark(1, "Campus NOO", 51.230309, 4.413604, 1));
    this.landmarks.push(new Landmark(2, "Bar Noord", 21.230944, 4.422794, 2));
  }

  getLandmarks():Array<Landmark>{
    return this.landmarks;
  }
}
