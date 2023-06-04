import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '@app/models/currency/currency';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private url = 'api/currency/';

  constructor(private httpClient: HttpClient) {}

  getExchangeRate(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(`${this.url}`);
  }
}
