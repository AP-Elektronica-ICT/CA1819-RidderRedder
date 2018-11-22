import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Knight } from '../../models/Knight'
import { PlayerProvider } from '../../providers/player/player';

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
  Knights: Array<Knight>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider) {
    this.Knights = playerProvider.getInventory();
    console.log(this.Knights);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

}
