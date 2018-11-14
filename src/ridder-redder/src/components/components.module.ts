import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArLauncherComponent } from './ar-launcher/ar-launcher';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        ArLauncherComponent,
    ],
    entryComponents: [
        ArLauncherComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ArLauncherComponent,
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ComponentsModule { }
