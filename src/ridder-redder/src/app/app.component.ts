import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
import { CombatPage } from '../pages/combat/combat';
import { TestComponent } from '../components/test/test';
import { LoginPage } from '../pages/login/login';

import * as auth0 from 'auth0-js';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

@Component({
    templateUrl: 'app.html'
})
export class RidderRedder {

    rootPage: any = LoginPage;


    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private screenOrientation: ScreenOrientation) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

            statusBar.styleDefault();
            splashScreen.hide();

            (<any>window).handleOpenURL = (url) => {
                Auth0Cordova.onRedirectUri(url);
            };
        });
    }
}

