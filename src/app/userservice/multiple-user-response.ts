import { User } from './user';

export class MulipleUserResponse {
    currencyServiceDown: boolean;
    converted: boolean;
    user: User[];
}