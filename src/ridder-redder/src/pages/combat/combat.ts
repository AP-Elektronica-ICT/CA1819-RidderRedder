import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Monster } from '../../models/Monster';
import { CombatState } from '../../models/CombatState';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Combat } from '../../models/Combat';
import { Player } from '../../models/Player';

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

    @Input() monster: Monster;
    private player: Player;

    private combat: Combat;

    private infoHead: string;
    private infoParagraph: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private deviceMotion: DeviceMotion
    ) {

        var options = {
            frequency: 100
        }





        this.monster = {
            Difficulty: Math.floor(Math.random() * 4) + 1,
            Level: 5,
            Model: {
                MonsterModelId: 1,
                MonsterModelPath: ""
            },
            Name: {
                MonsterName: "Charles",
                MonsterNameId: 1
            },
            Title: {
                MonsterTitle: "Baron ",
                MonsterTitleId: 1
            },
            Health: 250,
            MaxHealth: 250
        }

        this.player = {
            AuthId: "",
            Experience: 0,
            Health: 250,
            MaxHealth: 250,
            PlayerName: "Hans"
        }

        this.combat = new Combat(this.monster, this.player, this.deviceMotion);

        this.setInfo();


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CombatPage');
    }

    difficulty(n: number): any[] {
        return Array(n);
    }

    setInfo() {
        switch (this.combat.combatState) {
            case CombatState.ChoosingCombatStyle:
                this.infoHead = "Battle time!";
                this.infoParagraph = "Choose a combat style to start the fight";
                break;
            case CombatState.CombatMelee:
                this.infoHead = "Slash him!";
                this.infoParagraph = "Slash your phone towards the monster to damage him";
                break;
            case CombatState.CombatRanged:
                this.infoHead = "Shoot him!"
                this.infoParagraph = "Aim and drag the bow to shoot";
                break;
            case CombatState.CombatMagic:
                this.infoHead = "Hocus Pocus"; //Replace with magic spell
                this.infoParagraph = "Speak up! Call out this spell to deal damage";
                break;
        }
    }

    damageMonster() {
        this.combat.hitMonster();
    }

    damagePlayer() {
        this.combat.hitPlayer();
    }

    forfeit() {
        this.combat.stopCombat();
    }



}
