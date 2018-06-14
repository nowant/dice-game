import {Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import {SimpleChange} from '@angular/core/src/change_detection/change_detection_util';
import {GameStatus} from '../../dto/game-status.dto';

const GameStatusClasses = {
  NONE: 'p-3 mb-2 bg-light text-dark',
  LOSE: 'p-3 mb-2 bg-danger text-white',
  WIN: 'p-3 mb-2 bg-success text-white',
};

/**
 * The component that outputs the game status
 * Used by GameComponent
 * Dumb component
 * README: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */
@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss']
})
export class GameStatusComponent implements OnInit, OnChanges {
  @Input() status: GameStatus;

  public statusClass: string;

  public statusText: string;

  ngOnInit() {
    this.showNoneResult();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.status) {
      return;
    }

    switch (this.status.win) {
      case true:
        this.showWinResult();
        break;
      case false:
        this.showLoseResult();
        break;
      default:
        this.showNoneResult();
    }
  }

  public showNoneResult() {
    this.statusClass = GameStatusClasses.NONE;
    this.statusText = '...';
  }

  public showWinResult() {
    this.statusClass = GameStatusClasses.WIN;
    this.statusText = `WIN ${this.status.hiddenNumber} !`;
  }

  public showLoseResult() {
    this.statusClass = GameStatusClasses.LOSE;
    this.statusText = `LOSE ${this.status.hiddenNumber} !`;
  }
}
