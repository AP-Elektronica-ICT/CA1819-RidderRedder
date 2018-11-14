import { Component } from '@angular/core';

/**
 * Generated class for the SpellbookComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-spellbook',
  templateUrl: 'spellbook.html'
})
export class SpellbookComponent {

  text: string;

  constructor() {
    console.log('Hello SpellbookComponent Component');
    this.text = 'Hello World';
  }

}
