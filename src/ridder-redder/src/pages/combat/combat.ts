import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { Monster } from '../../models/Monster';
import { CombatState } from '../../models/CombatState';

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

    private combatState: CombatState = CombatState.ChoosingCombatStyle;
    private infoHead: string;
    private infoParagraph: string;

    private timer: number;
    private maxTime: number;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.monster = navParams.get("monster");
      //{
      //      Difficulty: Math.floor(Math.random() * 4) + 1,
      //      Level: 5,
      //      Model: {
      //          MonsterModelId: 1,
      //          MonsterModelPath: ""
      //      },
      //      Name: {
      //          MonsterName: "Charles",
      //          MonsterNameId: 1
      //      },
      //      Title: {
      //          MonsterTitle: "Baron ",
      //          MonsterTitleId: 1
      //      }
      //  }
        this.setInfo();

        this.maxTime = 120 / this.monster.Difficulty;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CombatPage');
    }

    difficulty(n: number): any[] {
        return Array(n);
    }

    setInfo() {
        switch (this.combatState) {
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

    startCombat() {
        console.log("Player has selected combat style, starting combat");
        this.startTimer();
    }

    selectCombatStyle(e) {
        switch (e.path[0].id) {
            case "img-sword":
                this.combatState = CombatState.CombatMelee;
                break;
            case "img-bow":
                this.combatState = CombatState.CombatRanged;
                break;
            case "img-wand":
                this.combatState = CombatState.CombatMagic;
                break;
        }
        this.setInfo();
        this.startCombat();
    }

    startTimer() {
        this.timer = setTimeout(x => {
            if (this.maxTime <= 0) {
                
            }
            this.maxTime -= 1;

            if (this.maxTime > 0) {
                this.startTimer();
            }

        }, 1000);

    }

}
