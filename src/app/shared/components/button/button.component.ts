import {Attribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter();

  constructor(
    @Attribute('color')
    public color: string,
    @Attribute('icon')
    public icon: string
  ) { }

  clickHandler(event: MouseEvent) {
    event.stopPropagation();
    !this.loading && this.onClick.emit();
  }
}
