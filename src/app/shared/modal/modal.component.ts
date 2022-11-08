import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() closable = true;
  @Input() show = false;
  @Input() acceptLabel = 'Aceptar';
  @Output() close = new EventEmitter();
  formModal: any;

  constructor() {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'].currentValue) {
      this.openFormModal();
    } else {
      this.formModal.hide();
    }
  }

  openFormModal() {
    this.formModal.show();
  }

  closeFormModal() {
    this.close.emit();
    this.formModal.hide();
  }
}
