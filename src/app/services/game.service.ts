import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {BettingService} from './betting.service';

/**
 * The game service which is responsible for game logic
 */
@Injectable({
  providedIn: 'root'
})
export class GameService {
  /**
   * The method generates a random number
   */
  public generateRandomNumber() {
    return Math.floor(Math.random() * (BettingService.MAX_NUMBER - BettingService.MIN_NUMBER + 1) + BettingService.MIN_NUMBER);
  }

  /**
   * The method crypts a number to md5 hash string
   */
  public createFairHash(randomNumber: number) {
    return Md5.hashStr(randomNumber.toString());
  }

  /**
   * The method checks whether the game's number is higher(or equal) than player's one
   */
  public checkHighGameResult(number: number, hiddenNumber: number) {
    return hiddenNumber >= number;
  }

  /**
   * The method checks whether the game's number is lower(or equal) than player's one
   */
  public checkLowGameResult(number: number, hiddenNumber: number) {
    return hiddenNumber <= number;
  }
}
