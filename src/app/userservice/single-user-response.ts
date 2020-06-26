import { User } from './user';

export class SingleUserResponse {
    currencyServiceDown: boolean;
    currency: string;
    result: User;
}