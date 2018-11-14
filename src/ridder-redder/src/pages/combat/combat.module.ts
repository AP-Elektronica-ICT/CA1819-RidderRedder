import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class CombatPageModule { }
