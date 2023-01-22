import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OpeningHoursTableComponent } from './opening-hours-table.component';

@NgModule({
  declarations: [OpeningHoursTableComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [OpeningHoursTableComponent],
})
export class OpeningHoursTableModule {}
