import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertType } from 'src/app/lib/enums/alert-type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() type: AlertType = AlertType.Danger;
  @Input() message = '';
  @Output() hide = new EventEmitter();

  get alertType(): string[] {
    return ['alert-' + this.type];
  }
}
