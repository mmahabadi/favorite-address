import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressRoutingModule} from "./address-routing.module";
import { AddressesComponent } from './components/addresses/addresses.component';
import {SharedModule} from "../shared/shared.module";
import { AddressDetailsComponent } from './components/address-details/address-details.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {DeleteAddressDialogComponent} from "./components/delete-dialog/delete-address-dialog.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AddressesComponent,
    AddressDetailsComponent,
    AddressListComponent,
    EntryFormComponent,
    DeleteAddressDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AddressRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule
  ]
})
export class AddressModule { }
