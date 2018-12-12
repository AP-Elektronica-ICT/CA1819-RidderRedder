import { CombatState } from "./CombatState";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { DeviceMotion, DeviceMotionAccelerationData } from "@ionic-native/device-motion";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { CombatPage } from "../pages/combat/combat";
import { PlayerProvider } from "../providers/player/PlayerProvider";
import { PlayerDto } from "../dtos/PlayerDto";
import { MonsterProvider } from "../providers/monster/MonsterProvider";
import { MonsterDto } from "../dtos/MonsterDto";
import { ElementRef } from "@angular/core";
import { Knight } from "./Knight";
import { AuthProvider } from "../providers/auth/AuthProvider";
import { InventoryItem } from "./InventoryItem";
import { InventoryProvider } from '../providers/inventory/InventoryProvider';
import { AddInventoryItemDto } from "../dtos/AddInventoryItemDto";


export class Combat {

    public parent: CombatPage;

    public monster: Monster;
    public player: Player;

    public combatState: CombatState = CombatState.ChoosingCombatStyle;
    public experienceGained: number;
    public lootGained: InventoryItem[];

    public timer: number;
    public maxTime: number;
    public inCombat: boolean = false;
    public MAXTIME: number;

    private hitDebounce = 1250;
    private monsterHittable = true;
    private monsterPosX: number;
    private monsterMovingLeft = true;

    private deviceMotion: DeviceMotion;
    private deviceMotionSubscription;

    private speech: SpeechRecognition;
    private speechListener;
    private speechOptions;

    private loading: boolean = false;

    public constructor(
        private parentPage: CombatPage,
        private m: Monster,
        private p: Player,
        private dM: DeviceMotion,
        private s: SpeechRecognition,
        private playerProvider: PlayerProvider,
        private monsterProvider: MonsterProvider,
        private authProvider: AuthProvider,
        private invProvider: InventoryProvider
    ) {
        this.monster = m;
        this.player = p;
        this.deviceMotion = dM;
        this.speech = s;

        this.parent = parentPage;

        this.resetTimer();
    }

    ngAfterViewInit() {

    }

    moveMonster() {
        let obj: ElementRef = this.parent.monsterObject;

        if (!this.inCombat) {
            this.resetMonsterPosition(obj);
            return;
        }

        if (this.monsterMovingLeft)
            this.moveMonsterLeft(obj);

        if (!this.monsterMovingLeft)
            this.moveMonsterRight(obj);

        setTimeout(() => {
            this.moveMonster();
        }, 300);

    }

    moveMonsterRight(obj: ElementRef) {
        // console.log("Moving monster to the right")
        this.monsterPosX += 10;
        if (obj)
            obj.nativeElement.setAttribute("style", "left:" + this.monsterPosX + "%");

        if (this.monsterPosX > 70)
            this.monsterMovingLeft = true;
    }

    moveMonsterLeft(obj: ElementRef) {
        // console.log("Moving monster to the left")
        this.monsterPosX -= 10;
        if (obj)
            obj.nativeElement.setAttribute("style", "left:" + this.monsterPosX + "%");

        if (this.monsterPosX < 0)
            this.monsterMovingLeft = false;
    }

    resetMonsterPosition(obj: ElementRef) {
        // console.log("Resetting monster position");
        this.monsterPosX = 50;
        if (obj)
            obj.nativeElement.setAttribute("style", "left: calc(" + this.monsterPosX + "% - 50px)");
    }

    checkArrowHit(arrowX: number) {
        // console.log("Checking arrow collision at " + arrowX);

        //Hit left
        if (arrowX < 60 && this.monsterPosX < 25)
            this.hitMonster();

        //Hit middle
        if (arrowX > 60 && arrowX < 120 && this.monsterPosX > 25 && this.monsterPosX < 50)
            this.hitMonster();

        //Hit right
        if (arrowX > 120 && this.monsterPosX > 50)
            this.hitMonster();


    }

    startCombat() {
        // console.log("Player has selected combat style, starting combat");

        this.startTimer();

        this.resetMonsterPosition(this.parent.monsterObject);
        this.moveMonsterLeft(this.parent.monsterObject);
        this.moveMonster();
    }

    stopCombat() {
        // console.log("Combat has been stopped");
        this.inCombat = false;
        this.combatState = CombatState.ChoosingCombatStyle;
        this.monster.Health = this.monster.MaxHealth;
        document.getElementById("playerbar").style.backgroundSize = "100% 100%";
        document.getElementById("monsterbar").style.backgroundSize = "100% 100%";

        this.resetMonsterPosition(this.parent.monsterObject);

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

            // console.log(this.parent.monsterObject.nativeElement.style.paddingLeft);
            // console.log(this.parent.monsterObject.nativeElement.style.paddingRight);

            if (this.maxTime <= 0)
                this.defeatedByMonster();

            if (this.maxTime > 0)
                this.startTimer();

        }, 1000);

    }

    hitMonster(damage: number = 50) {
        if (!this.monsterHittable)
            return;

        // console.log("Hitting monster");
        this.monsterHittable = false;
        this.monster.Health -= damage;
        this.checkHealth();
        this.updateMonsterHealthbar();

        setTimeout(x => {
            this.monsterHittable = true;
        }, this.hitDebounce);

        this.parent.setInfo();
    }

    updateMonsterHealthbar() {
        let healthPercentage = (this.monster.Health / this.monster.MaxHealth) * 100;
        document.getElementById("monsterbar").style.backgroundSize = healthPercentage + "% 100%";
    }

    screenSplash() {
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
        // console.log("Listening for spellcast");
        this.speechListener = this.speech.startListening({ showPopup: false })
            .subscribe(
                (matches: Array<string>) => {
                    console.log(matches);

                    matches.forEach(element => {
                        if (element.toLowerCase() == "hocus pocus") {
                            this.hitMonster();
                        }
                    });
                },
                (onerror) => console.log('error:', onerror)
            )
    }

    checkHealth() {
        if (this.monster.Health <= 0) {
            // console.log("Monster is defeated");
            setTimeout(() => {
                this.defeatMonster();
            }, 1000);
        }
    }


    defeatMonster() {
        this.inCombat = false;
        this.experienceGained = this.monster.Difficulty * 50 + this.maxTime;
        this.player.Experience += this.experienceGained;
        this.changeCombatState(CombatState.CombatVictory);
        this.parent.setInfo();
        this.generateLoot();
    }

    defeatedByMonster() {
        this.inCombat = false;
        this.experienceGained = this.monster.Difficulty * 20;
        this.player.Experience += this.experienceGained;
        this.changeCombatState(CombatState.CombatDefeat);
        this.parent.setInfo();
    }

    retry() {
        if (this.combatState == CombatState.CombatVictory) {
            this.loading = true;
            this.monsterProvider.getMonster().subscribe(m => {
                this.monster = m;
                this.loading = false;
            });
        }
        this.lootGained = [];
        this.combatState = CombatState.ChoosingCombatStyle;
        this.stopCombat();
    }

    changeCombatState(state: CombatState) {
        // console.log("Changing combat state to " + state);
        this.combatState = state;

        if (this.combatState == CombatState.CombatDefeat || this.combatState == CombatState.CombatVictory) {
            this.loading = true;
            this.playerProvider.UpdatePlayer(this.player).subscribe(data => {
                let p: Player = {
                    PlayerName: data.playerName,
                    Experience: data.experience,
                    AuthId: data.authId
                }
                this.player = p;

                this.loading = false;
            }, error => {
                console.log(error);
            });
        }
    }

    generateLoot() {
        let items: AddInventoryItemDto[] = [];
        this.lootGained = [];

        let random = Math.random() * 3;

        for (let i = 0; i < random; i++) {
            let item: AddInventoryItemDto = {
                authId: this.authProvider.AuthId,
                itemImageId: this.invProvider.getRandomImage().itemImageId,
                itemTypeId: 1,
                amount: 1
            }
            this.invProvider.addToInventory(item).subscribe(data => {
                this.lootGained.push(data);
                console.log("Added new " + data.itemType.itemTypeName + " to inventory");
            }, err => {
                console.log(err);
            })
        }
    }

}