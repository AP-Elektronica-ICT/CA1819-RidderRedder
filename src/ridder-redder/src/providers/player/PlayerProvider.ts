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
    Inventory: Array<Knight>;

    constructor(public http: HttpClient, private auth: AuthProvider) {
        // connect to server, get data
        this.getPlayer(auth.AuthId).subscribe(data => {
            this.player = data;
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

    public newPlayer(player: PlayerDto): Observable<Player> {
        return this.http.post<PlayerDto>(`/player`, player).map(data=> {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId
            };
            this.player = p;
            return p;
        })
    }

    public getPlayer(authid: string): Observable<Player> {
        return this.http.get<PlayerDto>(`/player/${authid}`).map(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId
            };
            this.player = p;
            return p;
        });
    }

    public updatePlayer(p: Player): Observable<Player> {
        let playerDto: PlayerDto = {
            authId: p.AuthId,
            experience: parseInt(p.Experience.toFixed(0)),
            playerName: p.PlayerName
        }
        console.log(playerDto);

        return this.http.put<PlayerDto>(`/player/${this.auth.AuthId}`, playerDto).map(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId,
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
