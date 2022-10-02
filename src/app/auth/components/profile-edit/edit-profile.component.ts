import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {USER_VALIDATORS} from "../../models/user-validators";

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent {
  @Input() set user(user: User) {
    this.form.patchValue({...user});
  }
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<User>();
  loading: boolean = false;
  errorMessage: string = '';
  form = new FormGroup({
    id:          new FormControl(),
    name:        new FormControl('', USER_VALIDATORS['name']),
    phoneNumber: new FormControl('', USER_VALIDATORS['phoneNumber']),
  });

  constructor(private service: UserService) {}

  async submitHandler() {
    this.form.markAllAsTouched();
    if (this.form.valid){
      try {
        this.loading = true;
        const user = { ...this.form.value } as User;
        await this.service.edit(user);
        this.onSave.emit(user);
      } catch (e: any) {
        this.errorMessage = e?.error;
      }
      this.loading = false;
    }
  }

  cancelHandler() {
    this.onCancel.emit();
  }
}
