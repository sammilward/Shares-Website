import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specificCurrency'
})
export class SpecificCurrencyPipe implements PipeTransform {

  transform(value: number, currencySymbol: string): string {
    let result = currencySymbol + value.toFixed(2)
    return result;
  }
}
