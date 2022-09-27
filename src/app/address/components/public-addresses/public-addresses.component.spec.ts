import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicAddressesComponent} from './public-addresses.component';
import {MatDialogModule} from "@angular/material/dialog";

describe('PublicAddressesComponent', () => {
  let component: PublicAddressesComponent;
  let fixture: ComponentFixture<PublicAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicAddressesComponent ],
      imports: [MatDialogModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
