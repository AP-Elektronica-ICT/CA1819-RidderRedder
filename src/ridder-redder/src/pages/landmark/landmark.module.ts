import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandmarkPage } from './landmark';

@NgModule({
  declarations: [
    LandmarkPage,
  ],
  imports: [
    IonicPageModule.forChild(LandmarkPage),
  ],
})
export class LandmarkPageModule {}
