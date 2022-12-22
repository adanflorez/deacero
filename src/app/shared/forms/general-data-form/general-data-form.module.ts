import { NgModule } from '@angular/core';
import { GeneralDataFormComponent } from './general-data-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [GeneralDataFormComponent],
  imports: [...formModules],
  exports: [GeneralDataFormComponent],
})
export class GeneralDataFormModule {}
