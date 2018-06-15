import {TestBed, inject} from '@angular/core/testing';
import {GameService} from './game.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
  });

  it('Should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it('Should generate random digit from 1 to 100', inject([GameService], (service: GameService) => {
    const randomNumber = service.generateRandomNumber();
    expect(randomNumber >= 1 && randomNumber <= 100).toBeTruthy();
  }));

  it('Should crypt by MD5', inject([GameService], (service: GameService) => {
    const number = 10;
    const cryptedNumber = service.createFairHash(number);
    expect(cryptedNumber).toBeTruthy();
  }));

  it('Player set number 20 and Bet High, hidden number 35 - should win', inject([GameService], (service: GameService) => {
    const playerNumber = 20;
    const hiddenNumber = 35;
    const result = service.checkHighGameResult(playerNumber, hiddenNumber);
    expect(result).toBe(true);
  }));

  it('Player set number 49 and Bet Low, hidden number 50 - should lose', inject([GameService], (service: GameService) => {
    const playerNumber = 49;
    const hiddenNumber = 50;
    const result = service.checkLowGameResult(playerNumber, hiddenNumber);
    expect(result).toBe(false);
  }));
});
