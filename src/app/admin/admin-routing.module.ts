import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MyProfileComponent as SettingsComponent } from './my-profile/my-profile.component';
import { UserSharesComponent } from './user-shares/user-shares.component';
import { AllSharesComponent } from './all-shares/all-shares.component';
import { ShareDetailsComponent } from './share-details/share-details.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminGuardGuard } from './admin-guard.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardGuard],
    children: [
      { path: '',
        canActivate: [AdminGuardGuard],
        children: [
          { path: 'allshares', component: AllSharesComponent },
          { path: 'usershares', component: UserSharesComponent },
          { path: 'userprofiles', component: UserProfilesComponent},
          { path: 'settings', component: SettingsComponent },
          { path: 'share/:symbol', component: ShareDetailsComponent },
          { path: 'userdetails/:username', component: UserDetailsComponent }
      ]}
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
