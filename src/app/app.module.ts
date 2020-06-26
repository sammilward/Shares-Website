import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';
import { GeneralModule } from './general/general.module';
import { AllSharesTableComponent } from './all-shares-table/all-shares-table.component';
import { SpecificCurrencyPipe } from './specific-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllSharesTableComponent,
    SpecificCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    AdminModule,
    GeneralModule,
    AppRoutingModule
  ],
  exports: [
    SpecificCurrencyPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
