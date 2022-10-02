import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientModule} from "@angular/common/http";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have show profile details by default', () => {
    fixture.detectChanges();
    const profileDetailsEl = fixture.nativeElement.querySelector('app-profile-details');
    expect(profileDetailsEl).toBeTruthy();
    const profileEditFormEl = fixture.nativeElement.querySelector('app-profile-edit-form');
    expect(profileEditFormEl).toBeFalsy();
  });

  it('should have edit form when user click on edit profile button' , () => {
    component.editMode = true;
    fixture.detectChanges();
    const profileDetailsEl = fixture.nativeElement.querySelector('app-profile-details');
    expect(profileDetailsEl).toBeFalsy();
    const profileEditFormEl = fixture.nativeElement.querySelector('app-profile-edit-form');
    expect(profileEditFormEl).toBeTruthy();
  });

});
