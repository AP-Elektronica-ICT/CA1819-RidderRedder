import { CombatState } from "./CombatState";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { DeviceMotion, DeviceMotionAccelerationData } from "@ionic-native/device-motion";

export class Combat {

    public monster: Monster;
    public player: Player;

    public combatState: CombatState = CombatState.ChoosingCombatStyle;

    public timer: number;
    public maxTime: number;
    public inCombat: boolean = false;

    private hitDebounce = 2500;
    private monsterHittable = true;

    private deviceMotion: DeviceMotion;
    private deviceMotionSubscription;

    constructor(private m: Monster, private p: Player, private dM: DeviceMotion) {
        this.monster = m;
        this.player = p;
        this.deviceMotion = dM;

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
        this.deviceMotionSubscription.unsubscribe();
        this.resetTimer();
    }

    resetTimer() {
        this.maxTime = 120 / this.monster.Difficulty;
    }

    selectCombatStyle(e) {
        switch (e.path[0].id) {
            case "img-sword":
                this.combatState = CombatState.CombatMelee;
                this.deviceMotionSubscription = this.deviceMotion.watchAcceleration({frequency: 100}).subscribe((acc: DeviceMotionAccelerationData) => {
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
                break;
        }

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

    }

    hitPlayer() {
        this.player.Health -= 50;
        this.checkHealth();
    }

    checkHealth() {
        if (this.monster.Health <= 0) {
            console.log("Monster is defeated");
        }
        if (this.player.Health <= 0) {
            console.log("Player is defeated");
        }
    }

}