import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { PurchaseService } from 'src/app/purchaseservice/purchase.service';
import { SaleService } from 'src/app/salesservice/sale.service';
import { SingleUserResponse } from 'src/app/userservice/single-user-response';
import { ActivatedRoute } from '@angular/router';
import { MultipleSaleResponse } from 'src/app/salesservice/multiple-sale-response';
import { MultiplePurchaseResponse } from 'src/app/purchaseservice/multiple-purchase-response';
import { UsershareserviceService } from 'src/app/usershareservice/usershareservice.service';
import { UserShare } from 'src/app/usershareservice/usershare';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  username: string;

  singleUserResponse: SingleUserResponse;
  saleResponse: MultipleSaleResponse;
  purchaseResponse: MultiplePurchaseResponse;
  ownedShares: UserShare[];

  getSalesErrorMessage: string;
  getPurchaseErrorMessage: string;

  currencyDown: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private purchaseSerivce: PurchaseService,
    private salesService: SaleService,
    private userShareService: UsershareserviceService
  ) { 
    this.username = this.route.snapshot.paramMap.get('username');
  }

  ngOnInit() {
    this.updatePage();
  }

  updatePage() {
    this.updateUser();
    this.updateUserShares();
    this.updatePurchases();
    this.updateSales();
  }

  updateUser(): void
  {
    this.userService.adminGetSpecific(this.username).subscribe({
      next: response => { 
        this.singleUserResponse = response;
        this.currencyDown = response.currencyServiceDown;
      }
    })
  }

  updateUserShares(): void {
    this.userShareService.adminGetByUsername(this.username).subscribe({
      next: response => { 
        this.ownedShares = response.result;
        this.currencyDown = response.currencyServiceDown;
       }
    })
  }

  updatePurchases(): void {
    this.purchaseSerivce.adminGetByUsername(this.username).subscribe({
      next: response => {
        this.purchaseResponse = response;
      },
      error: err => {
        this.getPurchaseErrorMessage = err.error;
      }
    })
  }

  updateSales(): void {
    this.salesService.adminGetByUsername(this.username).subscribe({
      next: response => {
        this.saleResponse = response;
      },
      error: err => {
        this.getSalesErrorMessage = err.error;
      }
    })
  }
}
