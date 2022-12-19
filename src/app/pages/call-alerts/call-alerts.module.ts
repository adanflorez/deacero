import { GeneralDataFormModule } from './../../shared/forms/general-data-form/general-data-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAlertsRoutingModule } from './call-alerts-routing.module';
import { CallAlertsComponent } from './call-alerts.component';

import { RemunerationFormModule } from './../../shared/forms/remuneration-form/remuneration-form.module';
import { GoverningBodyModule } from './../../shared/forms/governing-body/governing-body.module';

@NgModule({
  declarations: [CallAlertsComponent],
  imports: [
    CommonModule,
    CallAlertsRoutingModule,
    GoverningBodyModule,
    RemunerationFormModule,
    GeneralDataFormModule,
  ],
})
export class CallAlertsModule {}
