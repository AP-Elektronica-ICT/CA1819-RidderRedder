import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ArFrameComponent } from './ar-frame/ar-frame';

@NgModule({
    declarations: [

        ArFrameComponent,
    ],
    imports: [
        IonicModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [

        ArFrameComponent,
    ]
})
export class ComponentsModule { }
