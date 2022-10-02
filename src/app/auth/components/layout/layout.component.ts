import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Subject, takeUntil} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-layout',
  templateUrl: './layout.component.html',
  styles: [
    '.login-container{margin: 10% auto;width: 300px;display: block;}',
    '.spacer{padding: 5px;}'
  ]
})
export class LayoutComponent implements OnDestroy{
  private destroy$ = new Subject<void>();
  title: string = '';

  constructor(
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.title = this.route.snapshot.firstChild?.data['title'];
    })
  }

  ngOnInit(): void {
    this.service.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
      if (!!res){
        this.goToProfilePage();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private goToProfilePage() {
    this.router.navigate(['/auth/profile']);
  }
}
