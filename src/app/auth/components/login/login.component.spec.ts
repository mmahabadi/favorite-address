import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 2 controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should make the form invalid when submit button is clicked', () => {
    component.form.patchValue({email: '', password: ''});
    component.form.markAllAsTouched();

    expect(component.form.get('email')?.valid).toBeFalsy();
    expect(component.form.get('password')?.valid).toBeFalsy();
  });

  it('should display error message when the service is rejected', async () => {
    const service = TestBed.inject(AuthService);
    jest.spyOn(service, 'login').mockReturnValue(Promise.reject({ error: 'Error' }));

    await component.submitHandler();

    expect(component.errorMessage).toBe('Error');
  })
});
