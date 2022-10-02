import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 4 controls', () => {
     expect(component.form.contains('name')).toBeTruthy();
     expect(component.form.contains('email')).toBeTruthy();
     expect(component.form.contains('password')).toBeTruthy();
     expect(component.form.contains('phoneNumber')).toBeTruthy();
  });


  it('should make the form invalid when submit button is clicked', () => {
    component.submitHandler();

    expect(component.form.get('name')?.valid).toBeFalsy();
    expect(component.form.get('email')?.valid).toBeFalsy();
    expect(component.form.get('password')?.valid).toBeFalsy();
    expect(component.form.get('phoneNumber')?.valid).toBeFalsy();
  });


  it('should display error message when the service is rejected', async () => {
    const service = TestBed.inject(UserService);
    jest.spyOn(service, 'register').mockReturnValue(Promise.reject({ error: 'Error' }));
    component.form.patchValue({
      name: 'My Name',
      phoneNumber: '09121234567',
      email: 'test@domain.com',
      password: '1234567'
    } as Partial<User>);
    fixture.detectChanges();

    await component.submitHandler();

    expect(component.errorMessage).toBe('Error');
  });
});
