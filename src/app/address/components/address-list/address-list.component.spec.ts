import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressListComponent} from './address-list.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";

describe('AddressListComponent', () => {
  let component: AddressListComponent;
  let fixture: ComponentFixture<AddressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressListComponent ],
      imports: [MatSnackBarModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressListComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
