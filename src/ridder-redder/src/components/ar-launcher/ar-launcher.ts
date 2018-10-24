import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
/**
 * Generated class for the ArLauncherComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'ar-launcher',
    templateUrl: 'ar-launcher.html',
    encapsulation: ViewEncapsulation.None
})
export class ArLauncherComponent implements OnInit {

    constructor(private modalCtrl: ModalController) {
        
    }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    close() {
        // this.modalCtrl.dismiss();
    }

}
