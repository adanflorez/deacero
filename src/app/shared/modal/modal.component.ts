import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

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
  @Output() closeModal = new EventEmitter();
  @Output() confirm = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formModal: any;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'].currentValue) {
      this.openFormModal();
    } else {
      this.closeFormModal();
    }
  }

  openFormModal() {
    this.formModal.show();
  }

  closeFormModal() {
    this.formModal?.hide();
  }
}
