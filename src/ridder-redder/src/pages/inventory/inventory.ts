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
    Knights: Array<Knight>;

    private inventoryItems: InventoryItem[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider, private invProvider: InventoryProvider) {
        this.Knights = playerProvider.getInventory();

        invProvider.getInventory().subscribe(data => {
            this.inventoryItems = data;
        });

        console.log(this.Knights);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InventoryPage');
    }

    returnView() {
        this.navCtrl.pop();
    }

}
