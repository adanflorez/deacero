import { ProductTableModule } from './../../tables/product-table/product-table.module';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { DonationsTableModule } from './../../tables/donations-table/donations-table.module';
import { formModules } from './../modules';
import { StrategicAlliancesFormComponent } from './strategic-alliances-form.component';

@NgModule({
  declarations: [StrategicAlliancesFormComponent],
  imports: [
    NgSelectModule,
    DonationsTableModule,
    ProductTableModule,
    ...formModules,
  ],
  exports: [StrategicAlliancesFormComponent],
})
export class StrategicAlliancesFormModule {}
