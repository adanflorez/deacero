import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAlertsRoutingModule } from './call-alerts-routing.module';
import { CallAlertsComponent } from './call-alerts.component';

import { RemunerationFormModule } from './../../shared/forms/remuneration-form/remuneration-form.module';
import { GoverningBodyModule } from './../../shared/forms/governing-body/governing-body.module';
import { GeneralDataFormModule } from './../../shared/forms/general-data-form/general-data-form.module';
import { LocationFormModule } from './../../shared/forms/location-form/location-form.module';
import { ProjectManagerFormModule } from './../../shared/forms/project-manager-form/project-manager-form.module';

@NgModule({
  declarations: [CallAlertsComponent],
  imports: [
    CommonModule,
    CallAlertsRoutingModule,
    GoverningBodyModule,
    RemunerationFormModule,
    GeneralDataFormModule,
    LocationFormModule,
    ProjectManagerFormModule,
  ],
})
export class CallAlertsModule {}
