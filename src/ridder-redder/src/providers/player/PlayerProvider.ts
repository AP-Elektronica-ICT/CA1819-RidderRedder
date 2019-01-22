import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Knight } from '../../models/Knight';
import { Player } from '../../models/Player';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
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

    public player: Player;
    //Inventory: Array<Knight>;

    // We immediately load the player from the API thats connected
    // with the logged in user his AuthID.
    constructor(public http: HttpClient, private auth: AuthProvider) {
        // connect to server, get data
        this.getPlayer(auth.AuthId).subscribe(data => {
            this.player = data;
        }, error => {
            console.log(error);
        });

        /* this.Inventory = new Array<Knight>();
        this.Inventory.push({id: 0, colour: "red", level: 4 , owner: "admin"});
        this.Inventory.push({id: 1, colour: "blue", level: 6, owner: "admin"});
        this.Inventory.push({id: 2, colour: "black", level: 2, owner: "admin"});
        this.Inventory.push({id: 3,  colour: "red", level: 5, owner: "admin"});*/
    }

    //getInventory() {
    //  return this.Inventory;
    //}

    // Create a new player to store in the API's database
    // This gets called whenever a new user logs in to the game
    // PARAM: player: The PlayerDto that stores the player's data
    // RETURNS: Observable<Player>
    public newPlayer(player: PlayerDto): Observable<Player> {
        return this.http.post<PlayerDto>(`/player`, player).map(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId
            };
            this.player = p;
            return p;
        })
    }

    // Gets an existing player from the API by authid
    // PARAM: authid: The AuthID of the used were trying to fetch
    // RETURNS: Observable<Player>
    public getPlayer(authid: string): Observable<Player> {
        return this.http.get<PlayerDto>(`/player/${authid}`).map(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId
            };
            //this.player = p;
            return p;
        });
    }

    // Updates the given user. Data updates can be included
    // in the player (p) object.
    // PARAM: p: The player to update
    // RETURNS: Observable<Player>
    public updatePlayer(p: Player): Observable<Player> {
        let playerDto: PlayerDto = {
            authId: p.AuthId,
            experience: parseInt(p.Experience.toFixed(0)),
            playerName: p.PlayerName
        }

        return this.http.put<PlayerDto>(`/player/${this.auth.AuthId}`, playerDto).map(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId,
            };
            return p;
        });
    }
}
