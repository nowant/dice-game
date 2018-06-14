import {Injectable} from '@angular/core';
import {ToFixedPipe} from '../pipes/to-fixed.pipe';

/**
 * The score service which is responsible for score calculation logic
 */
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private toFixedPipe: ToFixedPipe) {}

  public addScore(balance: number, amount: number, payout: number) {
    const score = balance + amount * payout;
    // returns score rounded to 1 decimal place
    return this.toFixedPipe.transform(score, 1);
  }

  public subtractScore(balance: number, amount: number) {
    const score = balance - amount;
    // returns score rounded to 1 decimal place
    return this.toFixedPipe.transform(score, 1);
  }
}
