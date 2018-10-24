import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombatPage } from './combat';
import { ArLauncherComponent } from '../../components/ar-launcher/ar-launcher';

@NgModule({
    declarations: [

        ArLauncherComponent
    ],
    imports: [
        IonicPageModule.forChild(CombatPage),
    ],
    entryComponents: [

        ArLauncherComponent
    ]
})
export class CombatPageModule { }
