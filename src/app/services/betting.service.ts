import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BettingService {

  public static MIN_NUMBER = 1;

  public static MAX_NUMBER = 100;

  constructor() {}

  public checkHighChance(randomNumber: number) {
    const number = BettingService.MAX_NUMBER - ((BettingService.MAX_NUMBER / 100 ) * randomNumber);
    return this.checkLowChance(number);
  }

  public checkLowChance(randomNumber: number) {
    const percent = 100 / (BettingService.MAX_NUMBER / randomNumber);
    return percent;
  }

  public checkPayout(chanceNumber: number) {
    return BettingService.MAX_NUMBER / chanceNumber;
  }

}
