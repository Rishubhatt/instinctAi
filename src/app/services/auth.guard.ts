import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private local: LocalService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    let isAuthenticated: boolean;
    if (this.local.getData('loginData')) {
      console.log(true);
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
      console.log(false);
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }
}
