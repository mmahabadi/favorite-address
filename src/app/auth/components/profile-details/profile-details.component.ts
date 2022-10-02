import {Component, Input} from "@angular/core";
import {User} from "../../models/user";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent{
  @Input() user: User | null = null;
}
