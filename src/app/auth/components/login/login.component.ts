import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserCredential} from "../../models/user-credential";
import {USER_VALIDATORS} from "../../models/user-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading: boolean = false;
  errorMessage: string = '';
  form = new FormGroup({
    email:    new FormControl('steve@example.com', USER_VALIDATORS['email']),
    password: new FormControl('foo$1234', USER_VALIDATORS['password'])
  });

  constructor(private service: AuthService) {}

  async submitHandler() {
    this.form.markAllAsTouched();
    if (this.form.valid){
      try {
        this.loading = true;
        const credential = {...this.form.value} as UserCredential;
        await this.service.login(credential);
      } catch (e: any) {
        this.errorMessage = e?.error;
      }
      this.loading = false;
    }
  }

}
