import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BetType} from '../constant';

/**
 * The player domain model which represents the player state
 * README: https://en.wikipedia.org/wiki/Domain_model
 */
@Injectable({
  providedIn: 'root'
})
export class Player {
  /**
   * The player's balance
   */
  private balance = 0;

  /**
   * The player's bet type
   */
  private betType: BetType;

  /**
   * The player's amount
   */
  private betAmount = 0;

  /**
   * The player's number
   */
  private number = 0;

  /**
   * The balance change dispatcher
   */
  private balanceBs = new BehaviorSubject(0);

  /**
   * The balance change event
   */
  public balance$ = this.balanceBs.asObservable();

  /**
   * The method sets player's balance and dispatches player's balance change
   */
  public setBalance(balance: number) {
    if (typeof balance === 'number') {
      this.balance = balance;
      this.balanceBs.next(this.balance);
    }
  }

  public getBalance() {
    return this.balance;
  }

  public setBetType(betType: number) {
    if (typeof betType === 'number') {
      this.betType = betType;
    }
  }

  public getBetType() {
    return this.betType;
  }

  public setBetAmount(betAmount: number) {
    if (typeof betAmount === 'number') {
      this.betAmount = betAmount;
    }
  }

  public getBetAmount() {
    return this.betAmount;
  }

  public setNumber(number: number) {
    if (typeof number === 'number') {
      this.number = number;
    }
  }

  public getNumber() {
    return this.number;
  }
}
