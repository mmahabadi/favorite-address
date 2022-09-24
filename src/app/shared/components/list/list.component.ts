import {Attribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() items: any[] | null = [];
  @Input() selected: any = null;
  @Output() onSelect = new EventEmitter();

  constructor(
    @Attribute('title')
    public title: string,
    @Attribute('subTitle')
    public subTitle: string,
    @Attribute('icon')
    public icon: string = ''
  ) {
    this.icon = icon || 'push_pin';
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
