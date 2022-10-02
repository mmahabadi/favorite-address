import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {AuthService} from "../../../auth/services/auth.service";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ HttpClientModule, RouterTestingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login button when user is NOT logged in', () => {
    const loginBtn = fixture.nativeElement.querySelector('button[data-id="login-btn"]');
    const userMenuBtn = fixture.nativeElement.querySelector('button[data-id="user-menu-btn"]');

    expect(loginBtn).toBeTruthy();
    expect(userMenuBtn).toBeFalsy();
  });

  it('should display user menu button when user is logged in', () => {
    const service = TestBed.inject(AuthService);
    service.signIn({accessToken: 'token', user: {id: 1}} as any);

    fixture.detectChanges();

    const loginBtn = fixture.nativeElement.querySelector('button[data-id="login-btn"]');
    const userMenuBtn = fixture.nativeElement.querySelector('button[data-id="user-menu-btn"]');

    expect(loginBtn).toBeFalsy();
    expect(userMenuBtn).toBeTruthy();
  });
});
