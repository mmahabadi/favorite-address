import {Component} from '@angular/core';
import {AddressService} from "../../services/address.service";
import {Address} from "../../models/address";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html'
})
export class AddressListComponent{
  isFavorite: boolean = false;

  constructor(
    public service: AddressService
  ) {}

  selectListItemHandler(item: Address) {
    this.service.setSelectedItem(item);
  }
}
