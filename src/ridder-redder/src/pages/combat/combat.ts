import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

import { MonsterProvider } from '../../providers/monster/MonsterProvider';
import { PlayerProvider } from '../../providers/player/PlayerProvider';
import { AuthProvider } from '../../providers/auth/AuthProvider';
import { LandmarkProvider } from "../../providers/landmark/LandmarkProvider";

import { LandmarkPage } from "../landmark/landmark";

import { Combat } from '../../models/Combat';
import { Player } from '../../models/Player';
import { Monster } from '../../models/Monster';
import { CombatState } from '../../models/CombatState';

import { MonsterDto } from '../../dtos/MonsterDto';
import { InventoryProvider } from '../../providers/inventory/InventoryProvider';
import { Geolocation } from '@ionic-native/geolocation';

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
    @Input() lmPage?: LandmarkPage;
    @ViewChild('monsterObject') monsterObject: ElementRef;

    private combat: Combat;

    private infoHead: string;
    private infoParagraph: string;

    public loading: boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private deviceMotion: DeviceMotion,
        private speech: SpeechRecognition,
        private monsterProvider: MonsterProvider,
        private playerProvider: PlayerProvider,
        private authProvider: AuthProvider,
        private invProvider: InventoryProvider,
        private geolocation: Geolocation,
        private lmProvider: LandmarkProvider
    ) {
        this.setMonster();
    }

    /*
     * Load the player from the API thats assigned to the current logged in user his AuthID
     * When the player is loaded, we load the combat based on the given player and the 
     * monster received from the navigation parameters.
     * When the combat is loaded we the speech recognition.
     */
    private loadPlayer() {
        this.playerProvider.getPlayer(this.authProvider.AuthId).subscribe(data => {
            let p: Player = {
                PlayerName: data.PlayerName,
                Experience: data.Experience,
                AuthId: data.AuthId
            }

            this.loadCombat(p, this.monster);

            this.loadSpeech();
            // this.loadMonster(p);

            this.loading = false;
        }, failed => {
            console.log(failed);
            this.loading = false;
        })
    }

    /*
     * Load an instance of Combat in order to start the battle between the Player and Monster(s)
     * PARAM player: The player that should be fighting with the monster(s)
     * PARAM monster: The monster that should be fighting the player
     */
    private loadCombat(player: Player, monster: Monster) {
        this.lmPage = this.navParams.get('lmPage');
        this.combat = new Combat(this, monster, player, this.deviceMotion, this.speech, this.playerProvider, this.monsterProvider, this.authProvider, this.invProvider, this.lmProvider, this.lmPage);
        this.setInfo();
    }

    /*
     *  Check if monster is set in navigation parameters. 
     *  If monster is set, we save it in a class variable, 
     *  if it is not set, we get a new monster.
     */
    private setMonster() {
        if (this.navParams.get('monster')){
            this.monster = this.navParams.get('monster');
            this.loadPlayer();
        } else {
            this.monsterProvider.getMonster().subscribe((data) => {
                this.monster = data;
                this.loadPlayer();
            }, error => {
                console.log(error);
            });
        }
    }

    /*
     * Load a random monster.
     * This function can be used for statically loading a new monster,
     * when the monster is not provided by the navigation parameters.
     */
    private loadMonster(player: Player) {
        this.monsterProvider.getMonster().subscribe(data => {
            this.monster = data;
            this.combat = new Combat(this, this.monster, player, this.deviceMotion, this.speech, this.playerProvider, this.monsterProvider, this.authProvider, this.invProvider, this.lmProvider);

            this.setInfo();
            this.loadSpeech();

        }, error => {
            console.log(error);
        });
    }

    /* 
     * Check if speech recognition is available on device and load it if it is available
     */
    private loadSpeech() {
        // Check feature available
        this.speech.isRecognitionAvailable().then((available: boolean) => {
            // console.log("Speech recognition available: " + available);
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

    /* 
     * Generate random difficulty
     * PARAM n: difficulty range (n = 4 is a difficulty from 0 to 4)
     */
    private difficulty(n: number): any[] {
        return Array(n);
    }

    /* 
     * Set content of info container based on combatState
     */
    public setInfo() {
        // console.log("Setting info");
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
                this.infoParagraph = "Total experience: " + this.combat.player.Experience;
                // this.infoParagraph = `You have defeated the monster!\nYou have gained ${this.combat.experienceGained} experience!`;
                break;
            case CombatState.CombatDefeat:
                this.infoHead = "Defeat!"
                this.infoParagraph = "Total experience: " + this.combat.player.Experience;
                // this.infoParagraph = "You have been defeated by the monster!";
                break;
        }
    }

}
