import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {Player} from '../../models/player.model';

/**
 * The navigation component
 * Used by AppComponent
 * Smart component
 * README: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public balance = 0;

  constructor(
    private player: Player,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    // subscribes to player's 'Balance change' event
    this.player.balance$.subscribe(() => this.balance = this.player.getBalance());
  }

  /**
   * The method asks for free credits
   */
  public onFreeCredits() {
    this.navigationService.ckickFreeCredits();
  }
}
