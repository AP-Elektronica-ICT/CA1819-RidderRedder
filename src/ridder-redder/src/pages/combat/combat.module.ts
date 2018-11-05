import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombatPage } from './combat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        CombatPage
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(CombatPage),
    ],
    entryComponents: [
        CombatPage
    ]
})
export class CombatPageModule { }
