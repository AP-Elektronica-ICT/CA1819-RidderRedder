import { CombatState } from "./CombatState";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { DeviceMotion, DeviceMotionAccelerationData } from "@ionic-native/device-motion";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { CombatPage } from "../pages/combat/combat";
import { LandmarkPage } from "../pages/landmark/landmark";
import { PlayerProvider } from "../providers/player/PlayerProvider";
import { PlayerDto } from "../dtos/PlayerDto";
import { MonsterProvider } from "../providers/monster/MonsterProvider";
import { MonsterDto } from "../dtos/MonsterDto";
import { ElementRef } from "@angular/core";
import { Knight } from "./Knight";
import { AuthProvider } from "../providers/auth/AuthProvider";
import { LandmarkProvider } from "../providers/landmark/LandmarkProvider";
import { InventoryItem } from "./InventoryItem";
import { InventoryProvider } from '../providers/inventory/InventoryProvider';
import { AddInventoryItemDto } from "../dtos/AddInventoryItemDto";
import { HomePage } from "../pages/home/home";


export class Combat {

    public DEBUG = false;

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

    private returning: boolean;


    public constructor(
        private parentPage: CombatPage,
        private m: Monster,
        private p: Player,
        private dM: DeviceMotion,
        private s: SpeechRecognition,
        private playerProvider: PlayerProvider,
        private monsterProvider: MonsterProvider,
        private authProvider: AuthProvider,
        private invProvider: InventoryProvider,
        private lmProvider: LandmarkProvider,
        private lmPage?: LandmarkPage
    ) {
        this.monster = m;
        this.player = p;
        this.deviceMotion = dM;
        this.speech = s;

        this.parent = parentPage;

        this.resetTimer();
        this.returning = false;
    }

    // The function responsible for the horizontal 
    // movement of the monster. This keeps repeating
    // whenever the monster is in combat
    private moveMonster() {
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

    // Move the monster to the right
    // PARAM: obj: The HTML element reference to the monster
    private moveMonsterRight(obj: ElementRef) {
        // console.log("Moving monster to the right")
        this.monsterPosX += 10;
        if (obj)
            obj.nativeElement.setAttribute("style", "left:" + this.monsterPosX + "%");

        if (this.monsterPosX > 70)
            this.monsterMovingLeft = true;
    }

    // Move the monster to the left
    // PARAM: obj: The HTML element reference to the monster
    private moveMonsterLeft(obj: ElementRef) {
        // console.log("Moving monster to the left")
        this.monsterPosX -= 10;
        if (obj)
            obj.nativeElement.setAttribute("style", "left:" + this.monsterPosX + "%");

        if (this.monsterPosX < 0)
            this.monsterMovingLeft = false;
    }

    // Resets the monster his position to the middle
    // PARAM: obj: The HTML element reference to the monster
    public resetMonsterPosition(obj: ElementRef) {
        // console.log("Resetting monster position");
        this.monsterPosX = 50;
        if (obj)
            obj.nativeElement.setAttribute("style", "left: calc(" + this.monsterPosX + "% - 50px)");
    }

    // Checks if the arrow, shot from the bow collides
    // with the monster, based on his current position
    public checkArrowHit(arrowX: number) {
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

    // When everything is set up, this function is
    // called in order to start the combat. Starting
    // the timer and start moving the monster.
    public startCombat() {
        // console.log("Player has selected combat style, starting combat");

        this.startTimer();

        this.resetMonsterPosition(this.parent.monsterObject);
        this.moveMonsterLeft(this.parent.monsterObject);
        this.moveMonster();
    }

    // When the monster/player is defeated, we stop 
    // the combat here. This resets the UI, timer,
    // the monster his position, motion tracker,
    // and then we return to the map
    private stopCombat() {
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
        this.returnToMap();
    }

    // Here we reset the timer of the combat
    private resetTimer() {
        this.maxTime = 10 + (90 / this.monster.Difficulty);
        this.MAXTIME = this.maxTime;
    }

    // Here we select the combat style that the player
    // has chosen. This is based on the three combat
    // types, hence the switch case. Then we start
    // the combat.
    public selectCombatStyle(e) {
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

    // Here we start the timer. We keep repeating this
    // function to count down, and update the health bars
    private startTimer() {
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

    // Here we damage the monster, whenever the player
    // hits with one of the combat styles, the monster
    // receives damage based on the given parameter.
    // We also update the health bar here.
    // PARAM: damage: The amount of damage to be dealt
    //                to the monster, default = 50
    public hitMonster(damage: number = 50) {
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

    // Here we update the monster's health bar
    private updateMonsterHealthbar() {
        let healthPercentage = (this.monster.Health / this.monster.MaxHealth) * 100;
        document.getElementById("monsterbar").style.backgroundSize = healthPercentage + "% 100%";
    }

    // Whenever the player succesfully hits the monster
    // this function is called. It shows a quick screen
    // light flash to indicate that there has been a 
    // succesfull hit.
    // WARNING: This is not working, and thus has not 
    //          been implemented yet.
    public screenSplash() {
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

    // This is called when the footer of the combat screen
    // has been interacted with. Currently it only has 
    // a functionality when the player is in the Magic
    // CombatState. 
    // PARAM: event: The ClickEvent received from Ionic
    public interactFooter(event) {
        if (this.combatState === CombatState.CombatMagic)
            this.castSpell();
    }

    // This function is called whenever the player has
    // interacted with the footer of the combat screen.
    // It starts the speech listener, and listens for
    // the text linked to the spell.
    // At the moment, a wide variety of spells have not
    // been implemented yet. Only one.
    // TODO: Add a spellbook with spell selection and
    //       make this function listen for that 
    //       particular spell.
    private castSpell() {
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

    // Checks the monster's health. This function is
    // called regularly to see if the monster has 
    // been killed.
    public checkHealth() {
        if (this.monster.Health <= 0) {
            // console.log("Monster is defeated");
            setTimeout(() => {
                this.defeatMonster();
            }, 1000);
        }
    }

    // This function is called whenever the monster has
    // been defeated. It calculates the experience
    // and loot gained for the player.
    private defeatMonster() {
        this.inCombat = false;
        this.experienceGained = this.monster.Difficulty * 50 + this.maxTime;
        this.player.Experience += this.experienceGained;
        this.changeCombatState(CombatState.CombatVictory);
        this.parent.setInfo();

        let tmp: any = this.monster;
        if(tmp.isKnight){
            
            console.log("defeated knight");
            console.log(tmp);
            this.lootGained = [];
            this.lmProvider.killKnight(tmp.landmark).subscribe(
                lm => {
                    console.log("killKnight");
                    console.log(lm);
                    this.lmPage.removeKnight();
                    this.lmPage.updateLandmark();
                });
        } else {
            console.log("Defeated monster");
            this.generateLoot();

        }
    }

    // This function is called when the player has been
    // defeated by the monster (when the time runs out).
    // It gives the player a small amount of experience.
    private defeatedByMonster() {
        this.inCombat = false;
        this.experienceGained = this.monster.Difficulty * 10;
        this.player.Experience += this.experienceGained;
        this.changeCombatState(CombatState.CombatDefeat);
        this.parent.setInfo();
    }

    // This function is called when the return/retry
    // button has been pressed. When in DEBUG mode
    // it restarts the combat state with a new monster.
    // If not in DEBUG mode it returns to the map.
    public retry() {
        if (!this.DEBUG)
            this.returnToMap();

        if (this.combatState == CombatState.CombatVictory) {
            this.parent.loading = true;
            this.monsterProvider.getMonster().subscribe(m => {
                this.monster = m;
                this.parent.loading = false;
            });
        }
        this.lootGained = [];
        this.combatState = CombatState.ChoosingCombatStyle;
        this.stopCombat();
    }

    // Resets the loot gained and removes the monster
    // from the marker.
    public resetCombat() {
        this.lootGained = [];
        let tmp: any = this.monster;
        if(!tmp.isKnight){
            //this.monster.Marker.remove();
        }
    }


    returnToMap(){
        if(this.returning) return;
        else{
            this.returning = true;
            this.resetCombat();
            console.log("returnToMap start");
            console.log(this.parent.navCtrl);
            console.log(this.parent.navCtrl.getViews());
            
            let tmp: any = this.monster;

            this.parent.navCtrl.pop();
            
            // this.parent.navCtrl.push(
            //     HomePage,
            //     { lastmonster: this.monster }
            // );
            console.log("Returning to map");
        }
    }

    // Change the combat state to the selected CombatState
    // PARAM: state: The CombatState selected by the player
    private changeCombatState(state: CombatState) {
        // console.log("Changing combat state to " + state);
        this.combatState = state;

        if (this.combatState == CombatState.CombatDefeat || this.combatState == CombatState.CombatVictory) {
            // this.loading = true;
            this.playerProvider.updatePlayer(this.player).subscribe(data => {
                let p: Player = {
                    PlayerName: data.PlayerName,
                    Experience: data.Experience,
                    AuthId: data.AuthId
                }
                this.player = p;

                // this.loading = false;
            }, error => {
                console.log(error);
            });
        }
    }

    // Generate some random loot for the player. Then
    // push this loot to the API to save it in the 
    // player his inventory.
    private generateLoot() {
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
                data.amount = item.amount;
                this.lootGained.push(data);
                console.log("Added new " + data.itemType.itemTypeName + " to inventory");
            }, err => {
                console.log(err);
            })
        }
    }

}
