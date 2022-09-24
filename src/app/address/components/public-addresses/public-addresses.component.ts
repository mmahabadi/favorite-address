import {Component} from '@angular/core';
import {EntryFormComponent} from "../entry-form/entry-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-public-addresses',
  templateUrl: './public-addresses.component.html',
  styleUrls: ['./public-addresses.component.scss']
})
export class PublicAddressesComponent {
  constructor(private dialog: MatDialog) {
  }
  addHandler() {
    this.dialog.open(EntryFormComponent,{
      width: '640px',disableClose: true, data: {id: null}
    });
  }
}
