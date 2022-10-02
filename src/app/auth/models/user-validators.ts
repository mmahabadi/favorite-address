import {Validators} from "@angular/forms";

export const USER_VALIDATORS = {
  name: Validators.compose([Validators.required]),
  email: Validators.compose([Validators.required, Validators.email]),
  password: Validators.compose([Validators.required, Validators.min(3)]),
  phoneNumber: Validators.compose([Validators.required])
}
