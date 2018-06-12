import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {BettingService} from '../../services/betting.service';
import {NavigationService} from '../../services/navigation.service';
import {DiceGame} from '../../models/game.model';
import {Player} from '../../models/player.model';
import {GameStatus} from '../../dto/game-status.dto';
import {Bet} from '../../dto/bet.dto';
import {BetType} from '../../constant';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public gameStatus: GameStatus;

  public hiddenNumberFairHash: string;

  public betHighChance: any;

  public betLowChance: any;

  public disabledGame: boolean;

  public maxAmount: number;

  constructor(
    private game: DiceGame,
    private player: Player,
    private gameService: GameService,
    private bettingService: BettingService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.startGame();
    this.showHiddenNumberFairHash();
    this.enableOrDisableGame();
    this.navigationService.freeCredits$.subscribe(() => this.onFreeCredits());
  }

  public onNumber(bet: Bet) {
    if (!this.isPlayerBalanceValid() || !this.isBetValid(bet)) {
      return;
    }

    this.updatePlayerWithBet(bet);
    this.showBetChances();
  }

  public onBet(bet: Bet) {
    if (!this.isPlayerBalanceValid()) {
      return;
    }

    this.updatePlayerWithBet(bet);
    this.checkGameResult();
    this.startGame();
    this.showHiddenNumberFairHash();
    this.enableOrDisableGame();
  }

  public onFreeCredits() {
    if (!this.isPlayerBalanceValid()) {
      this.updatePlayerBalance(100);
      this.enableOrDisableGame();
      this.maxAmount = this.player.getBalance();
    }
  }

  public startGame() {
    const hiddenNumber = this.gameService.generateRandomNumber();
    const hiddenNumberHash = <string>this.gameService.createFairHash(hiddenNumber);

    this.game.resetCurrentGame();
    this.game.setHiddenRandomNumber(hiddenNumber);
    this.game.setHiddenRandomNumberHash(hiddenNumberHash);
    this.game.startNextGame();
  }

  public checkGameResult() {
    const hiddenNumber = this.game.getHiddenRandomNumber();
    const betType = this.player.getBetType();
    const number = this.player.getNumber();

    if (betType === BetType.HIGH) {
      const win = this.gameService.checkHighGameResult(number, hiddenNumber);
      const status = new GameStatus(win, hiddenNumber);

      if (win) {
        const chance = this.bettingService.checkHighChance(number);
        const payout = this.bettingService.checkPayout(chance);
        const score = this.player.getBalance() * payout;
        this.player.setBalance(score);
      } else {
        const score = this.player.getBalance() - this.player.getBetAmount();
        this.player.setBalance(score);
      }

      this.maxAmount = this.player.getBalance();
      this.showGameStatus(status);
      return;
    }

    if (betType === BetType.LOW) {
      const win = this.gameService.checkLowGameResult(number, hiddenNumber);
      const status = new GameStatus(win, hiddenNumber);

      if (win) {
        const chance = this.bettingService.checkLowChance(number);
        const payout = this.bettingService.checkPayout(chance);
        const score = this.player.getBalance() * payout;
        this.player.setBalance(score);
      } else {
        const score = this.player.getBalance() - this.player.getBetAmount();
        this.player.setBalance(score);
      }

      this.maxAmount = this.player.getBalance();
      this.showGameStatus(status);
      return;
    }
  }

  public showHighChance() {
    const number = this.player.getNumber();
    const chance = this.bettingService.checkHighChance(number);
    const payout = this.bettingService.checkPayout(chance);

    this.betHighChance = {chance, payout};
  }

  public showLowChance() {
    const number = this.player.getNumber();
    const chance = this.bettingService.checkLowChance(number);
    const payout = this.bettingService.checkPayout(chance);

    this.betLowChance = {chance, payout};
  }

  private updatePlayerWithBet(bet: Bet) {
    this.player.setBetType(bet.type);
    this.player.setNumber(bet.number);
    this.player.setBetAmount(bet.amount);
  }

  private updatePlayerBalance(balance: number) {
    this.player.setBalance(balance);
  }

  private isPlayerBalanceValid() {
    return this.player.getBalance() > 0;
  }

  private isBetValid(bet: Bet) {
    return bet instanceof Bet;
  }

  private showHiddenNumberFairHash() {
    this.hiddenNumberFairHash = <string>this.game.getHiddenRandomNumberHash();
  }

  private showGameStatus(gameStatus: GameStatus) {
    this.gameStatus = gameStatus;
  }

  private showBetChances() {
    this.showHighChance();
    this.showLowChance();
  }

  private enableOrDisableGame() {
    this.disabledGame = !this.isPlayerBalanceValid();
  }
}
