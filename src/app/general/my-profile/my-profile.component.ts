import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { SingleUserResponse } from 'src/app/userservice/single-user-response';
import { HttpErrorResponse } from '@angular/common/http';
import { SaleService } from 'src/app/salesservice/sale.service';
import { PurchaseService } from 'src/app/purchaseservice/purchase.service';
import { MultipleSaleResponse } from 'src/app/salesservice/multiple-sale-response';
import { MultiplePurchaseResponse } from 'src/app/purchaseservice/multiple-purchase-response';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  singleUserResponse: SingleUserResponse;
  newPrefferedCurrency: string;

  withdrawAmount: number;
  depositAmount: number;

  changeCurrencyErrorMessage: string;
  walletErrorMessage: string;

  saleResponse: MultipleSaleResponse;
  purchaseResponse: MultiplePurchaseResponse;

  getSalesErrorMessage: string;
  getPurchaseErrorMessage: string;

  currencyDown: boolean;
  
  constructor(
    private userService: UserServiceService,
    private purchaseSerivce: PurchaseService,
    private salesService: SaleService) { }

  ngOnInit() {
    this.updatePage();
  }

  updatePage() {
    this.updateUser();
    this.updatePurchases();
    this.updateSales();
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

  changeCurrency(): void {
    this.userService.updatePrefferedCurrency(this.newPrefferedCurrency).subscribe({
      next: response => { 
        this.updatePage();
      },
      error: err => { this.setChangeCurrencyError(err) }
    })
  }

  withdraw(): void {
    this.userService.updateWalletAmount(-this.withdrawAmount).subscribe({
      next: response => { 
        this.updatePage();
        this.clearWalletError();
        this.withdrawAmount = null;
      },
      error: err => { this.setWalletError(err) }
    })
  }

  deposit(): void {
    this.userService.updateWalletAmount(this.depositAmount).subscribe({
      next: response => {
        this.updatePage();
        this.clearWalletError();
        this.depositAmount = null;
      },
      error: err => { this.setWalletError(err) }
    })
  }

  updateSales(): void {
    this.salesService.getByUsername().subscribe({
      next: response => {
        this.saleResponse = response;
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => {
        this.getSalesErrorMessage = err.error;
      }
    })
  }

  updatePurchases(): void {
    this.purchaseSerivce.getByUsername().subscribe({
      next: response => {
        this.purchaseResponse = response;
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => {
        this.getPurchaseErrorMessage = err.error;
      }
    })
  }

  clearChangeCurrencyError()
  {
    this.changeCurrencyErrorMessage = null;
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

  clearWalletError()
  {
    this.walletErrorMessage = null;
  }

  setWalletError(error: HttpErrorResponse)
  {
    this.walletErrorMessage = error.error;
    if (error.status == 401) this.walletErrorMessage = "Not authorised, please log in"
    if (error.status == 404) this.walletErrorMessage = "No user found"
  }
}
