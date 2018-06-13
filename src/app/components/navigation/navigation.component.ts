import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {Player} from '../../models/player.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  public balance = 0;

  constructor(
    private player: Player,
    private navigationService: NavigationService
  ) {}

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.player.balance$.subscribe(() => this.balance = this.player.getBalance());
  }

  public onFreeCredits() {
    this.navigationService.ckickFreeCredits();
  }
}
