import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {firstValueFrom} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user!: User;
  editMode: boolean = false;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    await this.loadUser();
  }

  editHandler() {
    this.editMode = true;
  }

  cancelHandler() {
    this.editMode = false;
  }

  updateHandler(user: User) {
    this.editMode = false;
    this.user = {...this.user, ...user};
  }

  private async loadUser() {
    this.user = await firstValueFrom(this.userService.get());
  }
}
