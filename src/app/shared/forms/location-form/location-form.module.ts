import { OpeningHoursTableModule } from './../../tables/opening-hours-table/opening-hours-table.module';
import { NgModule } from '@angular/core';
import { LocationFormComponent } from './location-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [LocationFormComponent],
  imports: [...formModules, OpeningHoursTableModule],
  exports: [LocationFormComponent],
})
export class LocationFormModule {}
