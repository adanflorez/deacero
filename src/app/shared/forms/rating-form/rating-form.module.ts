import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingFormComponent } from './rating-form.component';

@NgModule({
  declarations: [RatingFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RatingFormComponent],
})
export class RatingFormModule {}
