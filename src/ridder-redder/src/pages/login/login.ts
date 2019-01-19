import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/AuthProvider';
import { HomePage } from '../home/home';
import { LandmarkLoader } from '../../providers/LandmarkLoader';
import { PlayerProvider } from '../../providers/player/PlayerProvider';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loginPageContent: HTMLElement;
    loginContainer: HTMLElement;

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private playerProvider: PlayerProvider) {

    }

    ionViewDidLoad() {
        this.loginPageContent = document.getElementById('loginPageContent');
        this.loginContainer = document.getElementById('loginContainer');

        // Try to load player,
        // If player is nonexistent
        // we create a new player
        this.loadPlayer();
    }

    loadPlayer() {
        if (!this.auth.AuthId)
           return;

        this.playerProvider.getPlayer(this.auth.AuthId).subscribe(success => {
            console.log(success);
        }, error => {
            console.log("Could not find player, creating new player");
            this.newPlayer();
        });
    }
    newPlayer() {
        this.playerProvider.newPlayer({
            authId: this.auth.AuthId,
            experience: 0,
            playerName: this.auth.user.nickname
        }).subscribe(success => {
            console.log(success);
        }, error => {
            console.log(error);
        });
    }


    /* 
     *  Push the HomePage to the navigation controller. 
     *  This starts the game.
     */
    startGame() {
        this.navCtrl.push(HomePage);
    }

    showOptions() {
        // TODO: navigate to Options page
    }

}
