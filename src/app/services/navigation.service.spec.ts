import {TestBed, inject, async, fakeAsync} from '@angular/core/testing';
import {of} from 'rxjs';

import {NavigationService} from './navigation.service';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService]
    });
  });

  it('Should be created', inject([NavigationService], (service: NavigationService) => {
    expect(service).toBeTruthy();
  }));
});
