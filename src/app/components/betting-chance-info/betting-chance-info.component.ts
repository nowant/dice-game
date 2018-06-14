import {Component, Input} from '@angular/core';
import {BetChance} from '../../dto/bet-chance.dto';

/**
 * The component that outputs the predicting chance of a bet
 * Used by BettingFormComponent
 * Dumb component
 * README: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */
@Component({
  selector: 'app-betting-chance-info',
  templateUrl: './betting-chance-info.component.html',
  styleUrls: ['./betting-chance-info.component.scss']
})
export class BettingChanceInfoComponent {
  @Input() bettingChance: BetChance;
}
