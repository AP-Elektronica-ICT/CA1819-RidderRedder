import { NgModule } from '@angular/core';
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
    ]
})
export class ComponentsModule { }
