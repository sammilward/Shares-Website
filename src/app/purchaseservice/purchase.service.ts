import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../userservice/user-service.service';
import { Observable } from 'rxjs';
import { MultiplePurchaseResponse } from './multiple-purchase-response';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchaseURL = 'https://localhost:44327/api/v1/purchases';

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  makePurchase(symbol: string, quantity: number): Observable<void> {
    let httpOptions = this.userService.getHttpOptions();
    let body = `{
      "companySymbol": "${symbol}",
      "quantity": ${quantity}
    }`
    return this.http.put<void>(this.purchaseURL, body, httpOptions);
  }

  getByUsername(): Observable<MultiplePurchaseResponse> {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultiplePurchaseResponse>(this.purchaseURL + `?username=${this.userService.getUsername()}`, httpOptions);
  }

  adminGetByUsername(username: string): Observable<MultiplePurchaseResponse> {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultiplePurchaseResponse>(this.purchaseURL + `?username=${username}`, httpOptions);
  }

  getBySymbol(symbol: string): Observable<MultiplePurchaseResponse> {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultiplePurchaseResponse>(this.purchaseURL + `?companySymbol=${symbol}`, httpOptions);
  }
}
