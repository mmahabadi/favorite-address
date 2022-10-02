import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class XhrInterceptor implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const xhr = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    });
    return next.handle(xhr).pipe(
      catchError(
        (error: any, caught: Observable<HttpEvent<any>>) => {
          if (error.status === 401) {
            this.router.navigate(['/auth/login']);
          } else {
            const message = error.error ? error.error : 'Error occured.';
            this.snackBar.open(message, 'ok', {
              duration: 10000
            });
          }
          throw error;
        }
      )
    );
  }

}
