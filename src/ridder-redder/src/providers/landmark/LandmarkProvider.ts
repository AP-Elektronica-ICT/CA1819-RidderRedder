import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';
import { PlayerProvider } from '../player/PlayerProvider';
/*
  Generated class for the LandmarkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
 */
@Injectable()
export class LandmarkProvider {
    queryUrl = "/landmark/";
    httpOptions = { headers: 
        new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(public http: HttpClient, public pProv: PlayerProvider) {
        console.log('Hello LandmarkProvider Provider');

    }

    getLandmark(landmarkId: number):Observable<Landmark>{
        console.log("get landmark");
        return this.http.get<Landmark>(this.queryUrl + landmarkId, this.httpOptions)
        .map((landmark) => {
            console.log("got landmark");
            console.log(landmark);
            return landmark;
    }
    
    getLandmarks():Observable<Array<Landmark>>{
        console.log('in getLandmarks');
        console.log(this.queryUrl);
        console.log(this.httpOptions);
        return this.http.get<Array<Landmark>>(this.queryUrl, this.httpOptions)
        .map((landmarks) => {
            console.log("got landmarks");
            console.log(landmarks);
            return landmarks;
        });
    }

    addKnight(landmark: Landmark, knight: Knight):Observable<Landmark> {
        if(landmark.knights){
            landmark.knights.push(knight);
        }
        else{
            landmark.knights = [knight];
            landmark.owner = this.pProv.player.AuthId;
        }
        console.log("making http post for landmark");
        console.log(this.queryUrl + landmark.landmarkId);
        console.log(landmark);
        console.log(this.httpOptions);
        return this.http.post<Landmark>(this.queryUrl + landmark.landmarkId, landmark, this.httpOptions);
    }

    killKnight(landmark: Landmark):Observable<Landmark> {
        console.log("killing knight on landmark");
        console.log(landmark);
        console.log(JSON.stringify(landmark));
        let tmp = JSON.parse(JSON.stringify(landmark));
        tmp.marker = undefined;
        console.log(JSON.stringify(tmp));
        return this.http.post<Landmark>(this.queryUrl + "/kill/" + landmark.landmarkId, tmp, this.httpOptions)
        .map(lm => {
            console.log("killKnight, got reply");
            console.log(lm);
            return lm;
        });
    }
}
