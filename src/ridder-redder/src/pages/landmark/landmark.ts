import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Landmark } from '../../models/Landmark';
import { Knight } from '../../models/Knight';
import { PlayerProvider } from '../../providers/player/PlayerProvider';
import { LandmarkProvider } from '../../providers/landmark/LandmarkProvider';
import { AuthProvider } from '../../providers/auth/AuthProvider';
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
  knights: Array<Knight>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pProv: PlayerProvider, public lmProvider: LandmarkProvider, public authProvider: AuthProvider) {
    this.pId = authProvider.AuthId;
    this.knights = this.pProv.getInventory();
    this.landmark = this.navParams.get('landmark');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandmarkPage');
  }

  addKnight(knight: Knight){
    //tell landmark provider to add knight to landmark
    console.log("adding knight to landmark:");
    console.log(knight);
    console.log(this.landmark);
    this.landmark = this.lmProvider.addKnight(this.landmark, knight);
    this.refreshPage();
  }

  refreshPage(){
    console.log("refreshing landmark page");
  }
}
