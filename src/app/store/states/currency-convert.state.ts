import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CurrencyConvertService } from '@app/core/http/currency-convert.service';
import { GetConvertedCurrency } from '@app/store/actions/currency-convert.action';
import { tap } from 'rxjs';
import { ConvertCurrency } from '@app/models/convert-currency/convert-currency';

export class ConvertedCurrencyStateModel {
  convertedCurrency!: ConvertCurrency;
}

@State<ConvertedCurrencyStateModel>({
  name: 'convertedCurrency',
  defaults: {
    convertedCurrency: {
      base: '',
      date: '',
      rates: {},
      success: false,
      timestamp: 0,
    },
  },
})
@Injectable()
export class ConvertedCurrencyState {
  constructor(private currencyConvertService: CurrencyConvertService) {}

  @Selector()
  static getConvertedData(state: ConvertedCurrencyStateModel) {
    return state.convertedCurrency;
  }

  @Action(GetConvertedCurrency)
  GetConvertedCurrency({ getState, setState }: StateContext<ConvertedCurrencyStateModel>) {
    return this.currencyConvertService.fetchCurrencyData().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          convertedCurrency: result,
        });
      })
    );
  }
}
