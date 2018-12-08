import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Knight } from '../../models/Knight';
import { Player } from '../../models/Player';
import { Observable } from 'rxjs';
import { AuthProvider } from '../auth/AuthProvider';
import { query } from '@angular/core/src/render3/instructions';
import { PlayerDto } from '../../dtos/PlayerDto';
import { RootUrl } from '../RootUrl'; 

/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
 */
@Injectable()
export class PlayerProvider {

    // private baseUrl = "http://192.168.11.30:5000/api/v1";
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
        console.log("Hello PlayerProvider");
        this.GetPlayer(auth.AuthId).subscribe(player => {
            this.player = player;
        }, error => {
            console.log(error);
        });

        this.Inventory = new Array<Knight>();
        this.Inventory.push({id: 0, colour: "red", level: 4 , owner: "admin"});
        this.Inventory.push({id: 1, colour: "blue", level: 6, owner: "admin"});
        this.Inventory.push({id: 2, colour: "black", level: 2, owner: "admin"});
        this.Inventory.push({id: 3,  colour: "red", level: 5, owner: "admin"});
    }

    getInventory() {
        return this.Inventory;
    }

    public GetPlayer(authid: string): Observable<Player> {
        let queryString = RootUrl;
        queryString += "Player/";
        queryString += authid;

        return this.http.get<PlayerDto>(queryString, this.httpOptions).map(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId,
                Health: 500,
                MaxHealth: 500
            };
            return p;
        });
    }

    public UpdatePlayer(p: Player): Observable<Player> {
        let queryString = RootUrl;
        queryString += "Player/";
        queryString +=  this.auth.AuthId;

        let playerDto: PlayerDto = {
            authId: p.AuthId,
            experience: parseInt(p.Experience.toFixed(0)),
            playerName: p.PlayerName
        }
        console.log(playerDto);

        return this.http.put<PlayerDto>(queryString, playerDto, this.httpOptions).map(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId,
                Health: 500,
                MaxHealth: 500
            };
            return p;
        });
    }

    public getNameById(id: string){
        if(!id){
            return null;
        }
        if(id == "1"){
            return "Frank"
        }
        else{
            return "John"
        }
    }
}
