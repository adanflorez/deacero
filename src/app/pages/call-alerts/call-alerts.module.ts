import { GoverningBodyModule } from './../../shared/forms/governing-body/governing-body.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAlertsRoutingModule } from './call-alerts-routing.module';
import { CallAlertsComponent } from './call-alerts.component';

@NgModule({
  declarations: [CallAlertsComponent],
  imports: [CommonModule, CallAlertsRoutingModule, GoverningBodyModule],
})
export class CallAlertsModule {}
