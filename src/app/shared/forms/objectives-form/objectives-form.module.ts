import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ObjectivesFormComponent } from './objectives-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [ObjectivesFormComponent],
  imports: [NgSelectModule, ...formModules],
  exports: [ObjectivesFormComponent],
})
export class ObjectivesFormModule {}
