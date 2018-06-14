import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

/**
 * The game domain model which represents the game state
 * README: https://en.wikipedia.org/wiki/Domain_model
 */
@Injectable({
  providedIn: 'root'
})
export class DiceGame {
  /**
   * The generated number from 1 to 100
   */
  private hiddenRandomNumber: number;

  /**
   * The crypted number from 1 to 100
   */
  private hiddenRandomNumberHash: string;

  /**
   * The game started state
   */
  private gameStarted: boolean;

  /**
   * The next game dispatcher
   */
  private nextGameSubject = new Subject<boolean>();

  /**
   * The next game dispatcher
   */
  private finishGameSubject = new Subject<boolean>();

  /**
   * The next game event
   */
  public nextGame$ = this.nextGameSubject.asObservable();

  /**
   * The finish game event
   */
  public finishGame$ = this.nextGameSubject.asObservable();

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

  /**
   * The method dispatches the 'next game' event
   */
  public startNextGame() {
    if (this.isNextGameReady()) {
      this.gameStarted = true;
      this.nextGameSubject.next(this.gameStarted);
    }
  }

  /**
   * The method resets the state of a game
   */
  public resetCurrentGame() {
    this.hiddenRandomNumber = undefined;
    this.hiddenRandomNumberHash = undefined;
    this.gameStarted = false;
    this.finishGameSubject.next(true);
  }

  /**
   * The method checks whether the game state is ready
   */
  private isNextGameReady() {
    return !this.gameStarted
    && typeof this.hiddenRandomNumber === 'number'
    && typeof this.hiddenRandomNumberHash === 'string';
  }
}
