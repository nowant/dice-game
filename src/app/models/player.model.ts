import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Player {
  private balance = 0;

  private betType: any;

  private betAmount = 0;

  private number = 0;

  private balanceBs = new BehaviorSubject(0);

  public balance$ = this.balanceBs.asObservable();

  public setBalance(balance: number = 0) {
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

  public setBetAmount(betAmount: number = 0) {
    if (typeof betAmount === 'number') {
      this.betAmount = betAmount;
    }
  }

  public getBetAmount() {
    return this.betAmount;
  }

  public setNumber(number: number = 0) {
    if (typeof number === 'number') {
      this.number = number;
    }
  }

  public getNumber() {
    return this.number;
  }
}
