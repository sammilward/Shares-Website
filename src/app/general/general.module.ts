import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms'

import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general/general.component';
import { HomeComponent } from './home/home.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MySharesTableComponent } from './my-shares-table/my-shares-table.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllSharesComponent } from './all-shares/all-shares.component';
import { SpecificCurrencyPipe } from './specific-currency.pipe';
import { ShareDetailsComponent } from './share-details/share-details.component';
import { NewsComponent } from './news/news.component';
import { CurrencyWarningComponent } from './currency-warning/currency-warning.component';

@NgModule({
  declarations: [
    GeneralComponent,
    HomeComponent,
    ToolBarComponent,
    MySharesTableComponent,
    MyProfileComponent,
    AllSharesComponent,
    SpecificCurrencyPipe,
    ShareDetailsComponent,
    NewsComponent,
    CurrencyWarningComponent],
  imports: [
    FormsModule,
    CommonModule,
    GeneralRoutingModule,
    MaterialModule
  ]
})
export class GeneralModule { }
