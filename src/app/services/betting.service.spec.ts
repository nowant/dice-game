import { TestBed, inject } from '@angular/core/testing';

import { BettingService } from './betting.service';

describe('BettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BettingService]
    });
  });

  it('should be created', inject([BettingService], (service: BettingService) => {
    expect(service).toBeTruthy();
  }));
});
