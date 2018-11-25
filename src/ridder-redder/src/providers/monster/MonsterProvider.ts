import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monster } from '../../models/Monster';
import { Observable } from "rxjs/Observable";
import { AuthProvider } from '../auth/AuthProvider';
import { MonsterDto } from '../../dtos/MonsterDto';

/*
  Generated class for the MonsterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonsterProvider {

    private baseUrl = "http://192.168.11.30:5000/api/v1";
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${this.auth.access_token}`
        })
    }

    constructor(public http: HttpClient, private auth: AuthProvider) {
        console.log('Hello MonsterProvider Provider');
    }
    
    public getMonster(): Observable<MonsterDto> {
        let queryString = this.baseUrl;
        queryString += "/Monster"

        return this.http.get<MonsterDto>(queryString, this.httpOptions);
    }

    public getMonsters(count: number): Observable<MonsterDto[]> {
        let queryString = this.baseUrl;
        queryString += "/Monster/" + count;

        return this.http.get<MonsterDto[]>(queryString, this.httpOptions);
    }
}
