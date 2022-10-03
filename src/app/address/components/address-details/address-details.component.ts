import {Component, OnDestroy, OnInit} from '@angular/core';
import {Address} from "../../models/address";
import {Subject, takeUntil} from "rxjs";
import {AddressService} from "../../services/address.service";
import {EntryFormComponent} from "../entry-form/entry-form.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAddressDialogComponent} from "../delete-dialog/delete-address-dialog.component";

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styles: [`.actions-container{
    margin-top: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid #CCC;
  }`]
})
export class AddressDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  /**
   * In this example, there is no need to fetch data for selected item,
   * But I fetch the data to show the process.
   */
  item: Address | undefined;
  loading: boolean = false;

  constructor(
    private service: AddressService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.service.selectedItem$
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => !!item && this.loadData(item));
  }

  private loadData(item: Address) {
    if (JSON.stringify(item) !== JSON.stringify(this.item) && !!item?.id) {
      this.loading = true;
      this.service.get(item.id).subscribe((res: Address) => {
        this.item = res;
        this.loading = false;
      }, _ => this.loading = false);
    }
  }

  editHandler(){
    this.dialog.open(EntryFormComponent,{
      width: '640px',disableClose: true, data: {id: this.item?.id}
    });
  }

  deleteHandler(){
    if (!this.item?.id){
      return;
    }
    this.dialog.open(DeleteAddressDialogComponent, {
      data: {id: this.item?.id}
    });
  }
}
