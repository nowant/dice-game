import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BettingService} from '../../services/betting.service';
import {Player} from '../../models/player.model';
import {Bet} from '../../dto/bet.dto';
import {BetChance} from '../../dto/bet-chance.dto';

/**
 * The bet component that controls the presentation logic for creating and predicting betting by a player
 * Smart component
 * README: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */
@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {
  /**
   * Bet event dispatcher
   */
  @Output() bet = new EventEmitter();

  /**
   * Ui state of the predicting high bet
   */
  public betHighChance: BetChance = new BetChance();

  /**
   * Ui state of the predicting low bet
   */
  public betLowChance: BetChance = new BetChance();

  /**
   * Ui disabling state of the bet form
   */
  public disabled = true;

  /**
   * Ui disabling state of the bet buttons
   */
  public disabledBetButtons = true;

  /**
   * Ui state of the maximum bet amount (is equal to the player's balance)
   */
  public maxAmount: number;

  constructor(
    private player: Player,
    private bettingService: BettingService
  ) {}

  ngOnInit() {
    // subscribes to player's 'Balance change' event
    this.player.balance$.subscribe((b) => this.onPlayerBalanceChange(b));
  }

  /**
   * The method is triggered when player's balance is changed
   */
  public onPlayerBalanceChange(balance: number) {
    this.maxAmount = balance;
    this.disabled = balance <= 0;
    this.disabledBetButtons = !this.canToBet();
  }

  /**
   * The method is triggered when player submits the bet
   */
  public onBetSumbit(bet: Bet) {
    if (!this.isBetValid(bet)) {
      return;
    }

    // updates player's state with new bet
    this.updatePlayerWithNewBet(bet);
    // dispatches the bet event to game component
    this.bet.emit();
  }

  /**
   * The method is triggered when player changes the bet options
   */
  public onBetChange(bet: Bet) {
    if (!this.isBetValid(bet)) {
      return;
    }

    // updates player's state with new bet
    this.updatePlayerWithNewBet(bet);
    // shows the chance of winning for each type of bet
    this.showHighChance();
    this.showLowChance();
    // disables the bet buttons if the bet is incorrect
    this.disabledBetButtons = !this.canToBet();
  }

  /**
   * The method calculates and shows the chance to win on the high bet
   */
  public showHighChance() {
    const number = this.player.getNumber();
    const chance = this.bettingService.checkHighChance(number);
    const payout = this.bettingService.checkPayout(chance);
    this.betHighChance = new BetChance(chance, payout);
  }

  /**
   * The method calculates and shows the chance to win on the low bet
   */
  public showLowChance() {
    const number = this.player.getNumber();
    const chance = this.bettingService.checkLowChance(number);
    const payout = this.bettingService.checkPayout(chance);
    this.betLowChance = new BetChance(chance, payout);
  }

  /**
   * The method updates player's state with new bet
   */
  private updatePlayerWithNewBet(bet: Bet) {
    this.player.setBetType(bet.type);
    this.player.setNumber(bet.number);
    this.player.setBetAmount(bet.amount);
  }

  /**
   * The method checks whether player is able to bet
   */
  private canToBet() {
    return this.player.getBetAmount() <= this.player.getBalance()
    && this.player.getBetAmount() > 0
    && this.player.getNumber() > 0;
  }

  /**
   * The method validates the bet
   */
  private isBetValid(bet: Bet) {
    return bet instanceof Bet
      && bet.amount > 0
      && this.player.getBalance() > 0;
  }
}
