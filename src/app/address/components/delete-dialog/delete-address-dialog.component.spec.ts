import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddressService} from "../../services/address.service";
import {DeleteAddressDialogComponent} from "./delete-address-dialog.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";

class MatDialogRefStub {
  close(){}
}
const MAT_DIALOG_DATA_STUB = {
  data: {}
}

describe('DeleteAddressDialog', () => {
  let fixture: ComponentFixture<DeleteAddressDialogComponent>;
  let component: DeleteAddressDialogComponent;
  let service: AddressService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAddressDialogComponent ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATA_STUB }
      ],
      imports: [ MatSnackBarModule, HttpClientModule ]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DeleteAddressDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  })

  it('should remove item when user confirm dialog', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: { id: 1} });
    fixture = TestBed.createComponent(DeleteAddressDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AddressService);
    const spy = jest.spyOn(service, 'delete');
    fixture.detectChanges();

    component.confirmHandler();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT remove item when item id is null', () => {
    // TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: { id: 1} });
    fixture = TestBed.createComponent(DeleteAddressDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AddressService);
    const spy = jest.spyOn(service, 'delete');
    fixture.detectChanges();

    component.confirmHandler();

    expect(spy).not.toHaveBeenCalled();
  });
});
