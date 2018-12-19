import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/AuthProvider';
import { HomePage } from '../home/home';

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
        console.log('ionViewDidLoad LoginPage');

        this.loginPageContent = document.getElementById('loginPageContent');
        this.loginContainer = document.getElementById('loginContainer');
    }

    startGame() {
        // TODO: navigate to Home page
        if(this.loginContainer)
            this.loginContainer.style.opacity = "0";
        if(this.loginPageContent)
            this.loginPageContent.style.opacity = "1";

        setTimeout(() => {
            this.navCtrl.push(HomePage).then(() => {
                this.loginPageContent.style.opacity = "0.85";
                this.loginContainer.style.opacity = "1";
            });
        }, 2500);
    }

    showOptions() {
        // TODO: navigate to Options page
    }

}
