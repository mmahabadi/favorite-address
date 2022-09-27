import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EntryFormComponent} from './entry-form.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {SharedModule} from "../../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {PublicAddressService} from "../../services/public-address.service";

class MatDialogRefStub{
  close(){}
}
const MAT_DIALOG_DATA_STUB = {
  data: {}
}
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
  });

  it('should have EditTitle if the data is provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: {id: 1}});
    fixture = TestBed.createComponent(EntryFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.data.id).toBe(1);
  });

  it('should load data when the data is provided', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: {id: 1}});
    const service = TestBed.inject(PublicAddressService);
    fixture = TestBed.createComponent(EntryFormComponent);
    component = fixture.componentInstance;
    const spy = jest.spyOn(service, 'get');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(1);
  });

  xit('should invoke cancel handler when I click cancel button', () => {
    const spy = jest.spyOn(component, 'cancelHandler');
    const cancelBtn: HTMLElement = fixture.nativeElement.querySelector('[data-id="cancel-btn"] button');

    cancelBtn.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
