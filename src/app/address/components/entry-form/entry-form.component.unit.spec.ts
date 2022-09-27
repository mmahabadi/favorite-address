import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EntryFormComponent} from './entry-form.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {SharedModule} from "../../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";

class MatDialogRefStub{
  close(){}
}
const MAT_DIALOG_DATA_STUB = {}

describe('EntryFormComponent', () => {
  let component: EntryFormComponent;
  let fixture: ComponentFixture<EntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryFormComponent ],
      imports: [MatDialogModule, SharedModule, MatInputModule],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create a form with 5 controls', () => {
    fixture.detectChanges();

    expect(component.form.contains('id')).toBeTruthy();
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('address')).toBeTruthy();
    expect(component.form.contains('latitude')).toBeTruthy();
    expect(component.form.contains('longitude')).toBeTruthy();
  });

  it('should make required controls required', () => {
    fixture.detectChanges();

    component.form.markAllAsTouched();

    expect(component.form.get('id')?.valid).toBeTruthy();
    expect(component.form.get('name')?.valid).toBeFalsy();
    expect(component.form.get('address')?.valid).toBeFalsy();
    expect(component.form.get('latitude')?.valid).toBeFalsy();
    expect(component.form.get('longitude')?.valid).toBeFalsy();
  });

  it('should have AddTitle if the data is NOT provided', () => {
    fixture.detectChanges();

    expect(component.title).toContain('Add Address');
  });

  it('should close dialog when I cancel method is called', () => {
    const dialogRef = TestBed.inject(MatDialogRef)
    const spy = jest.spyOn(dialogRef, 'close');

    component.cancelHandler();

    expect(spy).toHaveBeenCalled();
  })
});
