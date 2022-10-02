import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {USER_VALIDATORS} from "../../models/user-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  loading: boolean = false;
  errorMessage: string = '';
  form = new FormGroup({
    name:        new FormControl('', USER_VALIDATORS['name']),
    email:       new FormControl('', USER_VALIDATORS['email']),
    password:    new FormControl('', USER_VALIDATORS['password']),
    phoneNumber: new FormControl('', USER_VALIDATORS['phoneNumber']),
  });

  constructor(private service: UserService) {}

  async submitHandler() {
    this.form.markAllAsTouched();
    if (this.form.valid){
      try {
        this.loading = true;
        const user = { ...this.form.value } as User;
        await this.service.register(user);
      } catch (e: any) {
        this.errorMessage = e?.error;
      }
      this.loading = false;
    }
  }

}
