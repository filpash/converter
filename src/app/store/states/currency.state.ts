import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetCurrency } from '@app/store/actions/currency.action';
import { ExchangeRateService } from '@app/core/http/exchange-rate.service';
import { Currency } from '@app/models/currency/currency';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';

export class CurrencyStateModel {
  currencies!: Currency[];
}

@State<CurrencyStateModel>({
  name: 'currencies',
  defaults: {
    currencies: [],
  },
})
@Injectable()
export class CurrencyState {
  constructor(private exchangeRateService: ExchangeRateService) {}

  @Selector()
  static getCurrencyList(state: CurrencyStateModel) {
    return state.currencies;
  }

  @Action(GetCurrency)
  GetCurrency({ getState, setState }: StateContext<CurrencyStateModel>) {
    return this.exchangeRateService.getExchangeRate().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          currencies: result,
        });
      })
    );
  }
}
