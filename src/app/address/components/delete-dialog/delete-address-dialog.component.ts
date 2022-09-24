import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PublicAddressService} from "../../services/public-address.service";

@Component({
  selector: 'app-delete-dialog',
  template: `<h1 mat-dialog-title>Delete address</h1>
  <div mat-dialog-content>
    Would you like to delete the address?
  </div>
  <div mat-dialog-actions ngClass="action-container">
    <app-button [disabled]="loading" (onClick)="closeHandler()">No</app-button>
    <app-button [loading]="loading" (onClick)="confirmHandler()" color="accent">Yes</app-button>
  </div>`
})
export class DeleteAddressDialogComponent {
  loading: boolean = false;

  constructor(
    private service: PublicAddressService,
    private dialogRef: MatDialogRef<DeleteAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {id: number},
  ) {}

  closeHandler() {
    this.dialogRef.close();
  }

  confirmHandler() {
    if (!this.data?.id){
      return;
    }
    this.loading = true;
    this.service.delete(this.data!.id).subscribe(_ => {
      this.loading = false;
      this.closeHandler();
    }, _ => this.loading = false);
  }
}
