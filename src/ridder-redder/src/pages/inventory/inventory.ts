import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  Knights: Array<IKnight>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Knights = new Array<IKnight>();
    this.Knights.push({colour: "red", level: 4, name: "john"});
    this.Knights.push({colour: "blue", level: 6, name: "mike"});
    this.Knights.push({colour: "black", level: 2, name: "frank"});
    this.Knights.push({colour: "red", level: 5, name: "elsa"});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

}

export interface IKnight{
  colour: string;
  level: number;
  name: string;
}
