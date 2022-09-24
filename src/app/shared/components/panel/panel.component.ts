import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html'
})
export class PanelComponent {
  @Input() loading: boolean = false;
  @Input() title: string = '';
  @Input() subTitle: string = '';
}
