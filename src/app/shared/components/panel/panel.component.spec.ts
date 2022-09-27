import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelComponent} from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title when passing the title parameter', () => {
    component.title = 'MyTitle';
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('mat-card-title');

    expect(element.innerHTML).toContain('MyTitle');
  });

  it('should set subTitle when passing the subTitle parameter', () => {
    component.subTitle = 'SubTitle';
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('mat-card-subtitle');

    expect(element.innerHTML).toContain('SubTitle');
  });

  it('should show loading when passing the loading parameter', () => {
    component.loading = true;
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('mat-progress-bar');

    expect(element).toBeTruthy();
  });
});
