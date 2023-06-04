import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class CurrencyDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    return {
      currency: [
        {
          USD_in: '2,8810',
          USD_out: '2,9390',
          EUR_in: '3,1050',
          EUR_out: '3,1690',
          RUB_in: '2,7000',
          RUB_out: '3,6800',
          bank_name: 'Alfa-Bank',
          filial_id: '16',
        },
        {
          USD_in: '2,9010',
          USD_out: '2,9290',
          EUR_in: '3,1100',
          EUR_out: '3,1540',
          RUB_in: '2,7000',
          RUB_out: '3,7000',
          bank_name: 'NEM3O-обменник',
          filial_id: '448',
        },
        {
          USD_in: '2,9141',
          USD_out: '2,9249',
          EUR_in: '3,1352',
          EUR_out: '3,1487',
          RUB_in: '2,7000',
          RUB_out: '3,6646',
          bank_name: 'I am Banking',
          filial_id: '457',
        },
      ],
    };
  }
}
