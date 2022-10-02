import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate{
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.isAuthorized();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthorized();
  }

  private isAuthorized(): boolean {
    const isAuthenticated = this.authService.isAuthorized();
    if (!isAuthenticated){
      this.snackBar.open('You do not have proper privileges to access this route', 'ok', {
        duration: 5000
      });
      this.router.navigate(['/auth/login']);
    }
    return isAuthenticated;
  }
}
