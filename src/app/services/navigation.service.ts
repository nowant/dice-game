import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private freeCreditsSub = new Subject();

  public freeCredits$ = this.freeCreditsSub.asObservable();

  constructor() {}

  public ckickFreeCredits() {
    this.freeCreditsSub.next();
  }
}
