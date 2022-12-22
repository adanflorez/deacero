import { NgModule } from '@angular/core';
import { DecentWorkFormComponent } from './decent-work-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [DecentWorkFormComponent],
  imports: [...formModules],
  exports: [DecentWorkFormComponent],
})
export class DecentWorkFormModule {}
