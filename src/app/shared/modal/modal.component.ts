import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
export class ModalComponent implements OnChanges, AfterViewInit {
  @Input() modalId = 'myModal';
  @Input() title = '';
  @Input() closable = true;
  @Input() show = false;
  @Input() acceptLabel = 'Aceptar';
  @Input() showCancelButton = true;
  @Output() closeModal = new EventEmitter();
  @Output() confirm = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formModal: any;

  ngAfterViewInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById(this.modalId)
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
