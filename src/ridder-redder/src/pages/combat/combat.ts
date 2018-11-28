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
import { PlayerProvider } from '../../providers/player/PlayerProvider';
import { AuthProvider } from '../../providers/auth/AuthProvider';

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

    private combat: Combat;

    private infoHead: string;
    private infoParagraph: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private deviceMotion: DeviceMotion,
        private speech: SpeechRecognition,
        private monsterProvider: MonsterProvider,
        private playerProvider: PlayerProvider,
        private authProvider: AuthProvider
    ) {

        var options = {
            frequency: 100
        }

        this.loadPlayer();

    }



    private loadPlayer() {
        this.playerProvider.GetPlayer(this.authProvider.AuthId).subscribe(data => {
            let p: Player = {
                PlayerName: data.playerName,
                Experience: data.experience,
                AuthId: data.authId,
                Health: 500,
                MaxHealth: 500
            }

            this.loadMonster(p);

        }, failed => {
            console.log(failed);
        })
    }

    private loadMonster(player: Player) {
        this.monsterProvider.getMonster().subscribe(data => {
            this.monster = data;
        
            this.combat = new Combat(this, this.monster, player, this.deviceMotion, this.speech, this.playerProvider, this.monsterProvider);

            this.setInfo();

            this.loadSpeech();

        }, error => {
            console.log(error);
        });
    }

    private loadSpeech() {
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

        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CombatPage');

    }

    difficulty(n: number): any[] {
        return Array(n);
    }

    setInfo() {
console.log("Setting info");
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
