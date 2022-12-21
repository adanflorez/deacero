import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { RemunerationTableModule } from './../../tables/remuneration-table/remuneration-table.module';
import { RemunerationFormComponent } from './remuneration-form.component';

@NgModule({
  declarations: [RemunerationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RemunerationTableModule,
    AlertModule,
  ],
  exports: [RemunerationFormComponent],
})
export class RemunerationFormModule {}
