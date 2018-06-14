import {Component, Input} from '@angular/core';

/**
 * The component that outputs the crypted number
 * Used by GameComponent
 * Dumb component
 * README: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */
@Component({
  selector: 'app-fair-hash',
  templateUrl: './fair-hash.component.html',
  styleUrls: ['./fair-hash.component.scss']
})
export class FairHashComponent {
  @Input() numberFairHash: string;
}
