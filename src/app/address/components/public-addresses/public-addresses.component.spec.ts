import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAddressesComponent } from './public-addresses.component';

describe('PublicAddressesComponent', () => {
  let component: PublicAddressesComponent;
  let fixture: ComponentFixture<PublicAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicAddressesComponent ]
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
