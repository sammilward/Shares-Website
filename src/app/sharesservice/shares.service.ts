import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from '../userservice/user-service.service';
import { MultipleShareResponse } from './multiple-share-response';
import { SingleShareResponse } from './single-share-response';

@Injectable({
  providedIn: 'root'
})
export class SharesService {

  private shareURL = 'https://localhost:44327/api/v1/shares';

  constructor(private http: HttpClient, private userService: UserServiceService) { }

  getBySymbol(symbol: string): Observable<SingleShareResponse>
  {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<SingleShareResponse>(this.shareURL + `/${symbol}`, httpOptions);
  }

  getAllShares(): Observable<MultipleShareResponse> {
    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultipleShareResponse>(this.shareURL, httpOptions);
  }

  getWithFilters(companySymbol: string, companyName: string, minVale: number, maxValue: number, minQuantity: number, maxQuantity: number): Observable<MultipleShareResponse> {
    let queryString: string = '';
    if (companySymbol) queryString += `companySymbol=${companySymbol}&`
    if (companyName) queryString += `companyName=${companyName}&`
    if (minVale) queryString += `minValue=${minVale}&`
    if (maxValue) queryString += `maxValue=${maxValue}&`
    if (minQuantity) queryString += `minQuantity=${minQuantity}&`
    if (maxQuantity) queryString += `maxQuantity=${maxQuantity}&`
    if (queryString) {
      queryString = '?' + queryString.substring(0,queryString.length-1);
    }

    let httpOptions = this.userService.getHttpOptions();
    return this.http.get<MultipleShareResponse>(this.shareURL+queryString, httpOptions)
  }
}
