import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../userservice/user-service.service';
import { Observable } from 'rxjs';
import { MultipleSaleResponse } from './multiple-sale-response';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private salesURL = 'https://localhost:44327/api/v1/sales';

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  makeSale(symbol: string, quantity: number): Observable<void> {
    let httpOptions = this.userService.getHttpOptions();
    let body = `{
      "companySymbol": "${symbol}",
      "quantity": ${quantity}
    }`
    return this.http.put<void>(this.salesURL, body, httpOptions);
  }

  getByUsername(): Observable<MultipleSaleResponse> {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultipleSaleResponse>(this.salesURL + `?username=${this.userService.getUsername()}`, httpOptions);
  }

  adminGetByUsername(username: string): Observable<MultipleSaleResponse> {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultipleSaleResponse>(this.salesURL + `?username=${username}`, httpOptions);
  }

  getBySymbol(symbol: string): Observable<MultipleSaleResponse> {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultipleSaleResponse>(this.salesURL + `?companySymbol=${symbol}`, httpOptions);
  }
}
