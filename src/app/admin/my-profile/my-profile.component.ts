import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { SingleUserResponse } from 'src/app/userservice/single-user-response';
import { HttpErrorResponse } from '@angular/common/http';
import { MulipleUserResponse } from 'src/app/userservice/multiple-user-response';
import { NewUserRequest } from 'src/app/userservice/new-user-request';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  singleUserResponse: SingleUserResponse;
  allAdminsResponse: MulipleUserResponse;
  newPrefferedCurrency: string;

  newAdminUsername: string;
  newAdminPassword: string;
  newAdminPrefferedCurrency: string;
  addAdminErrorMessage: string;

  changeCurrencyErrorMessage: string;
  deleteAdminErrorMessage: string;

  currencyDown: boolean;
  
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.updateUser();
    this.updateAllAdminUsers();
  }

  updateUser(): void
  {
    this.userService.getUpdatedCurrentUser().subscribe({
      next: response => { 
        this.singleUserResponse = response;
        this.newPrefferedCurrency = this.singleUserResponse.result.prefferedCurrency;
        this.currencyDown = response.currencyServiceDown;
      }
    })
  }

  updateAllAdminUsers(): void {
    this.userService.getAllWithFilters(true, null, null, null, null).subscribe({
      next: response => {
        this.allAdminsResponse = response;
        this.currencyDown = response.currencyServiceDown;
      }
    })
  }

  changeCurrency(): void {
    this.userService.updatePrefferedCurrency(this.newPrefferedCurrency).subscribe({
      next: response => { this.updateUser(); this.changeCurrencyErrorMessage = 'Currency Changed' },
      error: err => { this.setChangeCurrencyError(err) }
    })
  }

  deleteUser(username: string)
  {
    if (this.singleUserResponse.result.username == username) this.deleteAdminErrorMessage = 'You can not delete your own account';
    else {
      this.userService.deleteAdmin(username).subscribe({
        next: response => this.updateAllAdminUsers()
      })
    }
  }

  createAdminUser(): void {
    let newUser: NewUserRequest = new NewUserRequest();
    newUser.username = this.newAdminUsername;
    newUser.password = this.newAdminPassword;
    newUser.preferredCurrency = this.newAdminPrefferedCurrency;
    newUser.isAdmin = true;
    this.userService.register(newUser).subscribe({
      next: result => {
        this.updateAllAdminUsers();
      },
      error: err => {
        this.addAdminErrorMessage = err.error;
      }
    });
  }
  
  setChangeCurrencyError(error: HttpErrorResponse)
  {
    if (error.status == 400)
    {
      this.changeCurrencyErrorMessage = error.error;
    }
    if (error.status == 401) this.changeCurrencyErrorMessage = "Not authorised, please log in"
    if (error.status == 404) this.changeCurrencyErrorMessage = "No user found"
  }
}
