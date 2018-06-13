import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CustomValidators} from 'ng4-validators';
import {Bet} from '../../dto/bet.dto';
import {BetType} from '../../constant';

@Component({
  selector: 'app-betting-form',
  templateUrl: './betting-form.component.html',
  styleUrls: ['./betting-form.component.scss']
})
export class BettingFormComponent implements OnInit, OnChanges {
  @Input() betHighChance: any;

  @Input() betLowChance: any;

  @Input() maxAmount = 0;

  @Input() disabled = true;

  @Output() submit = new EventEmitter();

  @Output() change = new EventEmitter();

  public disabledBetButtons = true;

  private bettingForm: FormGroup;

  private inputSub = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bettingForm = this.formBuilder.group({
      amount: ['', [Validators.required, CustomValidators.range([Number.MIN_VALUE, this.maxAmount])]],
      number: ['', [Validators.required, CustomValidators.range([1, 100])]]
    });

    this.subscribeToBetChanges();
    this.enableOrDisableBetButtons();
  }

  ngOnChanges(changes) {
    if (changes.maxAmount && this.bettingForm) {
      this.updateMaxAmountValidator();
    }
  }

  public onInput(e) {
    this.inputSub.next(e);
  }

  public onBetHigh() {
    this.submitBet(BetType.HIGH);
  }

  public onBetLow() {
    this.submitBet(BetType.LOW);
  }

  private subscribeToBetChanges() {
    this.inputSub
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.enableOrDisableBetButtons();
        this.onBetChanges();
      });
  }

  private onBetChanges() {
    if (!this.bettingForm.valid) {
      return;
    }

    const {amount, number} = this.bettingForm.value;
    const bet = new Bet(null, +amount, +number);
    this.change.emit(bet);
  }

  private submitBet(betType: number) {
    if (!this.bettingForm.valid) {
      return;
    }

    const {amount, number} = this.bettingForm.value;
    const bet = new Bet(betType, +amount, +number);
    this.submit.emit(bet);
  }

  private updateMaxAmountValidator() {
    this.bettingForm.get('amount').setValidators([ Validators.required, CustomValidators.range([Number.MIN_VALUE, this.maxAmount]) ]);
    this.bettingForm.get('amount').updateValueAndValidity();
  }

  private enableOrDisableBetButtons() {
    this.disabledBetButtons = !this.bettingForm.valid;
  }
}
