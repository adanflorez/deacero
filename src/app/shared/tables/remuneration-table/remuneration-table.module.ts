import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemunerationTableComponent } from './remuneration-table.component';

@NgModule({
  declarations: [RemunerationTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RemunerationTableComponent],
})
export class RemunerationTableModule {}
