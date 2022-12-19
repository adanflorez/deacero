import { FormErrorModule } from './../../form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationFormComponent } from './location-form.component';

@NgModule({
  declarations: [LocationFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FormErrorModule],
  exports: [LocationFormComponent],
})
export class LocationFormModule {}
