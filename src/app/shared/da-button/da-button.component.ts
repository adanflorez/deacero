import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'da-button',
  templateUrl: './da-button.component.html',
  styleUrls: ['./da-button.component.scss'],
})
export class DaButtonComponent {
  @Input() color: string;
  @Input() disabled: boolean;
  @Input()
  get label() {
    throw new Error('Attribute "label" is required');
  }
  set label(value: string) {
    Object.defineProperty(this, 'label', {
      value,
      writable: true,
      configurable: true,
    });
  }

  @Output() clicked: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.color = '';
    this.disabled = false;
  }
}
