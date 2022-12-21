import { NgModule } from '@angular/core';
import { LocationFormComponent } from './location-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [LocationFormComponent],
  imports: [...formModules],
  exports: [LocationFormComponent],
})
export class LocationFormModule {}
