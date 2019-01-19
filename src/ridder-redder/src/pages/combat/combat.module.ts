import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombatPage } from './combat';
import { ComponentsModule } from '../../components/components.module';
import { BowDragDirective } from '../../directives/bow-drag/bow-drag';

@NgModule({
    declarations: [
        CombatPage,
        BowDragDirective
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
