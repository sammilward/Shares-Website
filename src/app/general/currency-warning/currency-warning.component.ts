import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-currency-warning',
  templateUrl: './currency-warning.component.html',
  styleUrls: ['./currency-warning.component.css']
})
export class CurrencyWarningComponent {
  @Input() currencyDown: boolean;

  constructor() { }
}
