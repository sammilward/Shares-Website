import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserServiceService } from '../userservice/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private userService: UserServiceService, private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.userService.isAdmin == null) {
      this.router.navigate(['/login']);
      return false;
    }
    else if (!this.userService.isAdmin) {
      this.router.navigate(['/general/home']);
      return false;
    }
    else {
      return true;
    }
  } 
  
}
