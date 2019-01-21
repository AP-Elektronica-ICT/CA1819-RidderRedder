import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';
import { InventoryItem } from '../../models/InventoryItem';
import { PlayerProvider } from '../../providers/player/PlayerProvider';
import { LandmarkProvider } from '../../providers/landmark/LandmarkProvider';
import { AuthProvider } from '../../providers/auth/AuthProvider';
import { InventoryProvider } from '../../providers/inventory/InventoryProvider';
import { CombatPage } from '../combat/combat';
import { HomePage } from '../home/home';

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
    //@Input() home: HomePage; 
    pId: string;
    inventory: Array<InventoryItem>;
    knights: Array<Knight>;
    ownerName: string;
    neutral: boolean;
    friendly: boolean;
    enemy: boolean;
    loading: boolean;
    addKnightsAmount = "";
    showingAddKnightsconfirm = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public pProv: PlayerProvider, public lmProvider: LandmarkProvider, public authProvider: AuthProvider, public iProvider: InventoryProvider, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.loading = true;
        this.pId = authProvider.AuthId;
        this.landmark = this.navParams.get('landmark');
        //this.home = this.navParams.get('home');
        this.updateLandmark
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LandmarkPage');
        console.log(this.landmark);
    }

    ionViewDidEnter() {
        console.log("view did enter landmark")
        this.loading = true;
        this.pId = this.authProvider.AuthId;
        this.landmark = this.navParams.get('landmark');
        this.updateLandmark();
    }

    ionViewWillLeave() {
        console.log("ionViewWillLeave landmark")
        //this.home.ionViewWillEnter();
    }
    updateLandmark() {
        console.log("updating landmark");
        this.loading = true;
        this.lmProvider.getLandmark(this.landmark.landmarkId)
            .subscribe(landmark => {
                console.log("updated landmark");
                console.log(landmark);
                this.knights = this.landmark.knights;
                this.checkLandmarkHostility();
                this.iProvider.getInventory()
                    .subscribe(inv => {
                        console.log("got inventory");
                        console.log(inv);
                        this.inventory = inv;
                        this.loading = false;
                    });
                if (this.enemy || this.friendly) {
                    this.pProv.getPlayer(this.landmark.owner)
                        .subscribe(p => {
                            this.ownerName = p.PlayerName;
                        });
                }
            });
    }

    checkLandmarkHostility() {
        if (!this.landmark.owner || (this.landmark.owner == null)) {
            this.neutral = true;
            this.friendly = false;
            this.enemy = false;
        }
        else if (this.landmark.owner == this.pId) {
            this.neutral = false;
            this.friendly = true;
            this.enemy = false;
        }
        else {
            this.neutral = false;
            this.friendly = false;
            this.enemy = true;
        }
    }



    addKnightsConfirm(item: InventoryItem) {
        console.log("popping knights confirm")
        
        if (!this.showingAddKnightsconfirm) {
            let alert = this.alertCtrl.create({
                title: "Defend landmark",
                subTitle: "How many knights must defend this landmark?",
                inputs: [
                    {
                        name: 'amount',
                        placeholder: 'Amount',
                        value: this.addKnightsAmount
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            this.showingAddKnightsconfirm = false;
                        }
                    },
                    {
                        text: 'Confirm',
                        handler: () => {
                            this.addItem(item);
                            this.showingAddKnightsconfirm = false;
                        }
                    }
                ]
            });
            alert.present();
            this.showingAddKnightsconfirm = true;
        }
        
    }

    addItem(item: InventoryItem) {
        //tell landmark provider to add knight to landmark
        console.log("adding knight to landmark:");
        console.log(item);
        console.log(this.landmark);
        this.loading = true;
        this.iProvider.transferItemToLandmark(item, parseInt(this.addKnightsAmount), this.landmark).subscribe((landmark) => {
            this.landmark = landmark;
            this.knights = landmark.knights;
            this.checkLandmarkHostility();
            this.iProvider.getInventory()
                .subscribe(inventory => {
                    this.inventory = inventory;
                    this.loading = false;
                });
        });
    }

    getImage(knight) {
        return this.iProvider.ItemImages[knight.colour - 1].path;
    }

    fight() {
        console.log("fight yo");
        console.log(this.navCtrl);
        this.navCtrl.push( //let combatModal = this.modalCtrl.create(
            CombatPage,
            {
                monster: {
                    Difficulty: 3,
                    Health: 300,
                    Level: 3,
                    MaxHealth: 300,
                    Model: { monsterModelId: 0, monsterModelPath: this.getImage(this.knights[0]) },
                    MonsterId: 0,
                    Name: { monsterNameId: 0, monsterNameText: "Knight" },
                    Title: { monsterTitleId: 0, monsterTitleText: "Sir" },
                    isKnight: true,
                    landmark: this.landmark
                },
                lmPage: this
            }
        )
        //combatModal.present();
    }
}
