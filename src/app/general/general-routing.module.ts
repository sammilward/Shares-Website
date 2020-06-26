import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { HomeComponent } from './home/home.component';
import { MySharesTableComponent } from './my-shares-table/my-shares-table.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllSharesComponent } from './all-shares/all-shares.component';
import { GeneralGuard } from './general.guard';
import { ShareDetailsComponent } from './share-details/share-details.component';

const routes: Routes = [
  {
    path: 'general',
    component: GeneralComponent,
    canActivate: [GeneralGuard],
    children: [
      { path: '',
        canActivate: [GeneralGuard],
        children: [
          { path: 'news', component: HomeComponent },
          { path: 'allshares', component: AllSharesComponent },
          { path: 'myshares', component: MySharesTableComponent },
          { path: 'myprofile', component: MyProfileComponent },
          { path: 'share/:symbol', component: ShareDetailsComponent }
      ]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
