import {AfterViewInit, Component} from '@angular/core';
import {PublicAddressService} from "../../services/public-address.service";
import {Address} from "../../models/address";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html'
})
export class AddressListComponent implements AfterViewInit {
  constructor(
    public service: PublicAddressService
  ) {}

  ngAfterViewInit(): void {
    this.service.getAll();
  }

  selectListItemHandler(item: Address) {
    this.service.setSelectedItem(item);
  }
}
