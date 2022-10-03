import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressesComponent} from './addresses.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {AddressService} from "../../services/address.service";

describe('AddressesComponent', () => {
  let component: AddressesComponent;
  let fixture: ComponentFixture<AddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesComponent ],
      imports: [MatDialogModule, MatSnackBarModule, HttpClientModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should load items when component created', () => {
    const service = TestBed.inject(AddressService);
    const spy = jest.spyOn(service, 'getAll');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  })
});
