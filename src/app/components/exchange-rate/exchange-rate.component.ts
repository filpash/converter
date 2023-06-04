import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CurrencyState } from '@app/store/states/currency.state';
import { Observable } from 'rxjs';
import { Currency } from '@app/models/currency/currency';
import { GetCurrency } from '@app/store/actions/currency.action';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  public displayedColumns: string[] = ['bankName', 'usdIn', 'usdOut', 'eurIn', 'eurOut', 'rubIn', 'rubOut'];
  public currencyList!: Currency[];

  @Select(CurrencyState.getCurrencyList) currencies!: Observable<Currency[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetCurrency());

    this.initCurrencies();
  }

  initCurrencies(): void {
    this.currencies.subscribe((currencies) => {
      if (currencies.length) {
        this.currencyList = currencies;
      }
    });
  }
}
