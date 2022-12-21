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
  @Input() containerClasses: string;
  @Input() display: 'grid' | undefined;
  @Input() variant: 'outline' | '';
  @Input() size: 'sm' | 'lg' | '';

  @Output() clicked: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.color = '';
    this.disabled = false;
    this.containerClasses = '';
    this.display = undefined;
    this.variant = '';
    this.size = '';
  }

  get displayClasses(): string {
    return this.display ? `d-${this.display}` : '';
  }

  get variantClasses(): string {
    return this.variant
      ? `btn-${this.variant}-${this.color}`
      : `btn-${this.color}`;
  }

  get sizeClasses() {
    return this.size ? `btn-${this.size}` : '';
  }
}
