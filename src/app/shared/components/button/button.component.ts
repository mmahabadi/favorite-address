import {Attribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: ['.full-width{width: 100%}']
})
export class ButtonComponent {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter();

  constructor(
    @Attribute('color')
    public color: string,
    @Attribute('icon')
    public icon: string,
    @Attribute('routerLink')
    public routerLink: string,
    @Attribute('fullwidth')
    public fullwidth: boolean = false,
    @Attribute('raised')
    public raised: boolean = false
  ) { }

  clickHandler(event: MouseEvent) {
    event.stopPropagation();
    !this.loading && this.onClick.emit();
  }
}
