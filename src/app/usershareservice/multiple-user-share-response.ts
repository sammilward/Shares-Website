import { UserShare } from './usershare';

export class MultipleUserShareResponse {
    currencyServiceDown: boolean;
    currency: string;
    result: UserShare[];
}