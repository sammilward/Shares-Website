import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms'
import { AdminRoutingModule } from './admin-routing.module';

import { MyProfileComponent } from './my-profile/my-profile.component';
import { AdminComponent } from './admin/admin.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { UserSharesComponent } from './user-shares/user-shares.component';
import { AllSharesComponent } from './all-shares/all-shares.component';
import { SpecificCurrencyPipe } from './specific-currency.pipe';
import { ShareDetailsComponent } from './share-details/share-details.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CurrencyWarningComponent } from './currency-warning/currency-warning.component';

@NgModule({
  declarations: [
    MyProfileComponent,
    AdminComponent,
    ToolBarComponent,
    UserSharesComponent,
    AllSharesComponent,
    SpecificCurrencyPipe,
    ShareDetailsComponent,
    UserProfilesComponent,
    UserDetailsComponent,
    CurrencyWarningComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AdminModule { }
