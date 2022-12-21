import { NgModule } from '@angular/core';
import { FundManagerFormComponent } from './fund-manager-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [FundManagerFormComponent],
  imports: [...formModules],
  exports: [FundManagerFormComponent],
})
export class FundManagerFormModule {}
