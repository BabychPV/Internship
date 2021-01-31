import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';


export interface CanComponentDeactivate {
  // если метод вернет true перенаправление возможно, false - нет.
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<CanComponentDeactivate> {


  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      if (confirm('Login in!')) {
        this.router.navigate(['Login']);
      }
      return false;
    }

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      if (confirm('Login in!')) {
        this.router.navigate(['Login']);
      }
      return false;
    }
  }

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
