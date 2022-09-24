import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  'providedIn': 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return <any>next.handle(req).pipe(
      catchError(
        (error: any, caught: Observable<HttpEvent<any>>) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            this.snackBar.open('Error occured.', 'ok');
          }
          throw error;
        }
      )
    );
  }
}
