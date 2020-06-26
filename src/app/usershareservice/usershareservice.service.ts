import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { Observable } from 'rxjs';
import { MultipleUserShareResponse } from './multiple-user-share-response';
import { SingleUserShareResponse } from './single-user-share-response';

@Injectable({
  providedIn: 'root'
})
export class UsershareserviceService {

  private userShareURL = 'https://localhost:44327/api/v1/usershares';

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  getAllUserShares(): Observable<MultipleUserShareResponse>
  {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultipleUserShareResponse>(this.userShareURL, httpOptions);
  }

  adminGetByUsername(username: string): Observable<MultipleUserShareResponse>
  {
    let httpOptions = this.userService.getHttpOptions();
    let url = this.userShareURL + `?username=${username}`;
    return this.http.get<MultipleUserShareResponse>(url, httpOptions);
  }

  getBySymbol(symbol: string): Observable<MultipleUserShareResponse> {
    let httpOptions = this.userService.getHttpOptions();
    let url = this.userShareURL + `?CompanySymbol=${symbol}`;
    return this.http.get<MultipleUserShareResponse>(url, httpOptions);
  }

  getWithFilters(username: string, companySymbol: string, minVale: number, maxValue: number, minQuantity: number, maxQuantity: number): Observable<MultipleUserShareResponse> {
    let queryString: string = '';
    if (username) queryString += `username=${username}&`
    if (companySymbol) queryString += `companySymbol=${companySymbol}&`
    if (minVale) queryString += `minValue=${minVale}&`
    if (maxValue) queryString += `maxValue=${maxValue}&`
    if (minQuantity) queryString += `minQuantity=${minQuantity}&`
    if (maxQuantity) queryString += `maxQuantity=${maxQuantity}&`
    if (queryString) {
      queryString = '?' + queryString.substring(0,queryString.length-1);
    }
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultipleUserShareResponse>(this.userShareURL + queryString, httpOptions);
  }
}
