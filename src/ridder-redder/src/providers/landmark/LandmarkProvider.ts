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

    constructor(public http: HttpClient, public pProv: PlayerProvider) {

    }

    // Get a specific landmark from the API
    // PARAM: landmarkId: the Id of the landmark to get
    // RETURNS: Observable<Landmark>
    getLandmark(landmarkId: number):Observable<Landmark>{
        return this.http.get<Landmark>(this.queryUrl + landmarkId);
    }

    // Get all the landmarks from the API
    // PARAM: none
    // RETURNS: Observable<Landmark[]>
    getLandmarks():Observable<Array<Landmark>>{
        return this.http.get<Array<Landmark>>(this.queryUrl);
    }

    // Add a knight, or knights to the given landmark
    // PARAMS: landmark: The landmark to update it's knights, 
    //         knight: The knight to add to the landmark
    // RETURNS: Observable<Landmark>
    addKnight(landmark: Landmark, knight: Knight):Observable<Landmark> {
        if(landmark.knights){
            landmark.knights.push(knight);
        }
        else{
            landmark.knights = [knight];
            landmark.owner = this.pProv.player.AuthId;
        }
        return this.http.post<Landmark>(this.queryUrl + landmark.landmarkId, landmark);
    }

    // Kill a knight defending the landmark
    // PARAM: landmark: The landmark to kill the knight from
    // RETURNS: Observable<Landmark>
    killKnight(landmark: Landmark):Observable<Landmark> {
        let tmp = JSON.parse(JSON.stringify(landmark));
        tmp.marker = undefined;
        return this.http.post<Landmark>(this.queryUrl + "kill/" + landmark.landmarkId, tmp);
    }

}
