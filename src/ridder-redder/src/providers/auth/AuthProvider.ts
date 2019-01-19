import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

const auth0config = {
    // needed for auth0
    clientID: '1x5h4mH6h17n4nfG5HDZ1obMjf5vNpIZ',

    // needed for auth0cordova
    clientId: '1x5h4mH6h17n4nfG5HDZ1obMjf5vNpIZ',
    domain: 'melvinb.eu.auth0.com',
    redirectURL: location.href,
    responseType: 'code',
    packageIdentifier: 'be.ridder.redder'
};

@Injectable()
export class AuthProvider {

    public AuthId = "";
    // Static for iPhone =       auth0|5bfe96d135b0da3846796a38

    auth0 = new Auth0.WebAuth(auth0config);
    accessToken: string;
    idToken: string;
    public user: any;

    // AuthProvider immediately sets up the profile and id_token,
    // when a user already has a session, we dont have to login.
    constructor(public zone: NgZone) {
        this.user = this.getStorageVariable('profile');
        this.idToken = this.getStorageVariable('id_token');
        this.AuthId = this.user.sub;
    }

    // Get a specific item thats stored in the local storage of the phone
    // PARAM: name: the name of the stored item
    private getStorageVariable(name) {
        return JSON.parse(window.localStorage.getItem(name));
    }

    // Store an item in the local storasge of the phone
    // PARAM: name: the name of the item to store
    // PARAM: data: the value of the item to store
    private setStorageVariable(name, data) {
        window.localStorage.setItem(name, JSON.stringify(data));
    }

    // Set the ID Token in the local storage
    private setIdToken(token) {
        this.idToken = token;
        this.setStorageVariable('id_token', token);
    }

    // Set the Access Token in the local storage
    private setAccessToken(token) {
        this.accessToken = token;
        this.setStorageVariable('access_token', token);
    }

    // Check if the user is authenticated by Auth0
    public isAuthenticated() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return Date.now() < expiresAt;
    }

    // Call this function to start the login procedure.
    // The user will be redirected to our personal RidderRedder Auth0 page to handle the login
    public login() {
        const client = new Auth0Cordova(auth0config);

        const options = {
            scope: 'openid profile offline_access'
        };

        client.authorize(options, (err, authResult) => {
            if (err) {
                throw err;
            }

            this.setIdToken(authResult.idToken);
            this.setAccessToken(authResult.accessToken);

            const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            this.setStorageVariable('expires_at', expiresAt);

            this.auth0.client.userInfo(this.accessToken, (err, profile) => {
                if (err) {
                    throw err;
                }

                profile.user_metadata = profile.user_metadata || {};
                this.setStorageVariable('profile', profile);
                this.zone.run(() => {
                    this.user = profile;
                });

            });
        });
    }

    // Call this function whenever you want to logout the user
    // It resets the local storage variables
    public logout() {
        window.localStorage.removeItem('profile');
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_at');

        this.idToken = null;
        this.accessToken = null;
        this.user = null;
    }

}
