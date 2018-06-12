import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fair-hash',
  templateUrl: './fair-hash.component.html',
  styleUrls: ['./fair-hash.component.scss']
})
export class FairHashComponent {
  @Input() numberFairHash: string;
}
