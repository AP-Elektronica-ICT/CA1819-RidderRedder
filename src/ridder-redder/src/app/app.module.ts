import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { RidderRedder } from './app.component';
import { HomePage } from '../pages/home/home';
import { CombatPage } from '../pages/combat/combat';
import { ArLauncherComponent } from '../components/ar-launcher/ar-launcher';
import { ComponentsModule } from '../components/components.module';
import { HomePageModule } from '../pages/home/home.module';
import { CombatPageModule } from '../pages/combat/combat.module';
import { InventoryPage } from '../pages/inventory/inventory'
import { MonsterProvider } from '../providers/monster/monster';
import { PlayerProvider } from '../providers/player/player';

@NgModule({
  declarations: [
    RidderRedder,
    //HomePage,
    //CombatPage,    these are in seperate Module files
    InventoryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    HomePageModule,
    CombatPageModule,
    IonicModule.forRoot(RidderRedder)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RidderRedder,
    //HomePage,
    //CombatPage
    InventoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MonsterProvider,
    PlayerProvider
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
