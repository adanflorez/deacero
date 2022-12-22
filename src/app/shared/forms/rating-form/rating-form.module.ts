import { NgModule } from '@angular/core';
import { RatingFormComponent } from './rating-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [RatingFormComponent],
  imports: [...formModules],
  exports: [RatingFormComponent],
})
export class RatingFormModule {}
