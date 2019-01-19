import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        InventoryPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(InventoryPage),
    ],
})
export class InventoryPageModule { }
