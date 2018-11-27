import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Knight } from '../../models/Knight';
/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerProvider {

  id: string;
  name: string;
  inventory: Array<Knight>;

  constructor(public http: HttpClient) {
    // connect to server, get data
    this.id = "1";
    this.name = "Frank";
    this.inventory = new Array<Knight>(); 
    this.inventory.push({id: 210, owner: this.id, colour: "red", level: 4});
    this.inventory.push({id: 211, owner: this.id, colour: "blue", level: 6});
    this.inventory.push({id: 212, owner: this.id, colour: "black", level: 2});
    this.inventory.push({id: 213, owner: this.id, colour: "red", level: 5});
  }
  
  getInventory() {
   return this.inventory; 
  }

  // fetch player name from server
  getNameById(id: string){
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
