import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

describe('RegisterComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 3 controls', () => {
    expect(component.form.contains('id')).toBeTruthy();
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('phoneNumber')).toBeTruthy();
  });

  it('should make the form invalid when submit button is clicked', () => {
    component.form.markAllAsTouched();

    expect(component.form.get('id')?.valid).toBeTruthy();
    expect(component.form.get('email')?.invalid).toBeFalsy();
    expect(component.form.get('password')?.invalid).toBeFalsy();
  });

  it('should set the form data when the use input is passes to the component', async () => {
    const id = 1;
    const name = 'My Name';
    const phoneNumber = '09121234567';
    component.user = {id, name, phoneNumber } as any;
    fixture.detectChanges();

    expect(component.form.get('id')?.value).toBe(id);
    expect(component.form.get('name')?.value).toBe(name);
    expect(component.form.get('phoneNumber')?.value).toBe(phoneNumber);
  });

  it('should display error message when the service is rejected', async () => {
    const service = TestBed.inject(UserService);
    jest.spyOn(service, 'edit').mockReturnValue(Promise.reject({ error: 'Error' }));
    component.form.patchValue({name: 'My Name', phoneNumber: '09121234567'} as Partial<User>);
    fixture.detectChanges();

    await component.submitHandler();

    expect(component.errorMessage).toBe('Error');
  });

});
