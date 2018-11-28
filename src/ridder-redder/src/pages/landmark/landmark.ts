import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';
import { PlayerProvider } from '../../providers/player/player';
import { LandmarkProvider } from '../../providers/landmark/landmark';
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
  ownerName: string;
  pId: string;
  knights: Array<Knight>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pProv: PlayerProvider, public lmProvider: LandmarkProvider) {
    this.pId = pProv.id;
    this.knights = this.pProv.getInventory();
    this.landmark = this.navParams.get('landmark');
    this.ownerName = pProv.getNameById(this.landmark.owner);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandmarkPage');
  }

  addKnight(knight: Knight){
    //tell landmark provider to add knight to landmark
    console.log("adding knight to landmark:");
    console.log(knight);
    consola.log(this.landmark);
    landmark = lmProvider.addKnight(this.landmark, knight);
    this.refreshPage();
  }

  refreshPage(){
    console.log("refreshing landmark page");
  }
}
