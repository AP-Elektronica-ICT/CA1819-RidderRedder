import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/AuthProvider';
import { HomePage } from '../home/home';
import { LandmarkLoader } from '../../providers/LandmarkLoader';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider) {

    }

    ionViewDidLoad() {
        this.loginPageContent = document.getElementById('loginPageContent');
        this.loginContainer = document.getElementById('loginContainer');
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
