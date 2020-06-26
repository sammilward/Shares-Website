import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { MulipleUserResponse } from 'src/app/userservice/multiple-user-response';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css']
})
export class UserProfilesComponent implements OnInit {
  usersResponse: MulipleUserResponse;

  usernameFilter: string;
  prefferedCurrenyFilter: string;
  minWalletValueFilter: number;
  maxWalletValueFilter: number;

  currencyDown: boolean;

  constructor(private userService: UserServiceService) { }

  getUsersNoFilters(): void {
    this.userService.getAllWithFilters(false, null, null, null, null).subscribe({
      next: response => {
        this.usersResponse = response;
        this.currencyDown = response.currencyServiceDown;
      }
    })
  }

  ngOnInit() {
    this.getUsersNoFilters();
  }

  filter(): void {
    this.userService.getAllWithFilters(false, this.usernameFilter, this.prefferedCurrenyFilter, this.minWalletValueFilter, this.maxWalletValueFilter).subscribe({
      next: response => {
        this.usersResponse = response;
        this.currencyDown = response.currencyServiceDown;
      }
    })
  }

  removeFilters(): void {
    this.getUsersNoFilters();
  }
}
