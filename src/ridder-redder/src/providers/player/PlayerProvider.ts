import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Knight } from '../../models/Knight';
import { Player } from '../../models/Player';
import { Observable } from 'rxjs';
import { AuthProvider } from '../auth/AuthProvider';
import { query } from '@angular/core/src/render3/instructions';
import { PlayerDto } from '../../dtos/PlayerDto';
/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerProvider {

    private baseUrl = "http://192.168.11.30:5000/api/v1";
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${this.auth.access_token}`
        })
    }

    private player: Player;

    Inventory: Array<Knight>;

    constructor(public http: HttpClient, private auth: AuthProvider) {
        // connect to server, get data
        this.GetPlayer(auth.AuthId).subscribe(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId,
                Health: 500,
                MaxHealth: 500
            }
            this.player = p;
        }, error => {
            console.log(error);
        });

        this.Inventory = new Array<Knight>();
        this.Inventory.push({ colour: "red", level: 4 });
        this.Inventory.push({ colour: "blue", level: 6 });
        this.Inventory.push({ colour: "black", level: 2 });
        this.Inventory.push({ colour: "red", level: 5 });
    }

    getInventory() {
        return this.Inventory;
    }

    public GetPlayer(authid: string): Observable<PlayerDto> {
        let queryString = this.baseUrl;
        queryString += "/Player";
        queryString += "/" + authid;

        return this.http.get<PlayerDto>(queryString, this.httpOptions);
    }

    public UpdatePlayer(p: Player): Observable<PlayerDto> {
        let queryString = this.baseUrl;
        queryString += "/Player";
        queryString += "/" + this.auth.AuthId;

        let playerDto: PlayerDto = {
            authId: p.AuthId,
            experience: p.Experience,
            playerName: p.PlayerName
        }
        
        return this.http.put<PlayerDto>(queryString, playerDto, this.httpOptions);
    }
}
