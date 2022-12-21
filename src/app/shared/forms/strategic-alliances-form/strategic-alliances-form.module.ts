import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { formModules } from './../modules';
import { StrategicAlliancesFormComponent } from './strategic-alliances-form.component';

@NgModule({
  declarations: [StrategicAlliancesFormComponent],
  imports: [NgSelectModule, ...formModules],
  exports: [StrategicAlliancesFormComponent],
})
export class StrategicAlliancesFormModule {}
