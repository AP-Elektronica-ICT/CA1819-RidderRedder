import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { RidderRedder } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ComponentsModule } from '../components/components.module';
import { HomePageModule } from '../pages/home/home.module';
import { CombatPageModule } from '../pages/combat/combat.module';
import { InventoryPage } from '../pages/inventory/inventory';
import { LandmarkPage } from '../pages/landmark/landmark';
import { LandmarkProvider } from '../providers/landmark/LandmarkProvider';
import { MonsterProvider } from '../providers/monster/MonsterProvider';
import { PlayerProvider } from '../providers/player/PlayerProvider';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { DeviceMotion } from '@ionic-native/device-motion';
import { AuthProvider } from '../providers/auth/AuthProvider';
import { InventoryProvider } from '../providers/inventory/InventoryProvider';
import { InterceptorProvider } from '../providers/interceptor/Interceptor';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { InventoryPageModule } from '../pages/inventory/inventory.module';
import { LandmarkPageModule } from '../pages/landmark/landmark.module';

@NgModule({
    declarations: [
        RidderRedder,
        //HomePage,
        //CombatPage,    these are in seperate Module files
        // InventoryPage,
        // LandmarkPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ComponentsModule,
        HomePageModule,
        CombatPageModule,
        LoginPageModule,
        InventoryPageModule,
        LandmarkPageModule,
        // DirectivesModule,
        IonicModule.forRoot(RidderRedder)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        RidderRedder,
        //HomePage,
        //CombatPage
        // InventoryPage,
        // LandmarkPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GoogleMaps,
        Geolocation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MonsterProvider,
        PlayerProvider,
        LandmarkProvider,
        DeviceMotion,
        ScreenOrientation,
        SpeechRecognition,
        AuthProvider,
        InventoryProvider,
        InterceptorProvider,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorProvider,
            multi: true
        }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
