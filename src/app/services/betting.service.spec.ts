import {TestBed, inject} from '@angular/core/testing';
import {BettingService} from './betting.service';
import {ToFixedPipe} from '../pipes/to-fixed.pipe';

describe('BettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToFixedPipe, BettingService]
    });
  });

  it('Should be created', inject([BettingService], (service: BettingService) => {
    expect(service).toBeTruthy();
  }));

  it('Bet 50 High - should calculate Chance of Winning: 50% and Payout: 2x', inject([BettingService], (service: BettingService) => {
    const number = 50;
    const chance = service.checkHighChance(number);
    const payout = service.checkPayout(chance);

    expect(chance).toBe(50);
    expect(payout).toBe(2);
  }));

  it('Bet 1 Low - should calculate Chance of Winning: 1% and Payout: 100x', inject([BettingService], (service: BettingService) => {
    const number = 1;
    const chance = service.checkLowChance(number);
    const payout = service.checkPayout(chance);

    expect(chance).toBe(1);
    expect(payout).toBe(100);
  }));

  it('Bet 1 High - should calculate Chance of Winning: 99% and Payout: 1.01x', inject([BettingService], (service: BettingService) => {
    const number = 1;
    const chance = service.checkHighChance(number);
    const payout = service.checkPayout(chance);

    expect(chance).toBe(99);
    expect(payout).toBe(1.01);
  }));

  it('Bet 10 High - should calculate Chance of Winning: 90% and Payout: 1.11x', inject([BettingService], (service: BettingService) => {
    const number = 10;
    const chance = service.checkHighChance(number);
    const payout = service.checkPayout(chance);

    expect(chance).toBe(90);
    expect(payout).toBe(1.11);
  }));

  it('Bet 10 Low - should calculate Chance of Winning: 10% and Payout: 10x', inject([BettingService], (service: BettingService) => {
    const number = 10;
    const chance = service.checkLowChance(number);
    const payout = service.checkPayout(chance);

    expect(chance).toBe(10);
    expect(payout).toBe(10);
  }));
});
