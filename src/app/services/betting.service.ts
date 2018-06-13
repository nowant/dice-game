import {Injectable} from '@angular/core';
import {ToFixedPipe} from '../pipes/to-fixed.pipe';

@Injectable({
  providedIn: 'root'
})
export class BettingService {
  public static MIN_NUMBER = 1;

  public static MAX_NUMBER = 100;

  constructor(private toFixedPipe: ToFixedPipe) {}

  public checkHighChance(randomNumber: number) {
    const number = BettingService.MAX_NUMBER - ((BettingService.MAX_NUMBER / 100 ) * randomNumber);
    return this.checkLowChance(number);
  }

  public checkLowChance(randomNumber: number) {
    const percent = 100 / (BettingService.MAX_NUMBER / randomNumber);
    return this.toFixedPipe.transform(percent, 2);
  }

  public checkPayout(chanceNumber: number) {
    const percent = BettingService.MAX_NUMBER / chanceNumber;
    return this.toFixedPipe.transform(percent, 2);
  }
}
