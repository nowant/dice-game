import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BettingService} from '../../services/betting.service';
import {Player} from '../../models/player.model';
import {Bet} from '../../dto/bet.dto';
import {BetChance} from '../../dto/bet-chance.dto';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {
  @Output() bet = new EventEmitter();

  public betHighChance: BetChance = new BetChance();

  public betLowChance: BetChance = new BetChance();

  public disabledGame: boolean;

  public maxAmount: number;

  public disabled = true;

  constructor(
    private player: Player,
    private bettingService: BettingService
  ) {}

  ngOnInit() {
    this.player.balance$.subscribe((b) => this.onPlayerBalanceChange(b));
  }

  public onPlayerBalanceChange(balance: number) {
    this.maxAmount = balance;
    this.disabled = balance <= 0;
  }

  public onBetSumbit(bet: Bet) {
    if (!this.isBetValid(bet)) {
      return;
    }

    this.updatePlayerWithNewBet(bet);
    this.bet.emit();
  }

  public onBetChange(bet: Bet) {
    if (!this.isBetValid(bet)) {
      return;
    }

    this.updatePlayerWithNewBet(bet);
    this.showHighChance();
    this.showLowChance();
  }

  public showHighChance() {
    const number = this.player.getNumber();
    const chance = this.bettingService.checkHighChance(number);
    const payout = this.bettingService.checkPayout(chance);
    this.betHighChance = new BetChance(chance, payout);
  }

  public showLowChance() {
    const number = this.player.getNumber();
    const chance = this.bettingService.checkLowChance(number);
    const payout = this.bettingService.checkPayout(chance);
    this.betLowChance = new BetChance(chance, payout);
  }

  private updatePlayerWithNewBet(bet: Bet) {
    this.player.setBetType(bet.type);
    this.player.setNumber(bet.number);
    this.player.setBetAmount(bet.amount);
  }

  private isPlayerBalanceValid() {
    return this.player.getBalance() > 0;
  }

  private isBetValid(bet: Bet) {
    return bet instanceof Bet
      && bet.amount > 0
      && this.player.getBalance() > 0;
  }
}
