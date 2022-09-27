import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the eventEmitter when button is clicked', () => {
    const spy = jest.spyOn(component.onClick, 'emit');
    const button: HTMLElement = fixture.nativeElement.querySelector('button');

    button.click();

    expect(spy).toHaveBeenCalled()
  })
});
