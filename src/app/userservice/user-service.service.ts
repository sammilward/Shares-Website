import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SingleUserResponse } from './single-user-response';
import { MulipleUserResponse } from './multiple-user-response';
import { NewUserRequest } from './new-user-request';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  currentUser: SingleUserResponse;

  username: string;
  password: string;

  isAdmin: boolean;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'username' : 'usernameHolder',
      'password' : 'passwordHolder'
    })
  };  

  errorMessage: string;

  private baseURL = 'https://localhost:44327/api/v1/users';
  private curentUserUri;

  constructor(private http: HttpClient) { }

  updateHttpOptions(username: string, password: string): void {
    this.username = username;
    this.httpOptions.headers = this.httpOptions.headers.set('username', username);  
    this.httpOptions.headers = this.httpOptions.headers.set('password', password);
  }

  login(username: string, password: string): Observable<SingleUserResponse> {
    this.updateHttpOptions(username, password);
    this.curentUserUri = this.baseURL + '/' + username;
    return this.http.get<SingleUserResponse>(this.curentUserUri, this.httpOptions);
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }

  setCurrentUser(currentUser: SingleUserResponse): void {
    this.currentUser = currentUser
  }

  getCurrentUser():  SingleUserResponse {
    return this.currentUser;
  }

  getUsername(): string {
    return this.username;
  }

  getUpdatedCurrentUser():  Observable<SingleUserResponse> {
    return this.http.get<SingleUserResponse>(this.curentUserUri, this.httpOptions);
  }

  getHttpOptions() {
    return this.httpOptions;
  }

  register(newUser: NewUserRequest) : Observable<SingleUserResponse>  
  {
    return this.http.post<SingleUserResponse>(this.baseURL, newUser);
  }

  adminGetSpecific(username: string): Observable<SingleUserResponse> 
  {
    var userUri = this.baseURL + '/' + username;
    return this.http.get<SingleUserResponse>(userUri, this.httpOptions);
  }

  getAll(): Observable<MulipleUserResponse> {
    return this.http.get<MulipleUserResponse>(this.baseURL, this.httpOptions); 
  }

  getAllWithFilters(admins: boolean, username: string, prefferedCurrency: string, minWalletValue: number, maxWalletValue: number): Observable<MulipleUserResponse> {
    let queryString: string = '';
    if (username) queryString += `username=${username}&`
    if (prefferedCurrency) queryString += `prefferedCurrency=${prefferedCurrency}&`
    if (minWalletValue) queryString += `minWalletValue=${minWalletValue}&`
    if (maxWalletValue) queryString += `maxWalletValue=${maxWalletValue}&`
    if (admins != null) queryString += `admins=${admins}&`
    if (queryString) {
      queryString = '?' + queryString.substring(0,queryString.length-1);
    }
    return this.http.get<MulipleUserResponse>(this.baseURL + queryString, this.httpOptions); 
  }

  deleteAdmin(username: string): Observable<void> {
    return this.http.delete<void>(this.baseURL + `/${username}`, this.httpOptions);  
  }

  updatePrefferedCurrency(prefferedCurrency: string)
  {
    let body = {
      prefferedCurrency: prefferedCurrency
    };
    return this.http.put(this.curentUserUri, body, this.httpOptions);
  }

  updateWalletAmount(value: number)
  {
    let body = `{
      "changeWalletValueAmount": ${value}
    }`
    return this.http.put(this.curentUserUri, body, this.httpOptions);
  }

  logout(): void {
    this.username = null;
    this.password = null;
    this.currentUser = null;
    this.isAdmin = null;
    this.updateHttpOptions('usernameHolder', 'passwordHolder');
  }
}
