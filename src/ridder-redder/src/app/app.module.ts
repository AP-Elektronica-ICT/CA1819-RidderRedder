import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { RidderRedder } from './app.component';
import { HomePage } from '../pages/home/home';
import { CombatPage } from '../pages/combat/combat';
import { ComponentsModule } from '../components/components.module';
import { HomePageModule } from '../pages/home/home.module';
import { CombatPageModule } from '../pages/combat/combat.module';

@NgModule({
    declarations: [
        RidderRedder,
        // HomePage,
        // CombatPage
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        HomePageModule,
        CombatPageModule,
        IonicModule.forRoot(RidderRedder)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        RidderRedder,
        // HomePage,
        // CombatPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
