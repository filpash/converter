// конвертация валют
export function convert(currency: any, amount: number, from: string, to: string): any {
  if (amount && from && to) {
    let convertedCurrencyFrom: number = currency[from];
    let convertedCurrencyTo: number = currency[to];
    return (convertedCurrencyTo / convertedCurrencyFrom) * amount;
  } else {
    return '';
  }
}

// получение результата с точностью до 2 знаков после запятой
export function parse(value: number): any {
  if (value) {
    return parseFloat(value.toFixed(2));
  } else {
    return '';
  }
}
