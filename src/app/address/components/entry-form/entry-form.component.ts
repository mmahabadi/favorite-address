import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Address} from '../../models/address';
import {PublicAddressService} from "../../services/public-address.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [`.full-width{
      width: 100%;
  }`]
})
export class EntryFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, Validators.compose([Validators.required])),
    address: new FormControl(null, Validators.compose([Validators.required])),
    latitude: new FormControl(null, Validators.compose([Validators.required])),
    longitude: new FormControl(null, Validators.compose([Validators.required]))
  });
  loading: boolean = false;
  title: string = '';

  constructor(
    public dialogRef: MatDialogRef<EntryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private service: PublicAddressService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    const isEdit = !!this.data?.id;
    this.title = isEdit ? 'Edit Address' : 'Add Address';
    isEdit && this.loadData();
  }

  private loadData(){
    this.service.get(this.data.id).subscribe((res: Address) => {
      this.form.patchValue(res);
    });
  }

  cancelHandler() {
    this.dialogRef.close();
  }

  submitHandler() {
    if (this.form.invalid){
      this.snackBar.open('Form data is not valid.', 'ok');
      this.form.markAllAsTouched();
      return;
    }
    const entry = this.form.value;
    this.loading = true;
    this.service.save(entry).subscribe(_ => {
      this.loading = false;
      this.dialogRef.close()
    }, _ => this.loading = false);
  }
}


