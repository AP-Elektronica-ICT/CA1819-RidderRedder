import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ArFrameComponent } from './ar-frame/ar-frame';
import { SpellbookComponent } from './spellbook/spellbook';

@NgModule({
    declarations: [

        ArFrameComponent,
        SpellbookComponent,
    ],
    imports: [
        IonicModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [

        ArFrameComponent,
        SpellbookComponent,
    ]
})
export class ComponentsModule { }
