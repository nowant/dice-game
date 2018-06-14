import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, ValidatorFn} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CustomValidators} from 'ng4-validators';
import {Bet} from '../../dto/bet.dto';
import {BetType} from '../../constant';

function isNumberZeroLeading(value: string) {
  const pattern = /^0+(?=\d)/;
  return pattern.test(value);
}

function amountValidator(control: FormControl) {
  return !isNumberZeroLeading(control.value) ? null : {
    amount: {
      valid: false
    }
  };
}

function numberValidator(control: FormControl) {
  return !isNumberZeroLeading(control.value) ? null : {
    number: {
      valid: false
    }
  };
}

/**
 * The bet form component which allows player to bet
 * Used by BettingComponent
 * Dumb component
 * README: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */
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

  @Input() disabledBetButtons: boolean;

  /**
   * The submitting bet event dispatcher
   */
  @Output() submit = new EventEmitter();

  /**
   * The changing bet event dispatcher
   */
  @Output() change = new EventEmitter();

  /**
   * The bet form
   */
  private bettingForm: FormGroup;

  /**
   * Subject dispatcher to limit input abusing
   */
  private inputSub = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bettingForm = this.formBuilder.group({
      amount: [
        '',
        [
          // Validator requires the value to be non empty
          Validators.required,
          // Validator requires the value to be number range
          CustomValidators.range([Number.MIN_VALUE, this.maxAmount]),
          // Validator requires the value not to be started with zero leading (05, 00005)
          amountValidator
        ]
      ],
      number: [
        '',
        [
          Validators.required,
          CustomValidators.range([1, 100]),
          // Validator requires the value not to be started with zero leading (050, 00005)
          numberValidator
        ]
      ]
    });

    this.subscribeToBetChanges();
    this.enableOrDisableBetButtons();
  }

  /**
   * The method is triggered when component gets new @Input changes
   */
  ngOnChanges(changes) {
    if (changes.maxAmount && this.bettingForm) {
      // updates the max range validator to prevent bet the amount greater than player's balance
      this.updateMaxAmountValidator();
    }
  }

  /**
   * The method is triggered when player inputs bet
   */
  public onInput(e) {
    this.inputSub.next(e);
  }

  /**
   * The method is triggered when player bets high
   */
  public onBetHigh() {
    this.submitBet(BetType.HIGH);
  }

  /**
   * The method is triggered when player bets low
   */
  public onBetLow() {
    this.submitBet(BetType.LOW);
  }

  /**
   * The method is triggered when player to be changing the bet
   */
  private subscribeToBetChanges() {
    this.inputSub
      .pipe(
        // reduce to 100ms an event abusing
        debounceTime(100),
        // filters an event by only allowing data through that have not already been emitted
        distinctUntilChanged()
      )
      .subscribe(() => {
        // toggles disabling of the bet buttons
        this.enableOrDisableBetButtons();
        // triggers the bet change
        this.onBetChanges();
      });
  }

  /**
   * The method is triggered when player has changed the bet
   */
  private onBetChanges() {
    if (!this.bettingForm.valid) {
      return;
    }

    // gets data from the bet form
    const {amount, number} = this.bettingForm.value;
    const bet = new Bet(null, +amount, +number);
    // dispatches the bet change event to betting component
    this.change.emit(bet);
  }

  /**
   * The method is triggered when player has submitted the bet
   */
  private submitBet(betType: number) {
    if (!this.bettingForm.valid) {
      return;
    }

    const {amount, number} = this.bettingForm.value;
    const bet = new Bet(betType, +amount, +number);
    // Dispatches the bet submitting event to betting component
    this.submit.emit(bet);
  }

  /**
   * The method updates the amount validator
   */
  private updateMaxAmountValidator() {
    this.bettingForm.get('amount').setValidators([
      Validators.required,
      CustomValidators.range([Number.MIN_VALUE, this.maxAmount]),
      numberValidator
    ]);
    this.bettingForm.get('amount').updateValueAndValidity();
  }

  /**
   * The method toggles disabling of the bet buttons
   */
  private enableOrDisableBetButtons() {
    this.disabledBetButtons = !this.bettingForm.valid;
  }
}
