import {TestBed, inject} from '@angular/core/testing';
import {ScoreService} from './score.service';
import {ToFixedPipe} from '../pipes/to-fixed.pipe';

describe('ScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToFixedPipe, ScoreService]
    });
  });

  it('Should be created', inject([ToFixedPipe, ScoreService], (service: ScoreService) => {
    expect(service).toBeTruthy();
  }));

  it('Should return 126.2 with balance 100 + amount 25.9 * payout 1.01', inject([ScoreService], (service: ScoreService) => {
    const balance = 100;
    const amount = 25.9;
    const payout = 1.01;
    const result = service.addScore(balance, amount, payout);
    expect(result).toBe(126.2);
  }));

  it('Should return 215.7 with balance 243 - 27.3', inject([ScoreService], (service: ScoreService) => {
    const balance = 243;
    const amount = 27.3;
    const result = service.subtractScore(balance, amount);
    expect(result).toBe(215.7);
  }));
});
