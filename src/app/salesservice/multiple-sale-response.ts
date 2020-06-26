import { Sale } from './sale';

export class MultipleSaleResponse {
    currencyServiceDown: boolean;
    currency: string;
    result: Sale[];
}