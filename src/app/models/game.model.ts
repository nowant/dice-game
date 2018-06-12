import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiceGame {

  private hiddenRandomNumber: number;

  private hiddenRandomNumberHash: string;

  private gameStarted: boolean;

  private nextGameSub = new Subject();

  public nextGame$ = this.nextGameSub.asObservable();

  constructor() {}

  public setHiddenRandomNumber(hiddenRandomNumber: number = 0) {
    if (typeof hiddenRandomNumber === 'number') {
      this.hiddenRandomNumber = hiddenRandomNumber;
    }
  }

  public getHiddenRandomNumber() {
    return this.hiddenRandomNumber;
  }

  public setHiddenRandomNumberHash(hiddenRandomNumberHash: string) {
    if (typeof hiddenRandomNumberHash === 'string') {
      this.hiddenRandomNumberHash = hiddenRandomNumberHash;
    }
  }

  public getHiddenRandomNumberHash() {
    return this.hiddenRandomNumberHash;
  }

  public startNextGame() {
    if (this.isNextGameReady()) {
      this.gameStarted = true;
      this.nextGameSub.next();
    }
  }

  public resetCurrentGame() {
    this.hiddenRandomNumber = undefined;
    this.hiddenRandomNumberHash = undefined;
    this.gameStarted = false;
  }

  private isNextGameReady() {
    return !this.gameStarted
    && typeof this.hiddenRandomNumber === 'number'
    && typeof this.hiddenRandomNumberHash === 'string';
  }

}
