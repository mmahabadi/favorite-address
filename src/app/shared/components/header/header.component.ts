import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.header-spacer {flex: 1 1 auto;}']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public authSservice: AuthService
  ) { }

  handleLogOut() {
    this.authSservice.logout();
    this.router.navigate(['/auth/login']);
  }
}
