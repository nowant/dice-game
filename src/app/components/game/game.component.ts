import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {BettingService} from '../../services/betting.service';
import {ScoreService} from '../../services/score.service';
import {NavigationService} from '../../services/navigation.service';
import {DiceGame} from '../../models/game.model';
import {Player} from '../../models/player.model';
import {GameStatus} from '../../dto/game-status.dto';
import {Bet} from '../../dto/bet.dto';
import {BetType, INCOME_NUM} from '../../constant';

/**
 * The main component that manages the whole game
 * Smart component
 * README: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  /**
   * Ui state of the game status
   */
  public gameStatus: GameStatus;

  /**
   * Ui state of the crypted number
   */
  public hiddenNumberFairHash: string;

  constructor(
    private game: DiceGame,
    private player: Player,
    private gameService: GameService,
    private bettingService: BettingService,
    private scoreService: ScoreService,
    private navigationService: NavigationService
  ) {}

  /**
   * The method is triggered when component is ready
   */
  ngOnInit() {
    // gets player's balance
    this.loadPlayerBalance();
    // starts new game
    this.startNextGame();
    // subscribes to 'FreeCredits' event
    this.navigationService.freeCredits$.subscribe(() => this.onFreeCredits());
  }

  /**
   * The method is triggered when player bets
   */
  public onBet() {
    if (this.isPlayerBalanceValid()) {
      this.finishCurrentGame();
      this.startNextGame();
    }
  }

  /**
   * The method is triggered when player clicks for credits
   */
  public onFreeCredits() {
    if (!this.isPlayerBalanceValid()) {
      this.player.setBalance(INCOME_NUM);
      this.player.dispatchBalanceIncome();
      this.savePlayerBalanace();
    }
  }

  /**
   * The method creates a new game state
   */
  private beforeStartGame() {
    // generates new game state
    const hiddenNumber = this.gameService.generateRandomNumber();
    const hiddenNumberHash = <string>this.gameService.createFairHash(hiddenNumber);
    // updates game with new state
    this.game.setHiddenRandomNumber(hiddenNumber);
    this.game.setHiddenRandomNumberHash(hiddenNumberHash);
    this.game.startNextGame();
  }

  /**
   * The method starts a new game
   */
  private startNextGame() {
    this.beforeStartGame();
    this.showHiddenNumberFairHash();
  }

  /**
   * The method finishes current game
   */
  private finishCurrentGame() {
    this.subtractAmountFromPlayerBalance();
    this.checkCurrentGame();
    this.savePlayerBalanace();
    this.afterFinishGame();
  }

  /**
   * flushes current game state
   */
  private afterFinishGame() {
    this.game.resetCurrentGame();
  }

  /**
   * The method checks the result of a game
   */
  private checkCurrentGame() {
    const hiddenNumber = this.game.getHiddenRandomNumber();
    const betType = this.player.getBetType();
    const number = this.player.getNumber();

    let win = null, chance = null;

    // checks whether a player wins or loses by his bet
    if (betType === BetType.HIGH) {
      win = this.gameService.checkHighGameResult(number, hiddenNumber);
      // gets percentage chance of current bet to use it for payout calculation
      chance = this.bettingService.checkHighChance(number);
    } else if (betType === BetType.LOW) {
      win = this.gameService.checkLowGameResult(number, hiddenNumber);
      // gets percentage chance of current bet to use it for payout calculation
      chance = this.bettingService.checkLowChance(number);
    }

    if (win) {
      // increases player's balance
      this.addAmountToPlayerBalance(chance);
    }

    // views the game result
    const status = new GameStatus(win, hiddenNumber);
    this.showGameStatus(status);
  }

  /**
   * The method calculates player's score when player wins
   */
  private addAmountToPlayerBalance(chance: number) {
    const balance = this.player.getBalance();
    const amount = this.player.getBetAmount();
    // gets win payout
    const payout = this.bettingService.checkPayout(chance);
    // calculates win score
    const score = this.scoreService.addScore(
      balance,
      amount,
      payout
    );
    // updates player's balance
    this.player.setBalance(score);
  }

  /**
   * The method calculates player's score when player loses
   */
  private subtractAmountFromPlayerBalance() {
    const balance = this.player.getBalance();
    const amount = this.player.getBetAmount();
    // calculates lose score
    const score = this.scoreService.subtractScore(
      balance,
      amount
    );
    // updates player's balance
    this.player.setBalance(score);
  }

  /**
   * The method views crypted number
   */
  private showHiddenNumberFairHash() {
    this.hiddenNumberFairHash = <string>this.game.getHiddenRandomNumberHash();
  }

  /**
   * The method views game's result
   */
  private showGameStatus(gameStatus: GameStatus) {
    this.gameStatus = gameStatus;
  }

  /**
   * The method gets player's balance from LocalStorage
   */
  private loadPlayerBalance() {
    const balance = +localStorage.getItem('balance');

    if (balance > 0) {
      this.player.setBalance(balance);
    }
  }

  /**
   * The method stores player's balance to LocalStorage
   */
  private savePlayerBalanace() {
    localStorage.setItem('balance', this.player.getBalance().toString());
  }

  private isPlayerBalanceValid() {
    return this.player.getBalance() > 0;
  }
}
