import { Component, OnInit } from '@angular/core';
import { SharesService } from 'src/app/sharesservice/shares.service';
import { Share } from 'src/app/sharesservice/share';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-shares',
  templateUrl: './all-shares.component.html',
  styleUrls: ['./all-shares.component.css']
})
export class AllSharesComponent implements OnInit {
  pageTitle: string = 'All Shares';
  companySymbolFilter: string;
  companyNameFilter: string;
  minValueFilter: number;
  maxValueFilter: number;
  minQuantityFilter: number;
  maxQuantityFilter: number;
  shares: Share[];
  errorMessage: string;
  
  currencyDown: boolean;

  constructor(private shareService: SharesService) { }

  ngOnInit() {
    this.updateShares();
  }

  updateShares(): void {
    this.shareService.getAllShares().subscribe({
      next: response => {
        this.shares = response.result; 
        this.clearError();
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => {this.setError(err)}
    })
  }

  filter() {
    this.shareService.getWithFilters(
      this.companySymbolFilter, 
      this.companyNameFilter,
      this.minValueFilter,
      this.maxValueFilter,
      this.minQuantityFilter,
      this.maxQuantityFilter).subscribe({
        next: response => {this.shares = response.result; this.clearError();},
        error: err => { this.shares = null;}
      })
  }

  removeFilters() {
    this.companySymbolFilter = null;
    this.companyNameFilter = null;
    this.minValueFilter = null;
    this.maxValueFilter = null;
    this.minQuantityFilter = null;
    this.maxQuantityFilter = null;
    this.updateShares();
  }

  clearError()
  {
    this.errorMessage = null;
  }

  setError(error: HttpErrorResponse)
  {
    if (error.status == 401) this.errorMessage = "Not authorised, please log in"
    if (error.status == 404) this.errorMessage = "No shares found with these filters"
  }
}
