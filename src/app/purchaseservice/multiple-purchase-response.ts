import { Purchase } from './purchase';

export class MultiplePurchaseResponse {
    currencyServiceDown: boolean;
    currency: string;
    result: Purchase[];
}