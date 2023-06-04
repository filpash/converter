import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '@app/models/currency/currency';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private url = 'https://belarusbank.by/api/kursExchange';

  constructor(private httpClient: HttpClient) {}

  getExchangeRate(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(`${this.url}`);
  }
}
