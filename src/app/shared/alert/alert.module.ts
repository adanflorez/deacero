import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, NgbAlertModule],
  exports: [AlertComponent],
})
export class AlertModule {}
