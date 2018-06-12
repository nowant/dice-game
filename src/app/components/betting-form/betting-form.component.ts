import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
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

  @Input() maxAmount = 0;

  @Input() disabled: boolean;

  @Output() submit = new EventEmitter();

  @Output() change = new EventEmitter();

  private bettingForm: FormGroup;

  private inputSub = new Subject();

  private inputSubscription: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bettingForm = this.formBuilder.group({
      amount: ['', [Validators.required, CustomValidators.range([1, this.maxAmount])]],
      number: ['', [Validators.required, CustomValidators.range([1, 100])]]
    });

    this.subscribeToBetChanges();
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
    this.inputSubscription = this.inputSub
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(() => this.onBetChanges());
  }

  private onBetChanges() {
    if (!this.bettingForm.valid) {
      return;
    }

    const {amount, number} = this.bettingForm.value;
    const bet = new Bet(null, amount, number);

    this.change.emit(bet);
  }

  private submitBet(betType: number) {
    if (!this.bettingForm.valid) {
      return;
    }

    const {amount, number} = this.bettingForm.value;
    const bet = new Bet(betType, amount, number);

    this.submit.emit(bet);
  }

  private updateMaxAmountValidator() {
    this.bettingForm.get('amount').setValidators([ Validators.required, CustomValidators.range([1, this.maxAmount]) ]);
    this.bettingForm.get('amount').updateValueAndValidity();

  }

}
