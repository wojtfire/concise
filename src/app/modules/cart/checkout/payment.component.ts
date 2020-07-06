import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreditCard, CreditCardState} from '../../../store/state/credit-card.model';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker} from '@angular/material';

import * as moment from 'moment';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormUtils} from '../../../shared/utils/form-util';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {AddCreditCard, CreditCardActionsTypes, CreditCardSelect, PayForOrder} from '../../../store/actions/credit-card.action';
import {BaseComponent} from '../../../shared/component';
import {takeUntil, tap} from 'rxjs/operators';
import {CartState} from '../../../store/state/cart.model';
import {Actions, ofType} from '@ngrx/effects';
import {LoaderService} from '../../../core/services/loader.service';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PaymentComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  cartState: CartState;
  cardState: CreditCardState;
  addMode: boolean;
  creditCardType: CreditCardType;
  CreditCardType = CreditCardType;
  now: moment.Moment;
  moment = moment;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private actions$: Actions, private loader: LoaderService) {
    super();
  }

  ngOnInit() {
    this.now = moment();
    this.initForm();
    this.initState();
  }

  private initState() {
    this.store.select(store => store.cards).pipe(takeUntil(this.destroy$)).subscribe(val => {
      if (val) {
        this.getCardState(val);
        this.setFormValue();
        this.setCreditCardType(this.cardState.selectedCard);
      }
    });

    this.store.select(store => store.cart).pipe(takeUntil(this.destroy$)).subscribe(val => val && (this.cartState = val));

    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(CreditCardActionsTypes.CREDIT_CARD_SELECT),
      tap(val => val && this.setDefaultMode())).subscribe();
  }

  private getCardState(val: CreditCardState) {
    this.cardState = val;
  }

  private initForm() {
    this.form = this.fb.group({
      cardHolder: [null, Validators.required],
      number: [null, [Validators.required, Validators.minLength(16)]],
      expiryDate: [this.now, Validators.required],
      cvv: [null, Validators.required]
    }, {updateOn: 'blur'});
  }

  private setFormValue() {
    const form = this.form;
    form.get('cardHolder').setValue(this.cardState.selectedCard.cardHolder);
    form.get('number').setValue(this.cardState.selectedCard.number);
    form.get('expiryDate').setValue(moment(this.cardState.selectedCard.expiryDate));
    form.get('cvv').setValue(this.cardState.selectedCard.cvv);
  }

  setCreditCardType(card?: CreditCard) {
    const numberControlValue = this.form.get('number').value;
    if (card || numberControlValue) {
      const val = card ? card.number : numberControlValue;
      const re = new RegExp('^4');
      if (val.match(re)) {
        this.creditCardType = CreditCardType.VISA;
      } else if (val.match(new RegExp('^5[1-5]'))) {
        this.creditCardType = CreditCardType.MASTERCARD;
      } else {
        this.creditCardType = null;
      }
    }
  }

  selectCard(card: CreditCard) {
    this.store.dispatch(new CreditCardSelect(card));
    this.setFormValue();
    this.setCreditCardType(card);
  }

  clearErrors(controlName: string) {
    this.form.get(controlName).setErrors(null);
  }

  onPay() {
    this.loader.start();
    this.store.dispatch(new PayForOrder({selectedCard: this.cardState.selectedCard, cartState: this.cartState}));
  }

  onAddNewCard() {
    FormUtils.markAllAsTouchedAndUpdateValue(this.form);
    if (this.form.valid) {
      this.loader.start();
      this.store.dispatch(new AddCreditCard(this.form.value));
    }
  }

  chosenYearHandler(normalizedYear) {
    const ctrlValue = this.form.get('expiryDate').value;
    ctrlValue.year(normalizedYear.year());
    this.form.get('expiryDate').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.form.get('expiryDate').value;
    ctrlValue.month(normalizedMonth.month());
    this.form.get('expiryDate').setValue(ctrlValue);
    datepicker.close();
  }

  onNumberKeyPress(event) {
    return event.keyCode !== 8 && event.keyCode === 0 || (event.keyCode >= 48 && event.keyCode <= 57);
  }

  changeMode(addMode: boolean) {
    addMode ? this.setAddMode() : this.setDefaultMode();
  }

  private setAddMode() {
    this.addMode = true;
    this.creditCardType = null;
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control.reset();
      control.setErrors(null);
      control.setValidators(Validators.required);
      key === 'expiryDate' && control.setValue(this.now);
      key === 'number' && control.setValidators(Validators.minLength(16));
    });
  }

  private setDefaultMode() {
    this.addMode = false;
    this.setFormValue();
    this.setCreditCardType();
  }
}

export enum CreditCardType {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD'
}
