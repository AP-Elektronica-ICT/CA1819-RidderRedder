import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monster } from '../../models/Monster';
import { Observable } from "rxjs/Observable";
import { AuthProvider } from '../auth/AuthProvider';
import { MonsterDto } from '../../dtos/MonsterDto';
import { RootUrl } from '../RootUrl';
/*
  Generated class for the MonsterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonsterProvider {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${this.auth.access_token}`
        })
    }

    constructor(public http: HttpClient, private auth: AuthProvider) {
        console.log('Hello MonsterProvider Provider');
    }

    public getMonster(): Observable<Monster> {
        let queryString = RootUrl;
        queryString += "monster"

        return this.http.get<MonsterDto>(queryString, this.httpOptions).map(m => {
            let monster = {
                MonsterId: m.monsterId,
                Model: m.monsterModel,
                Name: m.monsterName,
                Title: m.monsterTitle,
                Difficulty: Math.floor(Math.random() * 4) + 1,
                Level: 1,
                Health: 250,
                MaxHealth: 250,
                Marker: null
            }
            console.log(monster);
            return monster;
        });
    }

    public getMonsters(count: number): Observable<MonsterDto[]> {
        let queryString = RootUrl;
        queryString += "Monster/" + count;

        return this.http.get<MonsterDto[]>(queryString, this.httpOptions);
    }
}
