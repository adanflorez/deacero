import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertType } from 'src/app/lib/enums/alert-type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() type: AlertType;
  @Input() message;
  @Input() show: boolean;
  @Input() dismissible: boolean;
  @Output() showChange = new EventEmitter();

  constructor() {
    this.type = AlertType.Danger;
    this.message = '';
    this.show = false;
    this.dismissible = false;
  }

  hide() {
    this.show = false;
    this.showChange.emit(this.show);
  }
}
