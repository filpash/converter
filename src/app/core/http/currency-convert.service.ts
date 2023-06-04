import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConvertCurrency } from '@app/models/convert-currency/convert-currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConvertService {
  private url = 'https://api.apilayer.com/exchangerates_data/latest';

  constructor(private http: HttpClient) {}

  fetchCurrencyData(): Observable<ConvertCurrency> {
    return this.http.get<ConvertCurrency>(`${this.url}`, { headers: this.appendHeader() });
  }

  private appendHeader(): HttpHeaders {
    return new HttpHeaders().append('apikey', 'hZqc0Gi4IrO3TFroyu46FDIe1Rh2CQgi');
  }
}
