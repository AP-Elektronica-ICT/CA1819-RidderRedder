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

  Id: number;
  Name: string;
  Inventory: Array<Knight>;

  constructor(public http: HttpClient) {
    // connect to server, get data
    this.Id = 1;
    this.Name = "Frank";
    this.Inventory = new Array<Knight>(); 
    this.Inventory.push({colour: "red", level: 4});
    this.Inventory.push({colour: "blue", level: 6});
    this.Inventory.push({colour: "black", level: 2});
    this.Inventory.push({colour: "red", level: 5});
  }
  
  getInventory() {
   return this.Inventory; 
  }
}
