import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { UsershareserviceService } from 'src/app/usershareservice/usershareservice.service';
import { SingleShareResponse } from 'src/app/sharesservice/single-share-response';
import { SharesService } from 'src/app/sharesservice/shares.service';
import { SingleUserResponse } from 'src/app/userservice/single-user-response';
import { UserShare } from 'src/app/usershareservice/usershare';
import { MultipleUserShareResponse } from 'src/app/usershareservice/multiple-user-share-response';
import { PurchaseService } from 'src/app/purchaseservice/purchase.service';
import { SaleService } from 'src/app/salesservice/sale.service';
import { MultipleSaleResponse } from 'src/app/salesservice/multiple-sale-response';
import { MultiplePurchaseResponse } from 'src/app/purchaseservice/multiple-purchase-response';

@Component({
  selector: 'app-share-details',
  templateUrl: './share-details.component.html',
  styleUrls: ['./share-details.component.css']
})
export class ShareDetailsComponent implements OnInit {
  companySymbol: string;
  shareResponse: SingleShareResponse;
  userResponse: SingleUserResponse;
  userShareResponse: MultipleUserShareResponse;
  saleResponse: MultipleSaleResponse
  purchaseResponse: MultiplePurchaseResponse
  userShare: UserShare;

  shareErrorMessage: string;
  userErrorMessage: string;
  purchaseErrorMessage: string;
  makeSaleErrorMessage: string;
  getSalesErrorMessage: string;
  getPurchaseErrorMessage: string;

  getShareDetailsErrorMessage: string;

  _purchaseQuantity: number;
  totalPurchaseCost: number;

  _sellQuantity: number;
  totalSaleAmount: number;

  currencyDown: boolean;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserServiceService, 
    private userShareService: UsershareserviceService, 
    private shareService: SharesService,
    private purchaseSerivce: PurchaseService,
    private salesService: SaleService) { 
    this.companySymbol = this.route.snapshot.paramMap.get('symbol');
  }

  ngOnInit(): void {
    this.updatePage();
  }

  updatePage(): void {
    this.updateShare();
    this.updateUser();
    this.updateUserShare();
    this.updateSales();
    this.updatePurchases();
  }

  updateShare(): void {
    this.shareService.getBySymbol(this.companySymbol).subscribe({
      next: response => {
        this.shareResponse = response;
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => { this.shareErrorMessage = err.error; }
    })
  }

  updateUser(): void {
    this.userService.getUpdatedCurrentUser().subscribe({
      next: response => { 
        this.userResponse = response;
        this.currencyDown = response.currencyServiceDown;
       },
      error: err => { this.userErrorMessage = err.error; }
    })
  }

  updateUserShare(): void {
    this.userShareService.getBySymbol(this.companySymbol).subscribe({
      next: response => {
        this.userShareResponse = response;
        this.userShare = this.userShareResponse.result[0];
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => { 
        this.userShare = null;
      }
    })
  }

  updateSales(): void {
    this.salesService.getBySymbol(this.companySymbol).subscribe({
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
    this.purchaseSerivce.getBySymbol(this.companySymbol).subscribe({
      next: response => {
        this.purchaseResponse = response;
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => {
        this.getPurchaseErrorMessage = err.error;
      }
    })
  }

  set purchaseQuantity(value: number) {
    this._purchaseQuantity = value;
    this.totalPurchaseCost = this._purchaseQuantity * this.shareResponse.result.value
  }

  get purchaseQuantity(): number {
    return this._purchaseQuantity;
  }

  set sellQuantity(value: number) {
    this._sellQuantity = value;
    this.totalSaleAmount = this._sellQuantity * this.shareResponse.result.value
  }

  get sellQuantity(): number {
    return this._sellQuantity;
  }

  purchase(): void {
    this.purchaseSerivce.makePurchase(this.companySymbol, this.purchaseQuantity).subscribe({
      next: response => {
        this.updatePage();
        this.purchaseQuantity = null;
        this.purchaseErrorMessage = null;
       },
      error: err => {
        this.makeSaleErrorMessage = err.error;
      }
    })
  }

  sell(): void {
    this.salesService.makeSale(this.companySymbol, this.sellQuantity).subscribe({
      next: response => {
        this.updatePage();
        this.sellQuantity = null;
        this.makeSaleErrorMessage = null;
       },
      error: err => {
        this.makeSaleErrorMessage = err.error;
      }
    })
  }
}
