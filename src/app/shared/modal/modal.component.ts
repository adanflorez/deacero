import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title = '';
  @Input() closable = true;
  @Input() acceptLabel = 'Aceptar';
  @Output() close = new EventEmitter();
  formModal: any;

  constructor() {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.openFormModal();
  }

  openFormModal() {
    this.formModal.show();
  }
  closeFormModal() {
    this.close.emit();
    this.formModal.hide();
  }
}
