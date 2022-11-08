import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType } from 'src/app/lib/enums/alert-type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() type: AlertType = AlertType.Danger;
  @Input() message: string = '';
  @Output() close = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  get alertType(): string[] {
    return ['alert-' + this.type];
  }
}
