import { NgModule } from '@angular/core';
import { GeneralProjectDataFormComponent } from './general-project-data-form.component';
import { formModules } from '../modules';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [GeneralProjectDataFormComponent],
  imports: [NgSelectModule, ...formModules],
  exports: [GeneralProjectDataFormComponent],
})
export class GeneralDataFormModule {}
