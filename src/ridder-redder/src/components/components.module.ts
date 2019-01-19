import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ArFrameComponent } from './ar-frame/ar-frame';
import { SpellbookComponent } from './spellbook/spellbook';
import { TestComponent } from './test/test';

@NgModule({
    declarations: [

        ArFrameComponent,
        SpellbookComponent,
    TestComponent,
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
    TestComponent,
    ]
})
export class ComponentsModule { }
