import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategicAlliancesActivitiesTableComponent } from './strategic-alliances-activities-table.component';

@NgModule({
  declarations: [StrategicAlliancesActivitiesTableComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [StrategicAlliancesActivitiesTableComponent],
})
export class StrategicAlliancesActivitiesTableModule {}
