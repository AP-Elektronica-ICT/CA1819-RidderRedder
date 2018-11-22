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
    public MAXTIME: number;

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
        document.getElementById("playerbar").style.backgroundSize = "100% 100%";
        document.getElementById("monsterbar").style.backgroundSize = "100% 100%";

        if (this.deviceMotionSubscription)
            this.deviceMotionSubscription.unsubscribe();

        this.parent.setInfo();
        this.resetTimer();
    }

    resetTimer() {
        this.maxTime = 10 + (90 / this.monster.Difficulty);
        this.MAXTIME = this.maxTime;
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

            this.maxTime -= 1;
            let healthPercentage = (this.maxTime / this.MAXTIME) * 100;
            document.getElementById("playerbar").style.backgroundSize = healthPercentage + "% 100%";

            if (this.maxTime <= 0)
                this.defeatedByMonster();

            if (this.maxTime > 0)
                this.startTimer();

        }, 1000);

    }

    hitMonster() {
        if (this.monsterHittable) {
            console.log("Hitting monster");
            this.monsterHittable = false;
            this.monster.Health -= 50;
            this.checkHealth();

            let healthPercentage = (this.monster.Health / this.monster.MaxHealth) * 100;
            document.getElementById("monsterbar").style.backgroundSize = healthPercentage + "% 100%";
            
            setTimeout(x => {
                this.monsterHittable = true;
            }, this.hitDebounce);
        }
        this.parent.setInfo();
    }

    screenSplash(){
        console.log("HIT! Splashing screen")
        //FIX THIS 
        let container = document.getElementsByName("screen-splash").item(0);
        container.style.display = "block";
        container.style.height = "100%";
        container.style.opacity = "0.0";
        setTimeout(x => {
            container.style.display = "none";
        }, 1000);
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

                    matches.forEach(element => {
                        if(element.toLowerCase() == "hocus pocus"){
                            this.hitMonster();
                        }
                    });
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
        this.changeCombatState(CombatState.CombatVictory);
        this.parent.setInfo();
    }

    defeatedByMonster() {
        this.inCombat = false;
        this.experienceGained = this.monster.Difficulty * 20;
        this.player.Experience += this.experienceGained;
        this.changeCombatState(CombatState.CombatDefeat);
        this.parent.setInfo();
    }

    retry() {
        this.combatState = CombatState.ChoosingCombatStyle;
        this.stopCombat();
    }

    changeCombatState(state: CombatState) {
        console.log("Changing combat state to " + state);
        this.combatState = state;
    }

}