import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {BettingService} from '../../services/betting.service';
import {NavigationService} from '../../services/navigation.service';
import {DiceGame} from '../../models/game.model';
import {Player} from '../../models/player.model';
import {GameStatus} from '../../dto/game-status.dto';
import {Bet} from '../../dto/bet.dto';
import {BetType, INCOME_NUM} from '../../constant';
import {ToFixedPipe} from '../../pipes/to-fixed.pipe';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameStatus: GameStatus;

  public hiddenNumberFairHash: string;

  constructor(
    private game: DiceGame,
    private player: Player,
    private gameService: GameService,
    private bettingService: BettingService,
    private navigationService: NavigationService,
    private toFixedPipe: ToFixedPipe
  ) {}

  ngOnInit() {
    this.loadPlayerBalance();
    this.startNextGame();
    this.navigationService.freeCredits$.subscribe(() => this.onFreeCredits());
  }

  public onBet() {
    if (this.isPlayerBalanceValid()) {
      this.checkCurrentGame();
      this.startNextGame();
      this.savePlayerBalanace();
    }
  }

  public onFreeCredits() {
    if (!this.isPlayerBalanceValid()) {
      this.player.setBalance(INCOME_NUM);
      this.savePlayerBalanace();
    }
  }

  private prepareNextGame() {
    const hiddenNumber = this.gameService.generateRandomNumber();
    const hiddenNumberHash = <string>this.gameService.createFairHash(hiddenNumber);

    this.game.resetCurrentGame();
    this.game.setHiddenRandomNumber(hiddenNumber);
    this.game.setHiddenRandomNumberHash(hiddenNumberHash);
    this.game.startNextGame();
  }

  private startNextGame() {
    this.prepareNextGame();
    this.showHiddenNumberFairHash();
  }

  private checkCurrentGame() {
    const hiddenNumber = this.game.getHiddenRandomNumber();
    const betType = this.player.getBetType();
    const number = this.player.getNumber();

    let win = null, chance = null;

    if (betType === BetType.HIGH) {
      win = this.gameService.checkHighGameResult(number, hiddenNumber);
      chance = this.bettingService.checkHighChance(number);
    } else if (betType === BetType.LOW) {
      win = this.gameService.checkLowGameResult(number, hiddenNumber);
      chance = this.bettingService.checkLowChance(number);
    }

    if (win) {
      this.multiplyPlayerBalance(chance);
    } else {
      this.subtractPlayerBalance();
    }

    const status = new GameStatus(win, hiddenNumber);
    this.showGameStatus(status);
  }

  private multiplyPlayerBalance(chance: number) {
    const payout = this.bettingService.checkPayout(chance);
    const score = this.player.getBalance() * payout;
    const roundedScore = this.toFixedPipe.transform(score, 1);
    this.player.setBalance(roundedScore);
  }

  private subtractPlayerBalance() {
    const score = this.player.getBalance() - this.player.getBetAmount();
    const roundedScore = this.toFixedPipe.transform(score, 1);
    this.player.setBalance(roundedScore);
  }

  private showHiddenNumberFairHash() {
    this.hiddenNumberFairHash = <string>this.game.getHiddenRandomNumberHash();
  }

  private showGameStatus(gameStatus: GameStatus) {
    this.gameStatus = gameStatus;
  }

  private loadPlayerBalance() {
    const balance = +localStorage.getItem('balance');

    if (balance > 0) {
      this.player.setBalance(balance);
    }
  }

  private savePlayerBalanace() {
    localStorage.setItem('balance', this.player.getBalance().toString());
  }

  private isPlayerBalanceValid() {
    return this.player.getBalance() > 0;
  }
}
