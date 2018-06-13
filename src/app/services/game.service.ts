import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {BettingService} from './betting.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private md5: Md5) {}

  public generateRandomNumber() {
    return Math.floor(Math.random() * (BettingService.MAX_NUMBER - BettingService.MIN_NUMBER + 1) + BettingService.MIN_NUMBER);
  }

  public createFairHash(randomNumber: number) {
    return this.md5.appendStr(randomNumber.toString()).end();
  }

  public checkHighGameResult(number: number, hiddenNumber: number) {
    return hiddenNumber >= number;
  }

  public checkLowGameResult(number: number, hiddenNumber: number) {
    return hiddenNumber <= number;
  }
}
