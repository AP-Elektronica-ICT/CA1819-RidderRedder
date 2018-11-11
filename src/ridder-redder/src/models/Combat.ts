import { CombatState } from "./CombatState";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { DeviceMotion, DeviceMotionAccelerationData } from "@ionic-native/device-motion";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { CombatPage } from "../pages/combat/combat";


export class Combat {

    public parent: CombatPage;

    public monster: Monster;
    public player: Player;

    public combatState: CombatState = CombatState.ChoosingCombatStyle;
    public experienceGained: number;

    public timer: number;
    public maxTime: number;
    public inCombat: boolean = false;

    private hitDebounce = 1250;
    private monsterHittable = true;

    private deviceMotion: DeviceMotion;
    private deviceMotionSubscription;

    private speech: SpeechRecognition;
    private speechListener;
    private speechOptions;

    constructor(private parentPage: CombatPage, private m: Monster, private p: Player, private dM: DeviceMotion, private s: SpeechRecognition) {
        this.monster = m;
        this.player = p;
        this.deviceMotion = dM;
        this.speech = s;

        this.parent = parentPage;

        this.speechOptions = {
            showPopup: false
        }

        this.resetTimer();
    }
    startCombat() {
        console.log("Player has selected combat style, starting combat");
        this.startTimer();
    }

    stopCombat() {
        console.log("Combat has been stopped");
        this.inCombat = false;
        this.combatState = CombatState.ChoosingCombatStyle;
        this.player.Health = this.player.MaxHealth;
        this.monster.Health = this.monster.MaxHealth;

        if (this.deviceMotionSubscription)
            this.deviceMotionSubscription.unsubscribe();

        this.parent.setInfo();
        this.resetTimer();
    }

    resetTimer() {
        this.maxTime = 120 / this.monster.Difficulty;
    }

    selectCombatStyle(e) {
        switch (e.path[0].id) {
            case "img-sword":
                this.combatState = CombatState.CombatMelee;
                this.deviceMotionSubscription = this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acc: DeviceMotionAccelerationData) => {
                    /*
                        BETA formula, improve this
                    */
                    let a = Math.sqrt(Math.pow(acc.x, 2) * Math.pow(acc.y, 2) * Math.pow(acc.z, 2));
                    if (a > 250) {
                        this.hitMonster();
                    }
                });
                break;
            case "img-bow":
                this.combatState = CombatState.CombatRanged;
                break;
            case "img-wand":
                this.combatState = CombatState.CombatMagic;
                this.castSpell();
                break;
        }
        this.parent.setInfo();
        this.startCombat();
    }

    startTimer() {
        this.inCombat = true;
        this.timer = setTimeout(x => {
            if (!this.inCombat)
                return;

            if (this.maxTime <= 0) {

            }
            this.maxTime -= 1;

            if (this.maxTime > 0) {
                this.startTimer();
            }

        }, 1000);

    }

    hitMonster() {
        if (this.monsterHittable) {
            console.log("Hitting monster");
            this.monsterHittable = false;
            this.monster.Health -= 50;
            this.checkHealth();
            setTimeout(x => {
                this.monsterHittable = true;
            }, this.hitDebounce);
        }
        this.parent.setInfo();
    }

    interactFooter(event) {
        if (this.combatState === CombatState.CombatMagic)
            this.castSpell();
    }

    castSpell() {
        console.log("Listening for spellcast");
        this.speechListener = this.speech.startListening(this.speechOptions)
            .subscribe(
                (matches: Array<string>) => {
                    console.log(matches);
                    if (matches.indexOf("hocus pocus") > -1) {
                        this.hitMonster();
                    }
                },
                (onerror) => console.log('error:', onerror)
            )
    }

    hitPlayer() {
        this.player.Health -= 50;
        this.checkHealth();
    }

    checkHealth() {
        if (this.monster.Health <= 0) {
            console.log("Monster is defeated");
            this.defeatMonster();
        }
        if (this.player.Health <= 0) {
            console.log("Player is defeated");
            this.defeatedByMonster();
        }
    }

    defeatMonster() {
        this.inCombat = false;
        this.experienceGained = this.monster.Difficulty * 50 + this.maxTime;
        this.player.Experience += this.experienceGained;
        this.combatState = CombatState.CombatVictory;
        this.parent.setInfo();
    }

    defeatedByMonster() {
        this.inCombat = false;
        this.experienceGained = this.monster.Difficulty * 20;
        this.player.Experience += this.experienceGained;
        this.combatState = CombatState.CombatDefeat;
        this.parent.setInfo();
    }

    retry() {
        this.combatState = CombatState.ChoosingCombatStyle;
    }

}