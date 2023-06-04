import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CurrencyState } from '@app/store/states/currency.state';
import { Observable } from 'rxjs';
import { Currency } from '@app/models/currency/currency';
import { GetCurrency } from '@app/store/actions/currency.action';
import { ExchangeRate } from '@app/components/exchange-rate/exchange-rate-enums/exchange-rate.enum';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  public displayedColumns: string[] = [
    ExchangeRate.FILIAL,
    ExchangeRate.USD_IN,
    ExchangeRate.USD_OUT,
    ExchangeRate.EUR_IN,
    ExchangeRate.EUR_OUT,
    ExchangeRate.RUB_IN,
    ExchangeRate.RUB_OUT,
  ];
  public currencyList!: Currency[];

  @Select(CurrencyState.getCurrencyList) currencies!: Observable<Currency[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetCurrency());

    // this.initCurrencies();
  }

  initCurrencies(): void {
    this.currencies.subscribe((currencies) => {
      if (currencies.length) {
        this.currencyList = currencies;
      }
    });
  }
}
