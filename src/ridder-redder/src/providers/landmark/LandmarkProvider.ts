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
    queryUrl = "/landmark/";

    constructor(public http: HttpClient) { }

    // Get all the landmarks from the API
    // PARAM: none
    // RETURNS: Observable<Landmark[]>
    getLandmarks(): Observable<Array<Landmark>> {
        return this.http.get<Array<Landmark>>(this.queryUrl)
    }

    // Add a knight, or knights to the given landmark
    // PARAMS: landmark: The landmark to update it's knights, 
    //         knight: The knight to add to the landmark
    // RETURNS: Observable<Landmark>
    addKnight(landmark: Landmark, knight: Knight): Observable<Landmark> {
        landmark.knights.push(knight);
        return this.http.post<Landmark>(this.queryUrl + landmark.id, landmark);
    }
}
