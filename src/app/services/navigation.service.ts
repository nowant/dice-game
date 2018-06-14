import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

/**
 * The navigation mediator service which is responsible to publish 'Free Credits event'
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * The free credits dispatcher
   */
  private freeCreditsSub = new Subject();

  /**
   * The free credits event
   */
  public freeCredits$ = this.freeCreditsSub.asObservable();

  /**
   * The method dispatches 'free credits' event
   */
  public ckickFreeCredits() {
    this.freeCreditsSub.next();
  }
}
