import { Component, OnInit } from '@angular/core';
import { UsershareserviceService } from 'src/app/usershareservice/usershareservice.service';
import { UserShare } from 'src/app/usershareservice/usershare';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-shares',
  templateUrl: './user-shares.component.html',
  styleUrls: ['./user-shares.component.css']
})
export class UserSharesComponent implements OnInit {
  pageTitle: string ='User Shares';
  ownedShares: UserShare[];
  errorMessage: string = null;

  usernameFilter: string;
  companySymbolFilter: string;
  minValueFilter: number;
  maxValueFilter: number;
  minQuantityFilter: number;
  maxQuantityFilter: number;

  currencyDown: boolean;

  constructor(private userShareService: UsershareserviceService) { }

  ngOnInit() {
    this.updateUserShares();
  }

  updateUserShares(): void {
    this.userShareService.getAllUserShares().subscribe({
      next: response => { 
        this.ownedShares = response.result;
        this.clearError();
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => this.setError(err)
    })
  }

  filter() {
    this.userShareService.getWithFilters(
      this.usernameFilter,
      this.companySymbolFilter, 
      this.minValueFilter,
      this.maxValueFilter,
      this.minQuantityFilter,
      this.maxQuantityFilter).subscribe({
        next: response => {
          this.ownedShares = response.result; 
          this.clearError();
          this.currencyDown = response.currencyServiceDown;
        },
        error: err => { this.ownedShares = null;}
      })
  }

  removeFilters() {
    this.usernameFilter = null;
    this.companySymbolFilter = null;
    this.minValueFilter = null;
    this.maxValueFilter = null;
    this.minQuantityFilter = null;
    this.maxQuantityFilter = null;
    this.updateUserShares();
  }

  clearError()
  {
    this.errorMessage = null;
  }

  setError(error: HttpErrorResponse)
  {
    debugger;
    if (error.status == 401) this.errorMessage = "Not authorised, please log in"
    if (error.status == 404) this.errorMessage = "No users own shares"
  }
}
