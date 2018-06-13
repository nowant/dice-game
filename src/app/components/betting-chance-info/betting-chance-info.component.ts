import {Component, Input} from '@angular/core';
import {BetChance} from '../../dto/bet-chance.dto';

@Component({
  selector: 'app-betting-chance-info',
  templateUrl: './betting-chance-info.component.html',
  styleUrls: ['./betting-chance-info.component.scss']
})
export class BettingChanceInfoComponent {
  @Input() bettingChance: BetChance;
}
