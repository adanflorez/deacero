import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemunerationFormComponent } from './remuneration-form.component';

@NgModule({
  declarations: [RemunerationFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RemunerationFormComponent],
})
export class RemunerationFormModule {}
