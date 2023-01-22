import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { formModules } from './../modules';
import { DonationsTableModule } from 'src/app/shared/tables/donations-table/donations-table.module';
import { StrategicAlliancesActivitiesTableModule } from 'src/app/shared/tables/strategic-alliances-activities-table/strategic-alliances-activities-table.module';
import { ProductTableModule } from 'src/app/shared/tables/product-table/product-table.module';
import { StrategicAlliancesFormComponent } from './strategic-alliances-form.component';

@NgModule({
  declarations: [StrategicAlliancesFormComponent],
  imports: [
    NgSelectModule,
    DonationsTableModule,
    ProductTableModule,
    StrategicAlliancesActivitiesTableModule,
    ...formModules,
  ],
  exports: [StrategicAlliancesFormComponent],
})
export class StrategicAlliancesFormModule {}
