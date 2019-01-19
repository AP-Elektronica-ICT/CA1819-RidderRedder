import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Knight } from '../../models/Knight'
import { PlayerProvider } from '../../providers/player/PlayerProvider';
import { InventoryItem } from '../../models/InventoryItem';
import { InventoryProvider } from '../../providers/inventory/InventoryProvider';

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

    private inventoryItems: InventoryItem[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider, private invProvider: InventoryProvider) {
        this.loadInventory();
    }

    /*
     *  Loads all inventory items from the API thats linked to the currently logged in user.
     */
    private loadInventory() {
        this.invProvider.getInventory().subscribe(data => {
            this.inventoryItems = data;
        }, error => {
            console.log(error);
        });
    }

    /*
     *  This function should be called in order to return to the previously opened tab. 
     *  Normally this should return to the home/navigation page.
     */
    private returnView() {
        this.navCtrl.pop();
    }

}
