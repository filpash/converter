import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetConvertedCurrency } from '@app/store/actions/currency-convert.action';
import { ConvertedCurrencyState } from '@app/store/states/currency-convert.state';
import { ConvertCurrency } from '@app/models/convert-currency/convert-currency';
import { convert, parse } from '@app/core/utils/commonUtils';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  @Select(ConvertedCurrencyState.getConvertedData) convertedData!: Observable<ConvertCurrency>;

  public currencyForm!: FormGroup;
  public currencyData = {};
  public currencyCodes: string[] = [];
  public resultText = `Result appears here`;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetConvertedCurrency());

    this.initConvertedData();
    this.initForm();
  }

  initConvertedData() {
    this.convertedData.subscribe((result) => {
      if (result) {
        this.currencyData = result.rates;
        this.currencyCodes = Object.keys(result.rates).sort();
      }
    });
  }

  convertedCurrency() {
    this.resultText = '';
    const formArray = (this.currencyForm.get('currencies') as FormArray).value;
    formArray.forEach((item: any) => {
      let amount: number = item.amount;
      let convertFrom: string = item.from;
      let convertTo: string = item.to;
      let result = convert(this.currencyData, amount, convertFrom, convertTo);
      result = parse(result);
      this.resultText += `${amount} ${convertFrom} ${convertFrom && convertTo ? '=' : ' '} ${result} ${convertTo} `;
    });
  }

  initForm(): void {
    this.currencyForm = this.fb.group({
      currencies: this.fb.array([this.newCurrencyForm()]),
    });
  }

  newCurrencyForm(): FormGroup {
    return this.fb.group({
      amount: [''],
      from: [''],
      to: [''],
    });
  }

  addCurrencyGroup() {
    this.currencyArray.push(this.newCurrencyForm());
  }

  removeCurrencyGroup(index: number) {
    this.currencyArray.removeAt(index);
    this.convertedCurrency();
  }

  get currencyArray(): FormArray {
    return <FormArray>this.currencyForm.get('currencies');
  }
}
