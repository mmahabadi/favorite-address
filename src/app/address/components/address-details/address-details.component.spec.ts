import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressDetailsComponent} from './address-details.component';
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../../../shared/shared.module";
import {PublicAddressService} from "../../services/public-address.service";
import {Address} from "../../models/address";
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";

describe('AddressDetailsComponent', () => {
  let component: AddressDetailsComponent;
  let fixture: ComponentFixture<AddressDetailsComponent>;
  let service: PublicAddressService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressDetailsComponent ],
      imports: [SharedModule, MatDialogModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PublicAddressService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data when get selected address', () => {
    const address = { id: 1 } as Address;
    jest.spyOn(service, 'get').mockImplementation((id: number) => of(address));

    service.setSelectedItem(address);

    expect(component.item).toBe(address);
  });
});
