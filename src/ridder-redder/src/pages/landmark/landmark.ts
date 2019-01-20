import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';
import { InventoryItem } from '../../models/InventoryItem';
import { PlayerProvider } from '../../providers/player/PlayerProvider';
import { LandmarkProvider } from '../../providers/landmark/LandmarkProvider';
import { AuthProvider } from '../../providers/auth/AuthProvider';
import { InventoryProvider } from '../../providers/inventory/InventoryProvider';
/**
 * Generated class for the LandmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-landmark',
    templateUrl: 'landmark.html',
})
export class LandmarkPage {
    @Input() landmark: Landmark;
    pId: string;
    inventory: Array<InventoryItem>;
    knights: Array<Knight>;
    ownerName: string;
    neutral: boolean;
    friendly: boolean;
    enemy: boolean;
    loading: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public pProv: PlayerProvider, public lmProvider: LandmarkProvider, public authProvider: AuthProvider, public iProvider: InventoryProvider) {
        this.loading = true;
        this.pId = authProvider.AuthId;
        this.landmark = this.navParams.get('landmark');
        if (!this.landmark.owner || (this.landmark.owner == null)){
            this.neutral = true;
            this.friendly = false;
            this.enemy = false;
        }
        else if (this.landmark.owner == pId){ //TODO
            this.neutral = false;
            this.friendly = true;
            this.enemy = false;
        }
        else {
            this.neutral = false;
            this.friendly = false;
            this.enemy = true;
        }
        this.iProvider.getInventory()
            .subscribe((inv) => {
                console.log("got inventory");
                console.log(inv);
                this.inventory = inv;
                this.loading = false;
            });
        if(this.enemy || this.friendly){
            pProv.getPlayer(landmark.owner).subscribe(
                p => {
                    this.ownerName = p.PlayerName;
                };)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LandmarkPage');
        console.log(this.landmark);
    }

    addItem(item: InventoryItem){
        //tell landmark provider to add knight to landmark
        console.log("adding knight to landmark:");
        console.log(item);
        console.log(this.landmark);
        this.loading = true;
        this.iProvider.transferItemToLandmark(item, 1, this.landmark).subscribe((landmark) => {
            this.landmark = landmark;
            this.loading = false;
        });
    }
}
