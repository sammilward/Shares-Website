import { Share } from './share';

export class MultipleShareResponse {
    currencyServiceDown: boolean;
    currency: string;
    result: Share[];
}