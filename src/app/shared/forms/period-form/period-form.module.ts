import { NgModule } from '@angular/core';
import { PeriodFormComponent } from './period-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [PeriodFormComponent],
  imports: [...formModules],
  exports: [PeriodFormComponent],
})
export class PeriodFormModule {}
