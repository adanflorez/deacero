import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { StrategicAlliancesActivitiesTableComponent } from './strategic-alliances-activities-table.component';

@NgModule({
  declarations: [StrategicAlliancesActivitiesTableComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbAlertModule],
  exports: [StrategicAlliancesActivitiesTableComponent],
})
export class StrategicAlliancesActivitiesTableModule {}
