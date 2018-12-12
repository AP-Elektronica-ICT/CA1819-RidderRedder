import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController, Platform } from 'ionic-angular';
import { PanEvent } from './PanModel';
import { CombatPage } from '../../pages/combat/combat';
import { Combat } from '../../models/Combat';

/**
 * Generated class for the BowDragDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
    selector: '[bow-drag]' // Attribute selector
})
export class BowDragDirective {

    @Input() combat: Combat;

    private windowWidth;
    private windowHeight;

    private xOffset = 50;
    private yOffset = 50;


    private initialPos: [number, number];

    constructor(public platform: Platform, public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {
        console.log("Hello BowDragDirective");

        this.windowWidth = platform.width();
        this.windowHeight = platform.height();

        this.initialPos = [((this.windowWidth / 2) - this.xOffset), ((this.windowHeight / 100 * 65) - this.yOffset)];
    }

    ngAfterViewInit() {

        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.initialPos[0] + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.initialPos[1] + 'px');

        let hammer = new window['Hammer'](this.element.nativeElement);



        hammer.get('pan').set({
            direction: window['Hammer'].DIRECTION_ALL,
            threshhold: 1
        });

        hammer.on('pan', (ev) => {
            this.handlePan(ev);
        });

    }

    handlePan(ev: PanEvent) {
        let newLeft = ev.center.x - this.xOffset;
        let newTop = ev.center.y - this.yOffset - 50;

        if (newTop < this.initialPos[1])
            newTop = this.initialPos[1];

        let angle = Math.atan2(newTop - this.initialPos[1] + 100, newLeft - this.initialPos[0]);
        angle = angle * (180 / Math.PI);

        if (angle < 0)
            angle = 360 - (-angle);


        // console.log("y" + (this.initialPos[1] - newTop) + " x" + (this.initialPos[0] - newLeft) + " = " + angle);

        if (ev.isFinal) {
            console.log("User released the bow, preparing to shoot!");
            this.domCtrl.write(() => {
                this.renderer.setElementStyle(this.element.nativeElement, 'transition', '500ms all');
                this.renderer.setElementStyle(this.element.nativeElement, 'left', this.initialPos[0] + 'px');
                this.renderer.setElementStyle(this.element.nativeElement, 'top', (this.initialPos[1]) + 'px');

                setTimeout(() => {
                    this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'rotate(' + 0 + 'deg)');
                    setTimeout(() => {
                        this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'none');
                    }, 250)
                }, 750);

                this.combat.checkArrowHit(angle);
            });
        } else {
            this.domCtrl.write(() => {
                this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
                this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
                this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'rotate(' + (-90 + angle) + 'deg)');
            });
        }

    }

}
