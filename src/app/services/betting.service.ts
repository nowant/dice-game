import {Injectable} from '@angular/core';
import {ToFixedPipe} from '../pipes/to-fixed.pipe';

/**
 * The bet service which is responsible for predicting bets logic
 */
@Injectable({
  providedIn: 'root'
})
export class BettingService {
  public static MIN_NUMBER = 1;

  public static MAX_NUMBER = 100;

  constructor(private toFixedPipe: ToFixedPipe) {}

  /**
   * The method calculates the percentage of the high bet
   */
  public checkHighChance(number: number) {
    // subtracts the number in percent from the max number
    const resultNumber = BettingService.MAX_NUMBER - ((BettingService.MAX_NUMBER / 100 ) * number);
    // returns the percentage of the number from the max number
    return this.checkLowChance(resultNumber);
  }

  /**
   * The method calculates the percents of the low bet
   */
  public checkLowChance(number: number) {
    // calculates the percentage of the number from the max number
    const percents = 100 / (BettingService.MAX_NUMBER / number);
    // returns value rounded to 2 decimal place
    return this.toFixedPipe.transform(percents, 2);
  }

  /**
   * The method calculates the payout coeff
   */
  public checkPayout(number: number) {
    const percents = BettingService.MAX_NUMBER / number;
    // returns value rounded to 2 decimal place
    return this.toFixedPipe.transform(percents, 2);
  }
}
