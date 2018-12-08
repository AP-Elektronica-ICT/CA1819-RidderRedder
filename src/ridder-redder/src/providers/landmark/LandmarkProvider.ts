import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';


/*
  Generated class for the LandmarkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LandmarkProvider {
  queryUrl = "http://192.168.1.52:5000/api/v1/landmark/";
  httpOptions = { headers: 
    new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(public http: HttpClient) {
    console.log('Hello LandmarkProvider Provider');

  }

  getLandmarks():Observable<Array<Landmark>>{
    return this.http.get<Array<Landmark>>(this.queryUrl, this.httpOptions)
  }

  addKnight(landmark: Landmark, knight: Knight):Observable<Landmark> {
    landmark.knights.push(knight);
    return this.http.post<Landmark>(this.queryUrl + landmark.id, landmark, this.httpOptions);
  }
}
