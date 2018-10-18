import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Monster } from '../../models/Monster';

/**
 * Generated class for the CombatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-combat',
    templateUrl: 'combat.html',
})
export class CombatPage {

    private monster1: Monster;
    private numbers;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CombatPage');
    }

    difficulty(n: number): any[] {
        return Array(n);
    }

}
