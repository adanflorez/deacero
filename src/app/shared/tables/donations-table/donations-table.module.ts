import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsTableComponent } from './donations-table.component';

@NgModule({
  declarations: [DonationsTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DonationsTableComponent],
})
export class DonationsTableModule {}
