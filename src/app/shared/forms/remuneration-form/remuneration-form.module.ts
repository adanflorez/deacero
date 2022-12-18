import { RemunerationTableModule } from './../../tables/remuneration-table/remuneration-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemunerationFormComponent } from './remuneration-form.component';

@NgModule({
  declarations: [RemunerationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RemunerationTableModule,
  ],
  exports: [RemunerationFormComponent],
})
export class RemunerationFormModule {}
