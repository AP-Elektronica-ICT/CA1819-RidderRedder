import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Monster } from '../../models/Monster';
import { CombatState } from '../../models/CombatState';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Combat } from '../../models/Combat';
import { Player } from '../../models/Player';
import { MonsterDto } from '../../dtos/MonsterDto';

import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MonsterProvider } from '../../providers/monster/MonsterProvider';

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
        private deviceMotion: DeviceMotion,
        private speech: SpeechRecognition,
        private monsterProvider: MonsterProvider
    ) {

        var options = {
            frequency: 100
        }


        this.player = {
            AuthId: "",
            Experience: 0,
            Health: 250,
            MaxHealth: 250,
            PlayerName: "Hans"
        }


        this.monsterProvider.getMonster().subscribe(data => {
            let m: MonsterDto = data;
            this.monster = {
                MonsterId: m.monsterId,
                Model: m.monsterModel,
                Name: m.monsterName,
                Title: m.monsterTitle,
                Difficulty: Math.floor(Math.random() * 4) + 1,
                Level: 1,
                Health: 250,
                MaxHealth: 500,
                Marker: null
            }


            this.combat = new Combat(this, this.monster, this.player, this.deviceMotion, this.speech);

            this.setInfo();

        }, error => {
            console.log(error);
        });

       

        // Check feature available
        this.speech.isRecognitionAvailable().then((available: boolean) => {
            console.log("Speech recognition available: " + available);
            // Request permissions
            // Check permission
            this.speech.hasPermission()
                .then((hasPermission: boolean) => {
                    if (!hasPermission)
                        this.speech.requestPermission()
                            .then(
                                () => console.log('Granted'),
                                () => console.log('Denied')
                            )
                });

        })





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
                this.infoParagraph = this.combat.monster.Health < this.combat.monster.MaxHealth ? "Tap below to cast another spell!" : "Speak up! Call out this spell to deal damage";
                break;
            case CombatState.CombatVictory:
                this.infoHead = "Victory!"
                this.infoParagraph = `You have defeated the monster!\nYou have gained ${this.combat.experienceGained} experience!`;
                break;
            case CombatState.CombatDefeat:
                this.infoHead = "Defeat!"
                this.infoParagraph = "You have been defeated by the monster!";
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
