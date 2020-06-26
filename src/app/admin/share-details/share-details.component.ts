import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/userservice/user-service.service';
import { UsershareserviceService } from 'src/app/usershareservice/usershareservice.service';
import { SharesService } from 'src/app/sharesservice/shares.service';
import { SingleShareResponse } from 'src/app/sharesservice/single-share-response';
import { MultipleUserShareResponse } from 'src/app/usershareservice/multiple-user-share-response';

@Component({
  selector: 'app-share-details',
  templateUrl: './share-details.component.html',
  styleUrls: ['./share-details.component.css']
})
export class ShareDetailsComponent implements OnInit {
  companySymbol: string;
  shareResponse: SingleShareResponse;
  userShareResponse: MultipleUserShareResponse;

  shareErrorMessage: string;

  currencyDown: boolean;

  constructor(
    private route: ActivatedRoute, 
    private userShareService: UsershareserviceService, 
    private shareService: SharesService) { 
    this.companySymbol = this.route.snapshot.paramMap.get('symbol');
  }

  ngOnInit(): void {
    this.updatePage();
  }

  updatePage(): void {
    this.updateShare();
    this.updateUserShare();
  }

  updateShare(): void {
    this.shareService.getBySymbol(this.companySymbol).subscribe({
      next: response => {
        this.shareResponse = response
        this.currencyDown = response.currencyServiceDown;
      },
      error: err => { this.shareErrorMessage = err.error; }
    })
  }

  updateUserShare(): void {
    this.userShareService.getBySymbol(this.companySymbol).subscribe({
      next: response => {
        this.userShareResponse = response;
        this.currencyDown = response.currencyServiceDown;
      }
    })
  }
}
