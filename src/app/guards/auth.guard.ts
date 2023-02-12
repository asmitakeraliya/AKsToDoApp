import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}

  routeData: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.routeData = route.data;
    let requiredRole = this.routeData.requiredRole;    

    // Handling role based authorisation in the below switch case.
    switch (requiredRole) {
      case 'User':
        if (
          this.authService.isLoggedIn() &&
          (this.authService.getValue('role') == 'User' ||
            this.authService.getValue('role') == 'Admin')
        ) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
        break;
      case 'Admin':        
        if (
          this.authService.isLoggedIn() &&
          this.authService.getValue('role') == 'Admin'
        ) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
        break;
      default:
        this.router.navigate(['login']);
        return false;
        break;
    }
  }
}
