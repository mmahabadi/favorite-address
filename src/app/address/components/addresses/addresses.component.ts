import {Component, OnInit} from '@angular/core';
import {EntryFormComponent} from "../entry-form/entry-form.component";
import {MatDialog} from "@angular/material/dialog";
import {AddressService} from "../../services/address.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit{
  isFavorite: boolean = false;

  constructor(
    private service: AddressService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const activeUrl = this.route.snapshot.url.pop();
    this.service.isFavorite = activeUrl?.path == 'favorites';
    this.service.setSelectedItem(null);
    this.service.getAll();
  }

  addHandler() {
    this.dialog.open(EntryFormComponent,{
      width: '640px',disableClose: true, data: {id: null}
    });
  }
}
