import { Component, OnInit } from '@angular/core';
import { UsershareserviceService } from 'src/app/usershareservice/usershareservice.service';
import { UserShare } from 'src/app/usershareservice/usershare';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-shares-table',
  templateUrl: './my-shares-table.component.html',
  styleUrls: ['./my-shares-table.component.css']
})
export class MySharesTableComponent implements OnInit {
  pageTitle: string = 'My Shares';
  ownedShares: UserShare[];
  errorMessage: string;

  currencyDown: boolean;

  constructor(private userShareService: UsershareserviceService) { }

  ngOnInit() {
    this.userShareService.getAllUserShares().subscribe({
      next: response => { 
        this.ownedShares = response.result; 
        this.clearError();
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => this.setError(err)
    })
  }

  clearError()
  {
    this.errorMessage = null;
  }

  setError(error: HttpErrorResponse)
  {
    if (error.status == 401) this.errorMessage = "Not authorised, please log in"
    if (error.status == 404) this.errorMessage = "You do not own any shares."
  }
}
