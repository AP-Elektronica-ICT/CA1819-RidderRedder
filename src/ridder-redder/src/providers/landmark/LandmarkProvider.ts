import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';
import { AuthProvider } from '../auth/AuthProvider'';
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

    constructor(public http: HttpClient, public auth: AuthProvider) {
        console.log('Hello LandmarkProvider Provider');

    }

    getLandmarks():Observable<Array<Landmark>>{
        console.log('in getLandmarks');
        console.log(this.queryUrl);
        console.log(this.httpOptions);
        return this.http.get<Array<Landmark>>(this.queryUrl, this.httpOptions)
    }

    addKnight(landmark: Landmark, knight: Knight):Observable<Landmark> {
        if(landmark.knights){
            landmark.knights.push(knight);
        }
        else{
            landmark.knights = [knight];
            landmark.ownerId = this.auth.authId;
        }
        return this.http.post<Landmark>(this.queryUrl + landmark.id, landmark, this.httpOptions);
    }
}
